"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = require("./abstract/abstract.controller");
const rating_schema_1 = require("../schema/rating.schema");
class RatingController extends abstract_controller_1.AbstractController {
    save(req, res, next) {
        var rating = req.body;
        rating_schema_1.Rating.findOneAndUpdate({ _internship: rating._internship, _user: rating._user }, rating, { upsert: true, new: true })
            .populate("_internship _user")
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
    findOne(req, res, next) {
        rating_schema_1.Rating.findOne(req.body)
            .populate("_internship _user")
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
    findByAuthUser(req, res, next) {
        rating_schema_1.Rating.find({ _user: req.user._id })
            .populate("_internship _user")
            .populate({ path: "_internship", model: "Internship", match: { _isActive: true }, populate: [{ path: "_requiredSkills", model: "Skill" }, { path: "_preferredSkills", model: "Skill" }] })
            .exec((err, docs) => {
            if (!err) {
                res.status(200).json(docs.filter((rating) => rating._internship));
            }
            else {
                console.log(err);
                res.status(500).json(err);
            }
        });
    }
    delete(req, res, next) {
        rating_schema_1.Rating.remove({ _user: req.params.userId, _internship: req.params.internshipId }, (err) => {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json({ message: "Objeto removido." });
            }
        });
    }
}
exports.RatingController = RatingController;
//# sourceMappingURL=rating.controller.js.map