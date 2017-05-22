"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const abstract_controller_1 = require("./abstract/abstract.controller");
const profile_schema_1 = require("../schema/profile.schema");
class ProfileController extends abstract_controller_1.AbstractController {
    save(req, res, next) {
        var profile = new profile_schema_1.Profile(req.body);
        console.log(req.user._id);
        profile_schema_1.Profile.findOneAndUpdate({ _user: req.user._id }, profile, { upsert: true, new: true })
            .populate("_user _likedSkills _experiencedSkills")
            .exec((err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(data);
            }
        });
    }
    findOne(req, res, next) {
        profile_schema_1.Profile.findOne({ _user: req.user._id }).populate("_user _likedSkills _experiencedSkills").exec((err, data) => {
            if (err) {
                res.status(500).json(err);
            }
            else {
                res.status(200).json(data);
            }
        });
    }
}
exports.ProfileController = ProfileController;
//# sourceMappingURL=profile.controller.js.map