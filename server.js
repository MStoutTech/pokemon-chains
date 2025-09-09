const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet');

const server = http.createServer((req, res) => {
    const page = url.parse(req.url).pathname;
    const params = querystring.parse(url.parse(req.url).query);
    console.log(page);
    if (page == '/') {
        fs.readFile('public/index.html', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });
    }else if (page == '/api/leaderboard') {
        res.writeHead(200, {'Content-Type': 'application/json'});
            const objToJson = [
                {
                    name: "Doug",
                    score: 20, 
                    country: "🇺🇸"
                },
                {
                    name: "Larissa",
                    score: 19, 
                    country: "🇰🇷"
                },
                {
                    name: "Rolph",
                    score: 19, 
                    country: "🇰🇷"
                },
            ]
            res.end(JSON.stringify(objToJson));
    }else if (page == '/css/style.css'){
        fs.readFile('public/css/style.css', function(err, data) {
            res.write(data);
            res.end();
        });
    }else if (page == '/js/main.js'){
        fs.readFile('public/js/main.js', function(err, data) {
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        });
    }else if (page == '/img/pokemon-chains-logo.png'){
        fs.readFile('public/img/pokemon-chains-logo.png', function(err, data) {
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.write(data);
            res.end();
        });
    }else{
        figlet('404!!', function(err, data) {
            if (err) {
                console.log('Something went wrong...');
                console.dir(err);
                return;
            }
        res.write(data);
        res.end();
        });
    }
});

server.listen(8000);
