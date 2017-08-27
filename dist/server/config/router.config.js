"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const internship_route_1 = require("../routes/internship.route");
const login_router_1 = require("../routes/login.router");
const profile_route_1 = require("../routes/profile.route");
const rating_route_1 = require("../routes/rating.route");
const skill_route_1 = require("../routes/skill.route");
const user_route_1 = require("../routes/user.route");
class RouterConfig {
    static initRoutes() {
        RouterConfig._instanceRoutes = RouterConfig._routes.map(route => new route());
    }
}
RouterConfig._routes = [internship_route_1.InternshipRoute, login_router_1.LoginRoute, profile_route_1.ProfileRoute, rating_route_1.RatingRoute, skill_route_1.SkillRoute, user_route_1.UserRoute];
exports.RouterConfig = RouterConfig;
//# sourceMappingURL=router.config.js.map