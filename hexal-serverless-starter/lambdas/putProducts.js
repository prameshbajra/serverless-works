'use-strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB();

exports.handler = async (event, context) => {
    const responseObject = {
        body: null,
        headers: {
            'content-type': 'application/json'
        },
        statusCode: 500,
    };
    try {
        const { id, productname } = JSON.parse(event.body);
        const queryParams = {
            TableName: 'products',
            Item: {
                id: { 'S': id },
                productName: { 'S': productname }
            }
        };
        const data = await documentClient.putItem(queryParams).promise();
        responseObject.statusCode = 200;
        responseObject.body = JSON.stringify(data);
    } catch (err) {
        console.error(err);
    }
    return responseObject;
};
