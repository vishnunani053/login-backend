const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service:"gmail",
    port:2525,
    auth:{
        user:"test@gmail.com",
        pass:"testing"
    }
})

module.exports={transporter}