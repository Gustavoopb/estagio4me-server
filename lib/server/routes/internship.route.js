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
var internship_schema_1 = require("../schema/internship.schema");
var skill_schema_1 = require("../schema/skill.schema");
var passport = require("passport");
var InternshipRoute = (function (_super) {
    __extends(InternshipRoute, _super);
    function InternshipRoute() {
        var _this = _super.call(this, "/api/internship") || this;
        _this.init();
        return _this;
    }
    InternshipRoute.prototype.insert = function (req, res, next) {
        req.body.requiredSkills.forEach(function (sk) { return sk = new skill_schema_1.Skill(sk); });
        req.body.preferedSkills.forEach(function (sk) { return sk = new skill_schema_1.Skill(sk); });
        var internship = new internship_schema_1.Internship(req.body);
        internship.save(function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(200).json(data);
            }
        });
    };
    InternshipRoute.prototype.findOneAndUpdate = function (req, res, next) {
        internship_schema_1.Internship.findByIdAndUpdate(req.body._id, req.body, function (err, docs) {
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
    InternshipRoute.prototype.findById = function (req, res, next) {
        internship_schema_1.Internship.findById(req.params.id, function (err, docs) {
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
    InternshipRoute.prototype.findAll = function (req, res, next) {
        internship_schema_1.Internship.find().populate('preferedSkills').populate('requiredSkills').exec(function (err, docs) {
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
    InternshipRoute.prototype.delete = function (req, res, next) {
        internship_schema_1.Internship.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err);
                throw err;
            }
            else {
                res.send("Internship was deleted");
            }
        });
    };
    InternshipRoute.prototype.init = function () {
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.delete);
        this.router.post("/updateOne", passport.authenticate('jwt'), this.findOneAndUpdate);
        this.router.get("/findAll", passport.authenticate('jwt'), this.findAll);
        this.router.post("/insert", passport.authenticate('jwt'), this.insert);
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.findById);
        _super.prototype.beUsed.call(this);
    };
    return InternshipRoute;
}(abstract_router_1.AbstractRouter));
exports.default = new InternshipRoute().router;
//# sourceMappingURL=internship.route.js.map