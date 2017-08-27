import * as consign from 'consign'

import { DatabaseConfig } from './config/database.config'
import { Express } from 'express'
import { RouterConfig } from "./config/router.config";
import { ServerConfig } from './config/server.config'

class Index {

    constructor() {
        DatabaseConfig.connect()
        // consign({ verbose: false }).include('dist/server/routes').into(ServerConfig.getHttpInstance())
        RouterConfig.initRoutes()
        ServerConfig.startServer()
    }

}

export default new Index()