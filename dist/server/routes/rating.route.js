"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_router_1 = require("./abstract/abstract.router");
const rating_schema_1 = require("../schema/rating.schema");
const passport = require("passport");
class RatingRoute extends abstract_router_1.AbstractRouter {
    constructor() {
        super("/api/rating");
        this.init();
    }
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
    init() {
        this.router.delete("/delete/:userId/:internshipId", passport.authenticate('jwt'), this.delete);
        this.router.post("/save", passport.authenticate('jwt'), this.save);
        this.router.post("/findOne", passport.authenticate('jwt'), this.findOne);
        this.router.get("/findByAuthUser", passport.authenticate('jwt'), this.findByAuthUser);
        super.beUsed();
    }
}
exports.default = new RatingRoute().router;
//# sourceMappingURL=rating.route.js.map