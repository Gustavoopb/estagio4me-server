"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var DatabaseConfig = (function () {
    function DatabaseConfig() {
    }
    DatabaseConfig.connect = function () {
        mongoose.connect(this.URI);
        this.init();
    };
    DatabaseConfig.init = function () {
        mongoose.connection.on('connected', function () {
            console.log('Mongoose default connection open to ' + DatabaseConfig.URI);
        });
        mongoose.connection.on('error', function (err) {
            console.log('Mongoose default connection error: ' + err);
        });
        mongoose.connection.on('disconnected', function () {
            console.log('Mongoose default connection disconnected');
        });
        process.on('SIGINT', function () {
            mongoose.connection.close(function () {
                console.log('Mongoose default connection disconnected through app termination');
            });
        });
    };
    DatabaseConfig.disconnect = function () {
        mongoose.disconnect();
    };
    return DatabaseConfig;
}());
DatabaseConfig.URI = process.env.MONGODB_URI || "mongodb://localhost:27017/local";
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.config.js.map