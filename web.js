var express = require("express");
var range = require("r...e");
var http = require("http");
var url = require("url");
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express["static"](__dirname + '/public'));
app.use(bodyParser());

app.get("/", function(req, res) {
    res.render('index', {
        u: req.query.u,
        range: range
    });
});

app.post("/", function(req, res) {
    var command = req.body.text;
    var uri = url.parse(req.body.u);
    var options = {
        hostname: uri.hostname,
        port: uri.port,
        path: uri.path + "/",
        method: 'POST'
    };
    var client_req = http.request(options);
    client_req.on('error', function(e) {
        console.log('problen with request: ' + e.message);
    });
    client_req.write(command);
    client_req.end();
    res.send('OK');
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
    console.log("Listening on " + port);
});
