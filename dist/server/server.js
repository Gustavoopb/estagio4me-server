"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("zone.js/dist/zone-node");
const express = require("express");
const platform_server_1 = require("@angular/platform-server");
const app_server_module_ngfactory_1 = require("../dist/ngfactory/src/app/app.server.module.ngfactory");
const core_1 = require("@angular/core");
const path_1 = require("path");
const fs_1 = require("fs");
const PORT = 4000;
core_1.enableProdMode();
const app = express();
let template = fs_1.readFileSync(path_1.join(__dirname, '..', 'dist', 'index.html')).toString();
app.engine('html', (_, options, callback) => {
    const opts = { document: template, url: options.req.url };
    platform_server_1.renderModuleFactory(app_server_module_ngfactory_1.AppServerModuleNgFactory, opts)
        .then(html => callback(null, html));
});
app.set('view engine', 'html');
app.set('views', 'src');
app.get('*.*', express.static(path_1.join(__dirname, '..', 'dist')));
app.get('*', (req, res) => {
    res.render('index', { req });
});
app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}!`);
});
//# sourceMappingURL=server.js.map