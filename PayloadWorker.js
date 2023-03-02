require('dotenv').config();
const Redis = require('ioredis')

const sgmail = require('@sendgrid/mail')
sgmail.setApiKey(process.env.SECRET_API_KEY)

const { Queue, Worker } = require('bullmq')

const {emailQueue } = require('./data')

const { redisConnection } = require('./config/redisConfig')

try {

    // Creating redis connection

    const redis = new Redis(redisConnection)

    // Creating Email-worker

    const worker = new Worker(
        emailQueue.email,
        async (job) => {

            //console.log(job.data);
            console.log(`Consumed data from ${emailQueue.email} queue`)
            console.log(job.data)

          const res= await emailFunction(job.data);

            // Creating event queue for storing the response

            const myQueue = new Queue(emailQueue.events, {
                connection: redisConnection
            })

            // Adding response to the queue

            await myQueue.add('Response', res)

             //console.log(` Response from the call is: ${JSON.stringify(res)}`)
        },
    )

    // Catching Error
} catch (err) {
    console.log('Error', err)
}


// // Function for calling API and getting response


const emailFunction=async(payload)=>{
  const {requestid,apikey}=payload
  
  //Sendgrid data

  const msg=payload.data

  console.log("Personalization..",msg);
  
  try {
    //Send data to sendgrid

    const response=await sgmail.send(msg)
    console.log("Message sent successfully................");
    return response;
 } catch (error) {
    console.log(error,error.response.body);
 }

}