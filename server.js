const fs = require('fs');
const {createServer} = require('http');
const {join} = require('path');
const {parse} = require('url');
const next = require('next');

const app = next({dev: false});
const handle = app.getRequestHandler();

const PORT = Number.parseInt(process.env.PORT || 3000);

app.prepare()
    .then(() => {
        createServer((req, res) => handle(req, res))
            .listen(PORT, () => {
                console.log('Custom Server started on port 3000');
            })
    });

