const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();
require('dotenv').config();

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const EMAIL_TO = process.env.EMAIL_TO;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

router.post('/api/send-email', async (req, res) => {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }
    try {
        await transporter.sendMail({
            from: `TEWAS Enterprise Web <${EMAIL_USER}>`,
            to: EMAIL_TO,
            subject: `${subject}`,
            text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
            replyTo: email
        });
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: 'Failed to send email.' });
    }
});

module.exports = router;
