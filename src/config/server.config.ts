import * as express from 'express';
import * as path from 'path';
import * as bodyParser from 'body-parser';

export class ServerConfig {
    private static _instance: express.Express;

    private constructor(){
    }

    public static startServer() {
        this._instance.listen(3000, () => {
            console.log("Server is runing on port 3000");
        })      
    }

    public static getInstance(): express.Express{
        if(this._instance == null){
            this._instance = this._factoryApp();
        }
        return this._instance;
    }

    public static _factoryApp() : express.Express {
        var app: express.Express = express();
        app.use(bodyParser());
        app.use(express.static('./client/static'));
        app.use('/app', express.static(path.join(__dirname, '../../../lib/client/app')));
        app.use('/node_modules', express.static(path.join(__dirname, '../../../node_modules')));
        return app;
    }
}
