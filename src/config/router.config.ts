import { InternshipRoute } from "../routes/internship.route";
import { LoginRoute } from "../routes/login.router";
import { ProfileRoute } from "../routes/profile.route";
import { RatingRoute } from "../routes/rating.route";
import { SkillRoute } from "../routes/skill.route";
import { UserRoute } from "../routes/user.route";

export class RouterConfig {
    static _routes: Array<any> = [InternshipRoute, LoginRoute, ProfileRoute, RatingRoute, SkillRoute, UserRoute]
    static _instanceRoutes

    static initRoutes() {
        RouterConfig._instanceRoutes = RouterConfig._routes.map(route => new route())
    }
}

