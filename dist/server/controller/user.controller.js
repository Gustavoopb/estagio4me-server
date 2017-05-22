"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = require("./abstract/abstract.controller");
const user_schema_1 = require("../schema/user.schema");
class UserController extends abstract_controller_1.AbstractController {
    findOneAndUpdate(req, res, next) {
        user_schema_1.User.findByIdAndUpdate(req.body._id, req.body, function (err, docs) {
            if (!err) {
                res.status(200).json(docs);
            }
            else {
                console.log(err);
                res.status(500).json(err);
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
                res.status(500).json(err);
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
                res.status(500).json(err);
            }
        });
    }
    delete(req, res, next) {
        user_schema_1.User.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.send("User was deleted");
            }
        });
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map