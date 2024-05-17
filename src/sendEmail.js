const AWS = require('aws-sdk');
const ses = new AWS.SES();

module.exports.handler = async (event) => {
    console.log('INICIO DE EXECUÇÃO PARA ENVIAR E-MAIL');
    console.log('EVENTO',event)
    const params = {
        Destination: {
            ToAddresses: ['rawlinson.filho@vallourec.com'] // Specify the recipient email address
        },
        Message: {
            Body: {
                Text: {
                    Charset: 'UTF-8',
                    Data: 'This is the body of the email.'
                }
            },
            Subject: {
                Charset: 'UTF-8',
                Data: 'Test email'
            }
        },
        Source: 'alemaorolim@gmail.com' // Specify the sender email address
    };

    try {
        const data = await ses.sendEmail(params).promise();
        console.log('Email sent:', data.MessageId);
    } catch (err) {
        console.error('Error sending email:', err);
    }
}