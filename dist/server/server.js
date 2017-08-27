"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("zone.js/dist/zone-node");
const express = require("express");
const path_1 = require("path");
const fs_1 = require("fs");
const PORT = 4000;
enableProdMode();
const app = express();
let template = fs_1.readFileSync(path_1.join(__dirname, '..', 'dist', 'index.html')).toString();
app.engine('html', (_, options, callback) => {
    const opts = { document: template, url: options.req.url };
    renderModuleFactory(AppServerModuleNgFactory, opts)
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