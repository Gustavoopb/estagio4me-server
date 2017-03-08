import * as express from 'express'
import { Server } from 'http'
import * as bodyParser from 'body-parser'
import * as cookieParser from 'cookie-parser'
import * as expressSession from 'express-session'
import * as passport from 'passport'
import { Strategy } from 'passport-local'
import { User } from '../schema/user.schema'

export class ServerConfig {
    private static _instance: express.Express


    private constructor() {
    }

    public static startServer() {
        var server: Server = this._instance.listen(3000, () => {
            console.log("Server is runing on port 3000 at "+ new Date().toLocaleString())
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
        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(cookieParser())
        app.use(expressSession({
            secret: 'estagio4me secret',
            resave: false,
            saveUninitialized: false
        }))
        app.use(passport.initialize())
        app.use(passport.session())

        passport.use(User.createStrategy())
        passport.serializeUser(User.serializeUser())
        passport.deserializeUser(User.deserializeUser())

        return app
    }
}
