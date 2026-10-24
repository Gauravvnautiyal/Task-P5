require("dotenv").config();
const express = require("express");
const cors = require("cors");
const sgMail = require("@sendgrid/mail");

const app = express();
const PORT = 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// allow React (port 3000) to talk to this server
app.use(cors());
app.use(express.json());

app.post("/subscribe", async (req, res) => {
    const email = req.body.email;

    // check 1: email is empty
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    // check 2: email has no @ or .
    if (!email.includes("@") || !email.includes(".")) {
        return res.status(400).json({ message: "Please enter a valid email" });
    }

    const msg = {
        to: email,
        from: process.env.FROM_EMAIL,
        subject: "Welcome to DEV@Deakin",
        text: "Thanks for subscribing to DEV@Deakin!"
    };

    try {
        const result = await sgMail.send(msg);
        console.log("SendGrid Status:", result[0].statusCode);
        console.log("Email sent to:", email);
        console.log("API response status: 200");

        res.status(200).json({ message: "Welcome email sent! Check your inbox." });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Failed to send email. Try again later." });
    }
});

app.listen(PORT, () => {
    console.log("Server running at http://localhost:" + PORT);
});