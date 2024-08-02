require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express();
const port = 3000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const sendWelcomeEmail = (email, name) => {
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL,
        subject: 'Welcome to DEV@Deakin!',
        text: `Hi ${name}, welcome to DEV@Deakin! We're glad to have you.`,
        html: `<strong>Hi ${name}, welcome to DEV@Deakin! We're glad to have you.</strong>`,
    };

    sgMail
        .send(msg)
        .then(() => {
            console.log('Welcome email sent successfully.');
        })
        .catch((error) => {
            console.error('Error sending welcome email:', error);
        });
};

app.post('/send-welcome-email', (req, res) => {
    const { email, name } = req.body;

    sendWelcomeEmail(email, name);

    res.status(200).send('Request to send welcome email received.');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
const email = 'sdhivyaalakshmi@gmail.com'; 
const name = 'Dev'; 
sendWelcomeEmail(email, name);

