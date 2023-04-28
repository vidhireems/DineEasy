var express = require("express");
var app = express();
var port = 3000;
app.use(express.json());
app.listen(port, function () { return console.log("DineEasy app listening on port ".concat(port, "!")); });

