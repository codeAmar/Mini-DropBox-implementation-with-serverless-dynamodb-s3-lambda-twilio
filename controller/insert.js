'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk');
const fetch = require('node-fetch');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const lambda = new AWS.Lambda({
  region: 'us-east-1'
})
let tableName = 'Twilio';
let bucketName = 'minidropboxtwilio';

module.exports.insertfile = (event, context, callback) => {

  const timestamp = new Date().getTime();

  const params = {
    TableName: tableName,
    Item: {
      id: uuid.v1(),
      filename: event.key,
      createdAt: timestamp
    },
  };


  fetch(event.fileurl)
    .then((response) => {
      if (response.ok) {
        return response;
      }
      return Promise.reject(new Error(
        `Failed to fetch ${response.url}: ${response.status} ${response.statusText}`));
    })
    .then(response => response.buffer())
    .then(buffer => (
      s3.putObject({
        Bucket: bucketName,
        Key: event.key,
        Body: buffer
      }, function () {
        dynamoDb.put(params, (error) => {
          if (error) {
            return Promise.reject(new Error(
              'Failed to fetch '));
          }
          let params2 = {
            FunctionName: 'serverless-twilio-minidrop-noitifcation-dev-notification',
            Payload: JSON.stringify({
              filename: event.key
            })
          }
          lambda.invoke(params2, (err, data) => {
            if (err) {
              console.log(err)
              return
            }
          })
        })
      }).promise()
    ))
    .then(v => callback(null, v), callback);

};