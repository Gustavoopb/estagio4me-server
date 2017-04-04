"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var expressSession = require("express-session");
var passport = require("passport");
var user_schema_1 = require("../schema/user.schema");
var auth_strategy_1 = require("./auth.strategy");
var cors = require('cors');
var ServerConfig = (function () {
    function ServerConfig() {
    }
    ServerConfig.startServer = function () {
        var port = process.env.PORT || 3000;
        var server = this._instance.listen(port, function () {
            console.log("Server is runing on port " + port + " at " + new Date().toLocaleString());
        });
        process.on('SIGINT', function () {
            server.close(function () {
                console.log("Server on port 3000 is closed.");
                process.exit();
            });
        });
    };
    ServerConfig.getInstance = function () {
        if (this._instance == null) {
            this._instance = this._factoryApp();
        }
        return this._instance;
    };
    ServerConfig._factoryApp = function () {
        var app = express();
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
    };
    return ServerConfig;
}());
ServerConfig.jwtSecret = 'estagio4me secret';
exports.ServerConfig = ServerConfig;
//# sourceMappingURL=server.config.js.map