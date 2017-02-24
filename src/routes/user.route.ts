import { Request, Response, NextFunction } from 'express';
import { AbstractRouter } from './abstract/abstract.router';
import { User } from '../model/user.model';


class UserRoute extends AbstractRouter {

    constructor() {
        super("/server/user");
    }

    public getAll(req: Request, res: Response, next: NextFunction) {
        User.find({}, function (err, docs) {
            if (!err) {
                res.status(200).json(docs);
            } else {
                console.log(err);
                res.status(500).send(err);
                throw err;
            }
        });
    }

    public saveUser(req: Request, res: Response, next: NextFunction) {
        var user = new User();
        user.name = req.body.name;
        user.email = req.body.email;
        user.save()
        res.json(user);
    }

    init() {
        this.route.post("/post", this.saveUser)
        this.route.get("/find", this.getAll);
        super.beUsed();
    }
}

const userRoute: UserRoute = new UserRoute();
userRoute.init();
export default userRoute.route;