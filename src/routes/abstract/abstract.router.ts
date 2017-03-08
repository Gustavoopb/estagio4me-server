import {Express, Router} from 'express'
import {ServerConfig} from '../../config/server.config'
import * as passport from 'passport'
import * as expressSession from 'express-session'

export abstract class AbstractRouter {
    protected app: Express
    protected url: string
    public router: Router


    constructor(url:string){
        this.app = ServerConfig.getInstance()
        this.router = Router()
        this.url = url
    }

    private configureAuthSession() {

    }

    protected beUsed(){
        this.app.use(this.url, this.router)
    }

    abstract init()
}