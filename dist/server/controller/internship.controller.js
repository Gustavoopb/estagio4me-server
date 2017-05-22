"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = require("./abstract/abstract.controller");
const internship_schema_1 = require("../schema/internship.schema");
class InternshipController extends abstract_controller_1.AbstractController {
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
}
exports.InternshipController = InternshipController;
//# sourceMappingURL=internship.controller.js.map