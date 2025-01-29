const nodemailer = require('nodemailer');
const bcryptjs = require('bcryptjs');


import User from '@/models/userModel';

export const sendEmail =async({email,emailType,userID}:any)=>{
    try {
        const hashedToken=await bcryptjs.hash(userID.toString(),10)

        if(emailType==="VERIFY"){
            await User.findByIdAndUpdate(userID,{
                verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            })
        }
        else if(emailType="RESET"){
            await User.findByIdAndUpdate(userID,{
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000

        });

        } 
        // Looking to send emails in production? Check out our Email API/SMTP product!
        var transport = nodemailer.createTransport({
          host: "sandbox.smtp.mailtrap.io",
          port: 2525,
          auth: {
            user: "8607a9d3c6886b",
            pass: "33e34a8b495b1d"
          }
        });

        const mailoptions={
            from:'smritirai2005@gmail.com',
            to:email,
            subject:emailType==="VERIFY" ? "Verify your email":"Reset ur password",
            html:` <p> Click <a href="${process.env.domain}/verifyemail?token=${hashedToken}">here</a> to ${emailType==="VERIFY"?"Verify ur email":
                "reset ur password"}</p>`
        }
        const mailresponse=await transport.sendMail(mailoptions);
        return mailresponse;

    
    }
    catch (error:any) {
        throw new Error(error.message);
        
    }


}