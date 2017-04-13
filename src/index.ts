import { ServerConfig } from './config/server.config'
import { DatabaseConfig } from './config/database.config'
import {Express} from 'express'
var consign = require('consign')

class Index {

    private _serverApp: Express

    constructor() {
        var _serverApp = ServerConfig.getInstance()
        consign().include('dist/server/routes').into(_serverApp)
        console.log(process.env.NODE_ENV)
        DatabaseConfig.connect()
        ServerConfig.startServer()
    }
}

export default new Index()