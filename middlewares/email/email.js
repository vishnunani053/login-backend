// const nodemailer = require('nodemailer')

// const transporter = nodemailer.createTransport({
//     service:"smtp.mailtrap.io",
//     port:465,
//     auth:{
//         user:"vishnulucky053@gmail.com",
//         pass:"8461196615"
//     }
// })

// module.exports = {transporter}.


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