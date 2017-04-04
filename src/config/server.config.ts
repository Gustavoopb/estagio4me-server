import * as express from 'express'
import { Server } from 'http'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as expressSession from 'express-session'
import * as passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../schema/user.schema'
import { AuthStrategy } from './auth.strategy';
var cors = require('cors');

export class ServerConfig {
    private static _instance: express.Express

    public static jwtSecret: string = 'estagio4me secret'

    private constructor() {
    }

    public static startServer() {
        var port = process.env.PORT || 3000
        var server: Server = this._instance.listen(port, () => {
            console.log("Server is runing on port " + port + " at " + new Date().toLocaleString())
        })
        process.on('SIGINT', () => {
            server.close(() => {
                console.log("Server on port 3000 is closed.")
                process.exit()
            })
        })
    }

    public static getInstance(): express.Express {
        if (this._instance == null) {
            this._instance = this._factoryApp()
        }
        return this._instance
    }

    public static _factoryApp(): express.Express {
        var app: express.Express = express()
        app.get('/', function (request, response) {
            response.send('You are on server');
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
}
