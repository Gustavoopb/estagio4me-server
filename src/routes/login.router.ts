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
        User.register(new User(req.body.user), req.body.password, function (err, account) {
            if (err) {
                console.log('error while user register!', err)
                res.status(500).json(err)
            }
            var result = {
                [account]: account,
                message: "You have been successful registred!"
            }
            res.status(200).json(result)
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
        var user: IUserModel = new User(req.user)
        var token = { token: jwt.encode(user, ServerConfig.jwtSecret) }
        var result = {
            token,
            message: "You have been successful registred!"
        }
        req.originalUrl
        console.log(token, req.headers["origin"])
        res.status(200).json(result)
    }

    init() {
        this.router.post("/singUp", this.singUp)
        this.router.post("/checkEmailUsername", this.checkEmailUsername)
        this.router.post("/login", passport.authenticate('local'), this.login)
        super.beUsed()
    }
}

export default new UserRoute().router