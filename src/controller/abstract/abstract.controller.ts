import * as io from 'socket.io'

import { Internship } from "../../schema/internship.schema";
import { ServerConfig } from '../../config/server.config'

export abstract class AbstractController {

    protected socket: SocketIO.Server = io(ServerConfig.getHttpInstance())

    constructor() {
        this.socket.on('connection', (socket) => {
            socket.on('internship-update', (data) => {
                this.socket.emit('internship-list', data)
            })
        })
    }

    emit(event: string, ...args: any[]) {
        this.socket.emit(event, args);
    }
}