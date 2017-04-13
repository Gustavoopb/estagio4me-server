"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = require("./abstract/abstract.router");
const user_schema_1 = require("../schema/user.schema");
class UserRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/user");
        this.init();
    }
    findOneAndUpdate(req, res, next) {
        user_schema_1.User.findByIdAndUpdate(req.body._id, req.body, function (err, docs) {
            if (!err) {
                res.status(200).json(docs);
            }
            else {
                console.log(err);
                res.status(500).send(err);
                throw err;
            }
        });
    }
    findById(req, res, next) {
        user_schema_1.User.findById(req.params.id, function (err, docs) {
            if (!err) {
                res.status(200).json(docs);
            }
            else {
                console.log(err);
                res.status(500).send(err);
                throw err;
            }
        });
    }
    findAll(req, res, next) {
        user_schema_1.User.find(function (err, docs) {
            if (!err) {
                res.status(200).json(docs);
            }
            else {
                console.log(err);
                res.status(500).send(err);
                throw err;
            }
        });
    }
    delete(req, res, next) {
        user_schema_1.User.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err);
                throw err;
            }
            else {
                res.send("User was deleted");
            }
        });
    }
    init() {
        this.router.delete("/delete/:id", this.delete);
        this.router.post("/updateOne", this.findOneAndUpdate);
        this.router.get("/findAll", this.findAll);
        this.router.get("/findById/:id", this.findById);
        super.beUsed();
    }
}
exports.default = new UserRoute().router;
//# sourceMappingURL=user.route.js.map