const fs = require('fs');
const {createServer} = require('http');
const {join} = require('path');
const {parse} = require('url');
const next = require('next');

const app = next({dev: false});
const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        createServer((req, res) => handle(req, res))
            .listen(3000, () => {
                console.log('Custom Server started on port 3000');
            })
    });

