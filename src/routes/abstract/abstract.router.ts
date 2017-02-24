import {Express, Router} from 'express';
import {ServerConfig} from '../../config/server.config';

export abstract class AbstractRouter {
    protected app: Express;
    protected url: string;
    public route: Router;

    constructor(url:string){
        this.app = ServerConfig.getInstance();
        this.route = Router();
        this.url = url;
    }

    protected beUsed(){
        this.app.use(this.url, this.route);
    }

    abstract init();
}