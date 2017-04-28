"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = require("./abstract/abstract.router");
const internship_schema_1 = require("../schema/internship.schema");
const skill_schema_1 = require("../schema/skill.schema");
const passport = require("passport");
class InternshipRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/internship");
        this.init();
    }
    insert(req, res, next) {
        req.body.requiredSkills.forEach(sk => sk = new skill_schema_1.Skill(sk));
        req.body.preferedSkills.forEach(sk => sk = new skill_schema_1.Skill(sk));
        var internship = new internship_schema_1.Internship(req.body);
        internship.save((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).send(err);
            }
            else {
                res.status(200).json(data);
            }
        });
    }
    findOneAndUpdate(req, res, next) {
        var internship = new internship_schema_1.Internship(req.body);
        internship_schema_1.Internship.findByIdAndUpdate(internship.get('id'), internship, function (err, docs) {
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
    }
    findAll(req, res, next) {
        internship_schema_1.Internship.find().populate('preferedSkills').populate('requiredSkills').exec((err, docs) => {
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
    findByFilter(req, res, next) {
        internship_schema_1.Internship.find(req.body).populate('preferedSkills').populate('requiredSkills').sort({ createdAt: -1 }).exec((err, docs) => {
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
        internship_schema_1.Internship.remove({ "_id": req.params.id }, function (err) {
            if (err) {
                res.status(500).json(err);
                throw err;
            }
            else {
                res.send("Internship was deleted");
            }
        });
    }
    init() {
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.delete);
        this.router.post("/updateOne", passport.authenticate('jwt'), this.findOneAndUpdate);
        this.router.get("/findAll", passport.authenticate('jwt'), this.findAll);
        this.router.post("/findByFilter", passport.authenticate('jwt'), this.findByFilter);
        this.router.post("/insert", passport.authenticate('jwt'), this.insert);
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.findById);
        super.beUsed();
    }
}
exports.default = new InternshipRoute().router;
//# sourceMappingURL=internship.route.js.map