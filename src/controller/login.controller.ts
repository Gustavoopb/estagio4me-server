import * as jwt from 'jwt-simple'

import { NextFunction, Request, Response } from 'express'

import { AbstractController } from "./abstract/abstract.controller"
import { MailConfig } from "../config/mail.config"
import { PassportLocalDocument } from "mongoose"
import { ServerConfig } from '../config/server.config'
import { User } from '../schema/user.schema'

export class LoginController extends AbstractController {

    public singUp(req: Request, res: Response, next: NextFunction) {
        User.register(new User(req.body.user), req.body.password, function (err, result) {
            if (err) {
                console.log('error while user register!', err)
                res.status(500).json(err)
            } else {
                result = {
                    account: result,
                    message: "Você foi registrado com sucesso!"
                }
                res.status(200).json(result)
            }
        })
    }

    public checkEmailUsername(req: Request, res: Response, next: NextFunction) {
        User.findOne(req.body, function (err, result) {
            if (err) {
                res.status(500).json(err)
            }
            res.status(200).json(result)
        })
    }

    public login(req: Request, res: Response, next: NextFunction) {
        var token = jwt.encode(new User(req.user), ServerConfig.jwtSecret)
        User.findOne(req.user, (err, result) => {
            var body = {
                user: result,
                token,
                message: "Seja bem-vindo, " + result._firstName + "!"
            }

            res.status(200).json(body)
        })
    }

    public reAuth(req: Request, res: Response, next: NextFunction) {
        var token = jwt.encode(new User(req.user), ServerConfig.jwtSecret)
        User.findOne(req.user, (err, result) => {
            var body = {
                user: result,
                token
            }
            res.status(200).json(body)
        })
    }

    public recoverPassword(req: Request, res: Response, next: NextFunction) {
        User.findOne({ _email: req.body.email }, (err, user) => {
            if (err) {
                res.status(500).json(err)
            } else if (user) {
                var opt = {
                    from: '"Estágio4me" <no-reply@estagio4me.com>',
                    to: user._email,
                    subject: 'Recuperar senha.',
                    text: `Olá ${user._firstName}, para recuperar sua senha use este link: `,
                    html: `<b>Olá ${user._firstName}, para recuperar sua senha use este link: </b>`
                }
                MailConfig.sendMail(opt)
                res.status(200).json(opt)
            } else {
                res.status(500).json({ message: "User not found" })
            }
        })
    }

    public changePassword(req: Request, res: Response, next: NextFunction) {
        User.findById(req.body.id, (err, user: PassportLocalDocument) => {
            if (err) {
                res.status(500).json(err)
            } else if (user) {
                user.setPassword(req.body.password, (err, user) => {
                    if (err) {
                        res.status(500).json(err)
                        return
                    } else {
                        user.save((err, user) => {
                            if (err) {
                                res.status(500).json(err)
                            } else {
                                res.status(200).json(user)
                            }
                        })
                    }
                })
            } else {
                res.status(500).json({ message: "User not found" })
            }
        })
    }
}