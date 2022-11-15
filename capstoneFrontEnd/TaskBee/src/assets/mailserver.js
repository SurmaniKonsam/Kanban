const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

app.listen(3000, () => {
  console.log("The server started on port 3000 !!!!!!");
});

app.post("/sendmail", (req, res) => {
  console.log("request came");
  let user = req.body;
  sendMail(user, info => {
    console.log(`The mail has been sent and the id is ${info.messageId}`);
    res.send(info);
  });
});

async function sendMail(user, callback) {
  
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: 'surmanikonsam96@gmail.com',
        pass: 'szbyolmcqlhcywua'
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  let mailOptions = {
    from: '"TaskBee"<example.gimail.com>',
    to: user.email,
    subject: "Welcome to TaskBee",
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>Thanks for becoming a TaskBee user! We're thrilled to have you onboard. Here are some of the benefits you can get from using our service.
    <br>
    - Get your tasks done on time.
    <br>
    - Save time and work efficiently by prioritising tasks and projects.
    <br>
    - Contact other team members, give them tasks or jobs, and monitor their progress. .
    <br>
    Get started with TaskBee!</h4>
    <br>
    <h3>Thanks and Regards,<br>TaskBee Team</h3>`
  };

  
  let info = await transporter.sendMail(mailOptions);

  callback(info);
}