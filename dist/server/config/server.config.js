"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");
const passport = require("passport");
const user_schema_1 = require("../schema/user.schema");
const auth_strategy_1 = require("./auth.strategy");
var cors = require('cors');
class ServerConfig {
    constructor() {
    }
    static startServer() {
        var port = process.env.PORT || 3000;
        var server = this._instance.listen(port, () => {
            console.log("Server is runing on port " + port + " at " + new Date().toLocaleString());
        });
        process.on('SIGINT', () => {
            server.close(() => {
                console.log("Server on port 3000 is closed.");
                process.exit();
            });
        });
    }
    static getInstance() {
        if (this._instance == null) {
            this._instance = this._factoryApp();
        }
        return this._instance;
    }
    static _factoryApp() {
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
}
ServerConfig.jwtSecret = 'estagio4me secret';
exports.ServerConfig = ServerConfig;
//# sourceMappingURL=server.config.js.map