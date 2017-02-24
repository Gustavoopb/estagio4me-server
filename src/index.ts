// import 'reflect-metadata';
import {ServerConfig} from './config/server.config'
import {DatabaseConfig} from './config/database.config'
var consign = require('consign');

var serverApp = ServerConfig.getInstance();
consign().include('lib/server/routes').into(serverApp);
DatabaseConfig.connect();
ServerConfig.startServer();