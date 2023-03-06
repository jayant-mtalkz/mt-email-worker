require('dotenv').config();
const Redis = require('ioredis')
const fastify = require('fastify')({ logger: true });

const sgmail = require('@sendgrid/mail')
sgmail.setApiKey(process.env.SECRET_API_KEY)

const { Queue, Worker } = require('bullmq')

const { emailQueue, DefaultTTL } = require('./data')

const { redisConnection } = require('./config/redisConfig')

try {

    // Creating redis connection
    const redis = new Redis(redisConnection)
    redis.on('error', (err) => {
        console.log("Can't connect to redis")
    })

    // Creating Email-worker for sending email 
    const worker = new Worker(
        emailQueue.email,
        async (job) => {
            const payload = job.data
            const { requestid, apikey } = job.data
            console.log(`Consumed data from ${emailQueue.email} queue`)
            console.log(payload)

            const msg = payload.data

            try {
                //Send data to sendgrid      
                const response = await sgmail.send(msg)
                console.log("Message sent successfully................");
                const message_id = response[0].headers['x-message-id'];
                // Map the returned message id with our request id and apikey
                const mapKey = `REQMAP:email:${message_id}`;
                const value = { requestid, apikey, message_id };
                redis.set(mapKey, JSON.stringify(value), "EX", DefaultTTL);
                if (response[0].statusCode == 202) {
                    msg.personalizations.forEach(element => {
                        element.to.forEach(async (object) => {
                            const email_id = object.email
                            const response = { status: "Accepted" };
                            const key = `REQM:${apikey}:${requestid}:${message_id}:${email_id}`
                            await redis.set(key, JSON.stringify(response), 'ex', DefaultTTL)
                            console.log("api set in redis")
                        })
                    })

                }

                //console.log("Response!!!!!!!!!!!!!!!", response);
                //console.log("Status Code",response[0].statusCode);
                return response;
            } catch (error) {
                console.log(error, error.response.body);
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
try {
    //API FOR storing event webhooks response
    const redis = new Redis(redisConnection)
    redis.on('error', (err) => {
        console.log("Can't connect to redis")
    })
    fastify.post('/webhooks', async (req, res) => {
        const body = req.body;
        console.log("::::::::::::::::Body:::::::::::::", body);

        body.forEach(async (object) => {
            var requestid;
            let apikey;
            let message_id = object.sg_message_id
            const index = message_id.indexOf(".")
            message_id = message_id.substring(0, index)
            const eventReceived = object.event;
            const email = object.email

            console.log("ID::::::::",message_id);
            const response = { status: eventReceived };
            await redis.get(`REQMAP:email:${message_id}`, function(err, value) {
                 requestid=JSON.parse(value).requestid,
                 apikey=JSON.parse(value).apikey
              });
            const key = `REQM:${apikey}:${requestid}:${message_id}:${email}`
            await redis.set(key, JSON.stringify(response), 'ex', DefaultTTL)
            console.log("Redis key set",key);
        })

        //Add response to queue

        // Adding response to the queue
      //  await myQueue.add('Response', eventReceived)
        return res.status(200).send();
    });
} catch (err) {
    console.log("Erorrrr", err);
}



fastify.listen({ port: 3000 }, (err, address) => {
    if (err) throw err
    // Server is now listening on ${address}
})