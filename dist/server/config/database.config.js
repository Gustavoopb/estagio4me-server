"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
class DatabaseConfig {
    static connect() {
        mongoose.connect(this.URI);
        this.init();
    }
    static init() {
        mongoose.connection.on('connected', () => {
            console.log('Mongoose default connection open to ' + DatabaseConfig.URI);
        });
        mongoose.connection.on('error', (err) => {
            console.log('Mongoose default connection error: ' + err);
        });
        mongoose.connection.on('disconnected', () => {
            console.log('Mongoose default connection disconnected');
        });
        process.on('SIGINT', () => {
            mongoose.connection.close(() => {
                console.log('Mongoose default connection disconnected through app termination');
            });
        });
    }
    static disconnect() {
        mongoose.disconnect();
    }
}
DatabaseConfig.URI = process.env.MONGODB_URI || "mongodb://mongo:27017/local";
exports.DatabaseConfig = DatabaseConfig;
//# sourceMappingURL=database.config.js.map