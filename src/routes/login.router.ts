import { Request, Response, NextFunction } from 'express'
import { AbstractRouter } from './abstract/abstract.router'
import { User } from '../schema/user.schema'
import { IUserModel } from '../model/user.model'
import { ServerConfig } from '../config/server.config'
import * as passport from 'passport'
import * as jwt from 'jwt-simple'


class UserRoute extends AbstractRouter {

    constructor() {
        super("/api/login")
        this.init()
    }

    public singUp(req: Request, res: Response, next: NextFunction) {
        User.register(new User(req.body.user), req.body.password, function (err, result) {
            if (err) {
                console.log('error while user register!', err)
                res.status(500).json(err)
            } else {
                result = {
                    account: result,
                    message: "You have been successful registred!"
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
        var user = User.findOne(req.user, (err, result) => {
            var body = {
                user: result,
                token,
                message: "You have been successful logedin!"
            }

            res.status(200).json(body)
        })
    }

    public reAuth(req: Request, res: Response, next: NextFunction) {
        var token = jwt.encode(new User(req.user), ServerConfig.jwtSecret)
        var user = User.findOne(req.user, (err, result) => {
            var body = {
                user: result,
                token
            }
            res.status(200).json(body)
        })
    }

    init() {
        this.router.post("/singUp", this.singUp)
        this.router.post("/checkEmailUsername", this.checkEmailUsername)
        this.router.post("/login", passport.authenticate('local'), this.login)
        this.router.get("/reAuth", passport.authenticate('jwt'), this.reAuth)
        super.beUsed()
    }
}

export default new UserRoute().router