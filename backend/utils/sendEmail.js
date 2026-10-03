const nodemailer=require("nodemailer");
const sendEmail= async (to,subject,text)=>{
    try{
        const transporter=nodemailer.createTransport({
            service:'Gmail',
            auth:{
                user:process.env.EMAIL_USER,
                pass:process.env.EMAIL_PASS
            }
        });
        const mailOptions={
            from:process.env.EMAIL_USER,
            to,
            subject,
            text
        };
        await transporter.sendMail(mailOptions);
        console.log(`Email successfully sent to ${to}`);

    }
    catch(error){
        console.error(`failed to send email to ${to} : ${error.message}  `)
        throw error
    }
};

module.exports=sendEmail;