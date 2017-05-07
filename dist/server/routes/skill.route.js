"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = require("./abstract/abstract.router");
const skill_schema_1 = require("../schema/skill.schema");
const passport = require("passport");
class SkillRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/skill");
        this.init();
    }
    insert(req, res, next) {
        var skill = new skill_schema_1.Skill(req.body);
        skill.save((err, docs) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                res.status(200).json(docs);
            }
        });
    }
    insertMany(req, res, next) {
        var result = [];
        req.body.forEach(sk => {
            var skill = new skill_schema_1.Skill(sk);
            skill.save((err, docs) => {
                if (err) {
                    console.log(err);
                }
                else {
                    result.push(docs);
                }
            });
        });
        res.status(200).json(result);
    }
    findOneAndUpdate(req, res, next) {
        skill_schema_1.Skill.findByIdAndUpdate(req.body._id, req.body, (err, docs) => {
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
        skill_schema_1.Skill.findById(req.params.id, (err, docs) => {
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
        skill_schema_1.Skill.find().sort({ name: 1 }).exec((err, docs) => {
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
        skill_schema_1.Skill.remove({ "_id": req.params.id }, (err) => {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).send("Skill was deleted");
            }
        });
    }
    init() {
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.delete);
        this.router.get("/findAll", passport.authenticate('jwt'), this.findAll);
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.findById);
        this.router.post("/insert", passport.authenticate('jwt'), this.insert);
        this.router.post("/insertMany", passport.authenticate('jwt'), this.insertMany);
        this.router.post("/updateOne", passport.authenticate('jwt'), this.findOneAndUpdate);
        super.beUsed();
    }
}
exports.default = new SkillRoute().router;
//# sourceMappingURL=skill.route.js.map