const express = require("express");
const router = express.Router();
const cors = require("cors");
const nodemailer = require("nodemailer");
const multer = require('multer')
const app = express();
var path;
app.use(cors());
app.use(express.json());
app.use("/", router);
const contactEmail = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: "rishabhhprakashh@gmail.com",
    pass: "Tubercat@00",
  },
});


const imageStorage = multer.diskStorage({
  // Destination to store image     
  destination: 'images', 
  filename: function(req, file, callback) {
    callback(null, file.originalname);

          // file.fieldname is name of the field (image)
          // path.extname get the uploaded file extension
          // console.log(file.fieldname)
          // console.log(file.originalname)
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: {
    fileSize: 10000000 
  },
  
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(png|jpg|pdf|doc|docx|jpeg|ppt|pptx|xls|xlsx)$/)) { 
       // upload only png and jpg format
       return cb(new Error('Please upload a file with vali supported extension'))
     }
     else{
      console.log(file.originalname)
     }
   cb(undefined, true)
}
}) 
router.post('/contact', imageUpload.single('imgup'), (req, res) => {
  res.send(req.file)
  // console.log( req.file.path)
  // router.post("/contact", (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message; 
    const subject = req.body.subject;
    
    console.log(req.file.path)
    const mail = {
      from: name,
      to: email,
      subject: subject,
      
      attachments: [
        {
         path: req.file.path
        }
     ],
      // subject: "Study Group",
      html: `<p>Name: Dear Candidate</p>
             <a>Email: ${email}</p>
             <a href="http://localhost:3000/Login">Click here for login </a>
  
             <p>Message: ${message}</p>`,
    };
    contactEmail.sendMail(mail, (error) => {
      if (error) {
        res.json({ status: "ERROR" });
      } 
      else {
        res.json({ status: "Message Sent" });
      }
    });
  

}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

router.post("/contacttest", (req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message; 
  const subject = req.body.subject;
  const mail = {
    from: name,
    to: email,
    subject: subject,
    html: `<p>Name: ${name}</p>
           <a>Email: ${email}</p>
           <a href="https://chatapplication-hwr7nalbaq-uc.a.run.app/Login">Click here for login </a>

           <p>Message: ${message}</p>`,
  };
  contactEmail.sendMail(mail, (error) => {
    if (error) {
      res.json({ status: "ERRORs" });
    } 
    else {
      res.json({ status: "Message Sent" });
    }
  });

}, (error, req, res, next) => {
  res.status(400).send({ error: error.message })
})

contactEmail.verify((error) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready to Send");
  }
});
