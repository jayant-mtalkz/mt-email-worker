const { Queue } = require('bullmq')

const { emailQueue } = require('./data')
const { redisConnection } = require('./config/redisConfig')

//worker payload 1
const queuePayLoad1 = {
    "requestid": "kBJCkhdQOd1Zr4s",
    "apikey": "jxqA2OvBovo6VLRb",
    "data": {
        "from": "kratika.mtalkz@gmail.com",
        "personalizations": [
            {
                "to": [
                    {
                        "email": "kratikakaushik27@gmail.com"
                    }
                ]
            }
        ],
        "template_id": "d-e15108ed18544bdaaff63d26d9fce548"

    },
    "channel": "email",
}

//worker payload 2
const queuePayLoad2 = {
    "requestid": "kBJCkhdQOd1Zr4s",
    "apikey": "jxqA2OvBovo6VLRb",
    "data": {
        "from": "kratika.mtalkz@gmail.com",
        "personalizations": [
            {
                "to": [
                    {
                        "email": "kratikakaushik27@gmail.com"
                    }
                ],
                "dynamic_template_data": {
                    "subject": "wanderlust",
                }
                // "send_at":1677760000
            },
            // {
            //     "to": [
            //         {
            //             "email": "kratikakaushik27@gmail.com"
            //         }
            //     ],
            //     "subject":"Travel",

            // }
        ],
        "template_id": "d-3a7d6a0b98584f7e8bcef419a588666f"

    },
    "channel": "email",
}

// worker payload 3

const queuePayload3 = {
    "requestid": "kBJCkhdQOd1Zr4s",
    "apikey": "jxqA2OvBovo6VLRb",
    "data": {

        "from": "kratika.mtalkz@gmail.com",
        subject: 'Ahoy!',
        text: 'Ahoy',
        "personalizations": [
            {
                "to": [
                    { "email": "kratikakaushik27@gmail.com" }
                ],
                "subject": "Greeetings todayyyyyyyyyyyyy",
                "dynamic_template_data": {
                    "subject": "Marketing",
                    "total": "$ 239.85",
                    "items": [
                        {
                            "text": "New Line Sneakers",
                            "image": "https://marketing-image-production.s3.amazonaws.com/uploads/8dda1131320a6d978b515cc04ed479df259a458d5d45d58b6b381cae0bf9588113e80ef912f69e8c4cc1ef1a0297e8eefdb7b270064cc046b79a44e21b811802.png",
                            "price": "$ 79.95"
                        },
                        {
                            "text": "Old Line Sneakers",
                            "image": "https://marketing-image-production.s3.amazonaws.com/uploads/3629f54390ead663d4eb7c53702e492de63299d7c5f7239efdc693b09b9b28c82c924225dcd8dcb65732d5ca7b7b753c5f17e056405bbd4596e4e63a96ae5018.png",
                            "price": "$ 79.95"
                        },
                        {
                            "text": "Blue Line Sneakers",
                            "image": "https://marketing-image-production.s3.amazonaws.com/uploads/00731ed18eff0ad5da890d876c456c3124a4e44cb48196533e9b95fb2b959b7194c2dc7637b788341d1ff4f88d1dc88e23f7e3704726d313c57f350911dd2bd0.png",
                            "price": "$ 79.95"
                        }
                    ],
                    "receipt": true,
                    "name": "Sample Name",
                    "address01": "1234 Fake St.",
                    "address02": "Apt. 123",
                    "city": "Place",
                    "state": "CO",
                    "zip": "80202"
                }
            }
        ],
        "template_id": "d-6a087533cf0e44479a94cd3c4eb1f974",

    },
    "channel": "email",
}

try {
    // Creating queue
    const myQueue = new Queue(emailQueue.email, {
        connection: redisConnection
    })

    async function addJobs() {
        await myQueue.add('email', queuePayLoad1)

        // await myQueue.add( 'email', queuePayLoad2 )

        //  await myQueue.add( 'email', queuePayload3 )
    }

    addJobs()

    console.log(`Payload added to queue: ${emailQueue.email}`)

} catch (err) {
    console.log("Error Creating", err)
}
