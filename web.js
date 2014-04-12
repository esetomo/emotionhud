var express = require("express");
var range = require("r...e");
var http = require("http");
var url = require("url");
var bodyParser = require('body-parser');
var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express["static"](__dirname + '/public'));
app.use('/bootstrap-switch', express["static"](__dirname + '/node_modules/bootstrap-switch/dist/'));
app.use(bodyParser());
app.use(require('bounscale'));

app.get("/", function(req, res) {
    res.render('index', {
        u: req.query.u,
        range: range
    });
});

var port = Number(process.env.PORT || 5000);

app.listen(port, function() {
    console.log("Listening on " + port);
});
