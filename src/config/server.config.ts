import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as cors from 'cors'
import * as express from 'express'
import * as expressSession from 'express-session'
import * as http from 'http';
import * as io from 'socket.io'
import * as passport from 'passport'

import { AuthStrategy } from './auth.strategy'
import { User } from '../schema/user.schema'

var httpFac = require('http')

export class ServerConfig {
    private static _express: express.Express

    private static _http: http.Server

    public static jwtSecret: string = 'estagio4me secret'

    private constructor() { }

    public static startServer() {
        var port = process.env.PORT || 3000
        this.getHttpInstance().listen(port, () => {
            console.log("Server is runing on port " + port + " at " + new Date().toLocaleString())
        })
        process.on('SIGINT', () => {
            this.getHttpInstance().close(() => {
                console.log("Server on port 3000 is closed.")
                process.exit()
            })
        })
    }

    public static getExpressInstance(): express.Express {
        if (!this._express) {
            this._express = this._factoryExpress()
        }
        return this._express
    }

    public static getHttpInstance(): http.Server {
        if (!this._http) {
            this._http = this._factoryHttp()
        }
        return this._http
    }

    public static _factoryExpress(): express.Express {
        var app: express.Express = express()
        app.get('/', function (request, response) {
            response.send('You are on server')
        })
        app.use(cors({
            origin: '*',
            optionsSuccessStatus: 200
        }))
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(cookieParser())
        app.use(expressSession({
            secret: this.jwtSecret,
            resave: false,
            saveUninitialized: false
        }))

        app.use(passport.initialize())
        app.use(passport.session())

        passport.use(User.createStrategy())
        passport.use(new AuthStrategy(AuthStrategy.defaultOptions))
        passport.serializeUser(User.serializeUser())
        passport.deserializeUser(User.deserializeUser())

        return app
    }

    public static _factoryHttp(): http.Server {
        return httpFac.Server(this.getExpressInstance())
    }
}