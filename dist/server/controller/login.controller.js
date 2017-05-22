"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jwt-simple");
const abstract_controller_1 = require("./abstract/abstract.controller");
const mail_config_1 = require("../config/mail.config");
const server_config_1 = require("../config/server.config");
const user_schema_1 = require("../schema/user.schema");
class LoginController extends abstract_controller_1.AbstractController {
    singUp(req, res, next) {
        user_schema_1.User.register(new user_schema_1.User(req.body.user), req.body.password, function (err, result) {
            if (err) {
                console.log('error while user register!', err);
                res.status(500).json(err);
            }
            else {
                result = {
                    account: result,
                    message: "Você foi registrado com sucesso!"
                };
                res.status(200).json(result);
            }
        });
    }
    checkEmailUsername(req, res, next) {
        user_schema_1.User.findOne(req.body, function (err, result) {
            if (err) {
                res.status(500).json(err);
            }
            res.status(200).json(result);
        });
    }
    login(req, res, next) {
        var token = jwt.encode(new user_schema_1.User(req.user), server_config_1.ServerConfig.jwtSecret);
        user_schema_1.User.findOne(req.user, (err, result) => {
            var body = {
                user: result,
                token,
                message: "Seja bem-vindo, " + result._firstName + "!"
            };
            res.status(200).json(body);
        });
    }
    reAuth(req, res, next) {
        var token = jwt.encode(new user_schema_1.User(req.user), server_config_1.ServerConfig.jwtSecret);
        user_schema_1.User.findOne(req.user, (err, result) => {
            var body = {
                user: result,
                token
            };
            res.status(200).json(body);
        });
    }
    recoverPassword(req, res, next) {
        user_schema_1.User.findOne({ _email: req.body.email }, (err, user) => {
            if (err) {
                res.status(500).json(err);
            }
            else if (user) {
                var opt = {
                    from: '"Estágio4me" <no-reply@estagio4me.com>',
                    to: user._email,
                    subject: 'Recuperar senha.',
                    text: `Olá ${user._firstName}, para recuperar sua senha use este link: `,
                    html: `<b>Olá ${user._firstName}, para recuperar sua senha use este link: </b>`
                };
                mail_config_1.MailConfig.sendMail(opt);
                res.status(200).json(opt);
            }
            else {
                res.status(500).json({ message: "User not found" });
            }
        });
    }
    changePassword(req, res, next) {
        user_schema_1.User.findById(req.body.id, (err, user) => {
            if (err) {
                res.status(500).json(err);
            }
            else if (user) {
                user.setPassword(req.body.password, (err, user) => {
                    if (err) {
                        res.status(500).json(err);
                        return;
                    }
                    else {
                        user.save((err, user) => {
                            if (err) {
                                res.status(500).json(err);
                            }
                            else {
                                res.status(200).json(user);
                            }
                        });
                    }
                });
            }
            else {
                res.status(500).json({ message: "User not found" });
            }
        });
    }
}
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map