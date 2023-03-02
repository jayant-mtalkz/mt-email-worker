//******************************NOT INCLUDED IN EMAIL-WORKER************************************** */
require('dotenv').config();
const sgmail = require('@sendgrid/mail')
//const sgHelpers = require('@sendgrid/helpers');

sgmail.setApiKey(process.env.SECRET_API_KEY)

const sendMail = async (msg) => {
   try {
      const mmm = await sgmail.send(msg)
      console.log("Message sent successfully", mmm);
   } catch (error) {
      console.log(error.response.body);
   }
}
const msg = {
   to: "kratikakaushik27@gmail.com",
   from: 'kratika.mtalkz@gmail.com',
   subject: 'Ahoy!',
   text: 'Ahoy',
   "personalizations": [
      {
         "to": [
            {
               "email": "kratikakaushik27@gmail.com"
            }
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

//    //    },
//    //    // {
//    //    //   "to": [
//    //    //     {
//    //    //       "email": "kratikakaushik27@gmail.com"
//    //    //     }
//    //    //   ],
//    //    //  "subject":"Hellooooooooo",
//    //    //  "dynamic_template_data":{
//    //    //     "subject":"Marketing",
//    //    //     "total":"$ 239.123",
//    //    //     "items":[
//    //    //        {
//    //    //           "text":"New Line Sneakers",
//    //    //           "image":"https://marketing-image-production.s3.amazonaws.com/uploads/8dda1131320a6d978b515cc04ed479df259a458d5d45d58b6b381cae0bf9588113e80ef912f69e8c4cc1ef1a0297e8eefdb7b270064cc046b79a44e21b811802.png",
//    //    //           "price":"$ 79.95"
//    //    //        },
//    //    //        {
//    //    //           "text":"Old Line Sneakers",
//    //    //           "image":"https://marketing-image-production.s3.amazonaws.com/uploads/3629f54390ead663d4eb7c53702e492de63299d7c5f7239efdc693b09b9b28c82c924225dcd8dcb65732d5ca7b7b753c5f17e056405bbd4596e4e63a96ae5018.png",
//    //    //           "price":"$ 79.95"
//    //    //        }
//    //    //     ],
//    //    //     "receipt":true,
//    //    //     "name":"Sample Name",
//    //    //     "address01":"1234 Fake St.",
//    //    //     "address02":"Apt. 123",
//    //    //     "city":"Place",
//    //    //     "state":"CO",
//    //    //     "zip":"80202"
//    //    //  }

      }
   ],
   "template_id":"d-6a087533cf0e44479a94cd3c4eb1f974"

}

// const msg = {
//    "from": {
//       "email": "kratika.mtalkz@gmail.com"
//    },
//     //"template_id":"d-6a087533cf0e44479a94cd3c4eb1f974",
//     content: [
//       {
//         type: 'text/html',
//         value: '<p>Hello from Twilio SendGrid!</p><p>Sending with the email service trusted by developers and marketers for <strong>time-savings</strong>, <strong>scalability</strong>, and <strong>delivery expertise</strong>.</p><p>%open-track%</p>'
//       }
//     ],
//    "personalizations": [
//       {
//          "to":{
//             "email":"neha.yadav@mtalkz.com"
//          },
//          "subject":"Hello",
//         // "text":"mgfdsertghjk"
//       }
//    ]
// }

// const msg = {

//             from: "kratika.mtalkz@gmail.com",
//             // to:"kratikakaushik27@gmail.com",
//             personalizations: [
//                {

//                   to: [
//                      {
//                         email: 'kratikakaushik27@gmail.com',
//                         name: 'Janice Doe'
//                      }
//                   ],
//                   subject: "Hello",

//                }
//             ],
//             "template_id": "d-6a087533cf0e44479a94cd3c4eb1f974",


//          }

sendMail(msg);



