require("dotenv").config({path:"../env"})
const nodemailer = require("nodemailer");

module.exports = async(email,subject,text) =>{
try{

    const transporter = nodemailer.createTransport({
        host: process.env.HOST_NAME,
        service : process.env.SERVICE,
        port: Number(process.env.PORT_NO),
        secure: Boolean(process.env.SECURE),
        auth: {
            user: process.env.USER,
            pass: process.env.PASSWORD
        }
        
    });
    await transporter.sendMail(
        {
            from: process.env.USER,
            to: email, 
            subject: subject, 
            text: text
        }
        )
        console.log("email sent")
    }
    catch(error){
        console.log("error")
        console.log(error)
    }
}