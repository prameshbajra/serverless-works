const AWS = require('aws-sdk');

const s3 = new AWS.S3();
const dynamoDB = new AWS.DynamoDB();

exports.handler = async (event) => {
    const { name } = event.Records[0].s3.bucket;
    const { key } = event.Records[0].s3.object;

    const params = {
        Bucket: name,
        Key: key
    };
    try {
        const data = await s3.getObject(params).promise();
        const productsJSON = JSON.parse(data.Body.toString());
        console.log("START INSERTING!!");
        for (let product of productsJSON.products) {
            console.log("Inserting ", product);
            const queryParams = {
                TableName: 'products',
                Item: {
                    id: { 'S': product.id },
                    productName: { 'S': product.productname }
                }
            };
            const data = await dynamoDB.putItem(queryParams).promise();
            console.log("Insertion done ", data);
        }
        console.log("DONE INSERTING ALL!!");
    } catch (error) {
        console.log(error);
    }
};
