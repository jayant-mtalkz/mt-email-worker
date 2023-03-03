require('dotenv').config();
const Redis = require('ioredis')
const fastify = require('fastify')({logger:true});

const sgmail = require('@sendgrid/mail')
sgmail.setApiKey(process.env.SECRET_API_KEY)

const { Queue, Worker } = require('bullmq')

const {emailQueue } = require('./data')

const { redisConnection } = require('./config/redisConfig')

try {

    // Creating redis connection

  //  const redis = new Redis(redisConnection)

    // Creating Email-worker for sending email 
    const worker = new Worker(
        emailQueue.email,
        async (job) => {
            const payload=job.data
            console.log(`Consumed data from ${emailQueue.email} queue`)
            console.log(payload)
           
            const msg=payload.data
  
            try {
              //Send data to sendgrid      
              const response=await sgmail.send(msg)
              console.log("Message sent successfully................");
              return response;
           } catch (error) {
              console.log(error,error.response.body);
           }
        },
    )
    // Catching Error
} catch (err) {
    console.log('Error', err)
}
 // Creating event queue for storing the response
const myQueue = new Queue(emailQueue.events, {
    connection: redisConnection
})
try{
    //API FOR storing event webhooks response
    fastify.post('/webhooks', async(req, res) => {
        const body = req.body;
    //     console.log("Request",req);
    //    console.log("Bodyyyy",body);
        const eventReceived = body[0].event;
      
        // if(eventReceived === 'delivered') {
        //   console.log('Your email has been delivered!');
        // } else if(eventReceived === 'open') {
        //   console.log('Your email has been opened!');
        // } else if(eventReceived === 'click') {
        //   console.log('The link in your email has been clicked.');
        // } else if(eventReceived === 'spamreport') {
        //   console.log('The recipient has marked your email as spam.');
        // }
      // Adding response to the queue
        await myQueue.add('Response', eventReceived)
        return res.status(200).send();
      });
}catch(err){
    console.log("Erorrrr",err);
}



fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
  })