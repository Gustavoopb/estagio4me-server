"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = require("./abstract/abstract.router");
const internship_schema_1 = require("../schema/internship.schema");
const passport = require("passport");
class InternshipRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/internship");
        this.init();
    }
    insert(req, res, next) {
        var internship = new internship_schema_1.Internship(req.body);
        internship.save((err, data) => {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                res.status(200).json(data);
            }
        });
    }
    findOneAndUpdate(req, res, next) {
        var internship = new internship_schema_1.Internship(req.body);
        internship_schema_1.Internship.findByIdAndUpdate(internship.get('id'), internship)
            .populate('_preferredSkills _requiredSkills')
            .exec((err, docs) => {
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
        internship_schema_1.Internship.findById(req.params.id, function (err, docs) {
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
        internship_schema_1.Internship.find().populate('_preferredSkills _requiredSkills').exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs);
            }
            else {
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
    findByFilter(req, res, next) {
        internship_schema_1.Internship.find(req.body).populate('_preferredSkills _requiredSkills').sort({ _createdAt: -1 }).exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs);
            }
            else {
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
    findOneByFilter(req, res, next) {
        internship_schema_1.Internship.findOne(req.body).populate('_preferredSkills _requiredSkills').exec((err, docs) => {
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
        internship_schema_1.Internship.remove({ "_id": req.params.id }, (err) => {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json({ message: "Internship was deleted" });
            }
        });
    }
    init() {
        this.router.delete("/delete/:id", passport.authenticate('jwt'), this.delete);
        this.router.post("/updateOne", passport.authenticate('jwt'), this.findOneAndUpdate);
        this.router.get("/findAll", passport.authenticate('jwt'), this.findAll);
        this.router.post("/findByFilter", this.findByFilter);
        this.router.post("/findOneByFilter", passport.authenticate('jwt'), this.findOneByFilter);
        this.router.post("/insert", passport.authenticate('jwt'), this.insert);
        this.router.get("/findById/:id", passport.authenticate('jwt'), this.findById);
        super.beUsed();
    }
}
exports.default = new InternshipRoute().router;
//# sourceMappingURL=internship.route.js.map