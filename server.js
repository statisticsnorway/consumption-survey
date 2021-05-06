const {createServer} = require('http');
const next = require('next');

const app = next({dev: false});
const handle = app.getRequestHandler();

const PORT = Number.parseInt(process.env.PORT || 3000);
console.log(`Using port: ${PORT} (process.env.PORT: ${process.env.PORT})`);

app.prepare()
    .then(() => {
        createServer((req, res) => handle(req, res))
            .listen(PORT, () => {
                console.log('Custom Server started on port ', PORT);
            })
    });

