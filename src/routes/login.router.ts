import { Request, Response, NextFunction } from 'express'
import { AbstractRouter } from './abstract/abstract.router'
import { User } from '../schema/user.schema'
import * as passport from 'passport'


class UserRoute extends AbstractRouter {

    constructor() {
        super("/api/login")
        this.init()
    }

    public singUp(req: Request, res: Response, next: NextFunction) {
        User.register(new User(req.body.user), req.body.password, function (err, account) {
            if (err) {
                console.log('error while user register!', err)
                res.json(err)
                return next(err)
            }
            res.status(200).json(account)
        })
    }

    public login(req: Request, res: Response, next: NextFunction) {
        res.status(200).json(req.user)
    }

    init() {
        this.router.post("/singUp", this.singUp)
        this.router.post("/login", passport.authenticate('local'), this.login)
        super.beUsed()
    }
}

export default new UserRoute().router