// const { transporter } = require("../../middlewares/email/email");

const { transporter } = require("../../middlewares/email/email")


// const sendEmailController =(req,res)=>{
//     const mailOptions = {
//         from: "vishnulucky053@gmail.com",
//         to: "vishnuvardhan19232@gmail.com",
//         subject: "sending mail",
//         text: "hello world...."
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//             console.log(err, "error is there");
//             res.status(500).send(err); // Sending error response
//         } else {
//             console.log(info.response, "email sent");
//             res.status(200).send(info); // Sending success response
//         }
//     });

//     }

//     module.exports=sendEmailController


const sendEmailController=(req,res)=>{
    const emailOptions ={
        from:"vishnu@gmail.com",
        to:"hello@gmail.com",
        sub:"testing",
        text:"hellooooo is there any one"
    }
    transporter.sendMail(emailOptions,(err , info)=>{
if (err) {
    console.log("failed to send email")
    res.status(400).json({msg:"failed to send email"}).send(err)
}else{
    console.log(info.response+"email add sucessfullly")
    res.status(200).json({msg:"email sent"}).send(info)
}
    })
}
module.exports = sendEmailController