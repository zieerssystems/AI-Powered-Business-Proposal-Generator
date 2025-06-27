const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  // ✅ Replace these with your Gmail + App Password
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-real-gmail@gmail.com',         // ⬅️ Replace with your Gmail
      pass: 'your-16-digit-app-password',        // ⬅️ Replace with Gmail App Password
    },
  });

  try {
    await transporter.sendMail({
      from: 'your-real-gmail@gmail.com', // ⬅️ Same as above
      to,
      subject,
      text,
    });

    res.json({ success: true, message: 'Email sent successfully!' });
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    res.status(500).json({ success: false, message: 'Error: ' + error.message });
  }
});

// Start the server
app.listen(5000, () => console.log('✅ Server started on port 5000'));
