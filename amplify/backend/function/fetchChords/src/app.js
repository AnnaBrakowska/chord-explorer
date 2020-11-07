const AWS = require('aws-sdk')
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware')
const bodyParser = require('body-parser')
const express = require('express')

const dynamodb = new AWS.DynamoDB.DocumentClient();
let tableName = "chords";
const path = "/chords";

AWS.config.update({ region: 'us-east-1' });


if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + '-' + process.env.ENV;
}


// Declare a new express app
let app = express()
app.use(bodyParser.json())
app.use(awsServerlessExpressMiddleware.eventContext())

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
});

/*****************************************
 GET ALL OBJECTS
 *****************************************/

app.get(path + '/all', (req, res) => {
  let params = {
    TableName: tableName
  }

  dynamodb.scan(params, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: 'Could not load items: ' + err.message });
    } else {
      if (data.Items) {
        res.json(data.Items);
      } else {
        res.json(data);
      }
    }
  });
});

app.listen(3000, function () {
  console.log("App started")
});

module.exports = app

