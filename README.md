### DropBox file insert and delete implementation

This repository uses serverless to deploy a lambda, dynamodb table and an s3 bucket.


using S3, DynamoDB and Serverless it creates some of the functionality for the backend of a miniature DropBox, file storage type 
of application. It keep track of the contents of an S3 bucket in a DynamoDB table. If a new file is added to bucket a record of that is added to database. If a file is deleted a record of the files deletion is added to database.

