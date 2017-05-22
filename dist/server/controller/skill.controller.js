"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = require("./abstract/abstract.controller");
const skill_schema_1 = require("../schema/skill.schema");
class SkillController extends abstract_controller_1.AbstractController {
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
                // console.log(err)
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
}
exports.SkillController = SkillController;
//# sourceMappingURL=skill.controller.js.map