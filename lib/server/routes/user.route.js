"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var abstract_router_1 = require("./abstract/abstract.router");
var user_schema_1 = require("../schema/user.schema");
var UserRoute = (function (_super) {
    __extends(UserRoute, _super);
    function UserRoute() {
        var _this = _super.call(this, "/api/user") || this;
        _this.init();
        return _this;
    }
    UserRoute.prototype.findOneAndUpdate = function (req, res, next) {
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
    };
    UserRoute.prototype.findById = function (req, res, next) {
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
    };
    UserRoute.prototype.findAll = function (req, res, next) {
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
    };
    UserRoute.prototype.delete = function (req, res, next) {
        user_schema_1.User.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err);
                throw err;
            }
            else {
                res.send("User was deleted");
            }
        });
    };
    UserRoute.prototype.init = function () {
        this.router.delete("/delete/:id", this.delete);
        this.router.post("/updateOne", this.findOneAndUpdate);
        this.router.get("/findAll", this.findAll);
        this.router.get("/findById/:id", this.findById);
        _super.prototype.beUsed.call(this);
    };
    return UserRoute;
}(abstract_router_1.AbstractRouter));
exports.default = new UserRoute().router;
//# sourceMappingURL=user.route.js.map