import { ServerConfig } from './config/server.config'
import { DatabaseConfig } from './config/database.config'
import {Express} from 'express'
import * as consign from 'consign'

class Index {

    private _serverApp: Express

    constructor() {
        var _serverApp = ServerConfig.getInstance()
        consign().include('lib/server/routes').into(_serverApp)
        DatabaseConfig.connect()
        ServerConfig.startServer()
    }
}

export default new Index()