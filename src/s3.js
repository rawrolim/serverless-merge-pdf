const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const fetch = require("node-fetch");

module.exports.handler = async (event) => {
  const uri_pdf = "https://www.thecampusqdl.com/uploads/files/pdf_sample_2.pdf";

  const sgroResponse = await fetch(uri_pdf);
  const blob = await sgroResponse.buffer();
  console.log("RESPONSE FETCH",blob);

  const paramsToInsertFile = {
    Bucket: "bucket-pdf-test-rawlinson",
    Key: 'arquivo.pdf',
    Body: blob
  };
  await s3.putObject(paramsToInsertFile).promise();

  const paramsToGetUri = {
    Bucket: "bucket-pdf-test-rawlinson",
    Key: 'arquivo.pdf',
    Expires: 300,
    ResponseContentDisposition: `inline; filename='arquivo.pdf`,
  };
  const urlSingned = s3.getSignedUrl('getObject', paramsToGetUri);

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        urlSingned
      }
    ),
  };
};
