const {createServer} = require('https');
const {parse} = require('url');
const fs = require('fs');
const next = require('next');

const app = next({dev: false});
const handle = app.getRequestHandler();

const httpsOptions = {
    key: fs.readFileSync("./localhost.key"),
    cert: fs.readFileSync("./localhost.crt"),
};

const PORT = Number.parseInt(process.env.PORT || 443);
console.log(`Using port: ${PORT} (process.env.PORT: ${process.env.PORT})`);

app.prepare()
    .then(() => {
        createServer(httpsOptions, (req, res) => {
            const parsedUrl = parse(req.url, true);
            handle(req, res, parsedUrl);
        })
            .listen(PORT, (err) => {
                if (err) throw err;
                console.log('Custom Server started on port ', PORT);
            })
    });

