import * as nodemailer from 'nodemailer'

export class MailConfig {
    private static _transporter: nodemailer.Transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'estagio4me@gmail.com',
            pass: 'Gus3186547'
        }
    })

    public static sendMail(mailOption) {
        this._transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                return console.log(err)
            }
            console.log('Message %s sent: %s', info.messageId, info.response)
        })
    }

}