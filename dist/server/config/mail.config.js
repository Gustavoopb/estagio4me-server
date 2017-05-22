"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer = require("nodemailer");
class MailConfig {
    static sendMail(mailOption) {
        this._transporter.sendMail(mailOption, (err, info) => {
            if (err) {
                return console.log(err);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
        });
    }
}
MailConfig._transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'estagio4me@gmail.com',
        pass: 'Gus3186547'
    }
});
exports.MailConfig = MailConfig;
//# sourceMappingURL=mail.config.js.map