const { Worker } = require('bullmq');
const { emailQueue } = require('./data')

const worker = new Worker(emailQueue.events, async job => {
    console.log(`Consumed data from ${emailQueue.events} queue`)
    console.log(job.data)
})
