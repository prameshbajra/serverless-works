'use-strict';

const AWS = require('aws-sdk');
const documentClient = new AWS.DynamoDB();

exports.handler = async (event, context) => {
    const responseObject = {
        body: 'Unable to perform this operation',
        headers: {
            'content-type': 'application/json'
        },
        statusCode: 500,
    };
    try {
        const { id } = event.pathParameters;
        const queryParams = {
            TableName: 'products',
            Key: {
                id: { 'S': id }
            }
        };
        const data = await documentClient.deleteItem(queryParams).promise();
        responseObject.statusCode = 200;
        responseObject.body = JSON.stringify(data);
    } catch (err) {
        console.error(err);
    }
    return responseObject;
};
