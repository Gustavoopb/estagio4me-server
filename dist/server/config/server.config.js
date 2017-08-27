"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const express = require("express");
const expressSession = require("express-session");
const passport = require("passport");
const auth_strategy_1 = require("./auth.strategy");
const user_schema_1 = require("../schema/user.schema");
var httpFac = require('http');
class ServerConfig {
    constructor() { }
    static startServer() {
        var port = process.env.PORT || 3000;
        this.getHttpInstance().listen(port, () => {
            console.log("Server is runing on port " + port + " at " + new Date().toLocaleString());
        });
        process.on('SIGINT', () => {
            this.getHttpInstance().close(() => {
                console.log("Server on port 3000 is closed.");
                process.exit();
            });
        });
    }
    static getExpressInstance() {
        if (!this._express) {
            this._express = this._factoryExpress();
        }
        return this._express;
    }
    static getHttpInstance() {
        if (!this._http) {
            this._http = this._factoryHttp();
        }
        return this._http;
    }
    static _factoryExpress() {
        var app = express();
        app.get('/', function (request, response) {
            response.send('You are on server');
        });
        app.use(cors({
            origin: '*',
            optionsSuccessStatus: 200
        }));
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser());
        app.use(expressSession({
            secret: this.jwtSecret,
            resave: false,
            saveUninitialized: false
        }));
        app.use(passport.initialize());
        app.use(passport.session());
        passport.use(user_schema_1.User.createStrategy());
        passport.use(new auth_strategy_1.AuthStrategy(auth_strategy_1.AuthStrategy.defaultOptions));
        passport.serializeUser(user_schema_1.User.serializeUser());
        passport.deserializeUser(user_schema_1.User.deserializeUser());
        return app;
    }
    static _factoryHttp() {
        return httpFac.Server(this.getExpressInstance());
    }
}
ServerConfig.jwtSecret = 'estagio4me secret';
exports.ServerConfig = ServerConfig;
//# sourceMappingURL=server.config.js.map