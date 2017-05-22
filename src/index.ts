import * as consign from 'consign'

import { DatabaseConfig } from './config/database.config'
import { Express } from 'express'
import { ServerConfig } from './config/server.config'

class Index {

    constructor(private _serverApp: Express = ServerConfig.getInstance()) {
        DatabaseConfig.connect()
        consign({ verbose: false }).include('dist/server/routes').into(_serverApp)
        ServerConfig.startServer()
    }

}

export default new Index()