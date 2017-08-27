"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const io = require("socket.io");
const server_config_1 = require("../../config/server.config");
class AbstractController {
    constructor() {
        this.socket = io(server_config_1.ServerConfig.getHttpInstance());
        this.socket.on('connection', (socket) => {
            socket.on('internship-update', (data) => {
                this.socket.emit('internship-list', data);
            });
        });
    }
    emit(event, ...args) {
        this.socket.emit(event, args);
    }
}
exports.AbstractController = AbstractController;
//# sourceMappingURL=abstract.controller.js.map