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
var skill_schema_1 = require("../schema/skill.schema");
var passport = require("passport");
var SkillRoute = (function (_super) {
    __extends(SkillRoute, _super);
    function SkillRoute() {
        var _this = _super.call(this, "/api/skill") || this;
        _this.init();
        return _this;
    }
    SkillRoute.prototype.insert = function (req, res, next) {
        var skill = new skill_schema_1.Skill(req.body);
        skill.save(function (err, data) {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(200).json(data);
            }
        });
    };
    SkillRoute.prototype.findOneAndUpdate = function (req, res, next) {
        skill_schema_1.Skill.findByIdAndUpdate(req.body._id, req.body, function (err, docs) {
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
    SkillRoute.prototype.findById = function (req, res, next) {
        skill_schema_1.Skill.findById(req.params.id, function (err, docs) {
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
    SkillRoute.prototype.findAll = function (req, res, next) {
        skill_schema_1.Skill.find(function (err, docs) {
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
    SkillRoute.prototype.delete = function (req, res, next) {
        skill_schema_1.Skill.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err);
                throw err;
            }
            else {
                res.send("Skill was deleted");
            }
        });
    };
    SkillRoute.prototype.init = function () {
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.delete);
        this.router.post("/updateOne", passport.authenticate('jwt'), this.findOneAndUpdate);
        this.router.get("/findAll", passport.authenticate('jwt'), this.findAll);
        this.router.post("/insert", passport.authenticate('jwt'), this.insert);
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.findById);
        _super.prototype.beUsed.call(this);
    };
    return SkillRoute;
}(abstract_router_1.AbstractRouter));
exports.default = new SkillRoute().router;
//# sourceMappingURL=skill.route.js.map