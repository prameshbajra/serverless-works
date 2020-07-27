'use-strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
    const responseObject = {
        body: 'Unable to update product',
        headers: {
            'content-type': 'application/json'
        },
        statusCode: 500,
    };
    try {
        const queryParams = {
            TableName: 'products',
            Key: {
                id: 'UkasjhdvHGajhdsf',
            },
            UpdateExpression: "set productName=:productName",
            ExpressionAttributeValues: {
                ":productName": "ASUS Vivobook Gaming F571GT i7 9th GEN"
            },
            ReturnValues: 'UPDATED_NEW'
        };
        const data = await documentClient.update(queryParams).promise();
        responseObject.statusCode = 200;
        responseObject.body = JSON.stringify(data);
    } catch (err) {
        console.error(err);
    }
    return responseObject;
};
