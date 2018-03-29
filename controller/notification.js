'use strict';
var credentials = {
    accountSid: process.env.SID,
    authToken: process.env.TOKEN,
    to: process.env.TONUMBER,
    from: process.env.FROMNUMBER
};
const twilio = require('twilio');
const client = new twilio(credentials.accountSid, credentials.authToken);

module.exports.notification = (event, context, callback) => {
    console.log('event :',event);
    // let file = [];
    // event.Records.forEach((record) => {
    //     file.push(record.s3.object.key);
    // });
    client.messages.create({
        // body: "File added to S3 Bucket!!!\n" + file.join(', ') + ".",
        body: "File added to S3 Bucket!!!\n" + event.filename + ".",        
        to: credentials.to,
        from: credentials.from
    }).then((message) => console.log(message.sid));
};