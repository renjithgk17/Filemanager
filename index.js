//Variable declarations
var express = require("express");
var fs = require("fs");
var path = require("path");
var app = express();

app.set('views', path.join(__dirname, "views"));
app.set("view engine", 'ejs');
//Checking for connection
var user = {
    name: 'bob',
    status: "hey There",
    place: 'kerala'
}
var isAuth = true;

app.use(express.static(path.join(__dirname, "public")))
app.get('/', function (req, res, next) {
    if (isAuth) {
        next();
    } else res.send("For bidden");
})

app.get("/", function (req, res) {

    fs.readdir(__dirname, function (err, files) {
        console.log(files);
        res.render('FileDirectory', {
            files: files,
            contents: ""
        });

    })
// code for testing;

});
app.get("/dir/:id", function (req, res) {
    var Files;
    var typeCheck = path.join(__dirname, req.params.id);
    console.log("Path:" + typeCheck)
    fs.lstat(typeCheck, (err, stats) => {
        if (err) throw err;
        if (stats.isFile()) {
            console.log("&&&&&\nIts a File!&&&")
            var filextension = req.params.id.split('.').pop(); 
            console.log("extension: " + filextension)
            fs.readFile(__dirname + "/" + req.params.id, function (err, data) {
                fs.readdir(__dirname, function (err, files) {
                    console.log(files);
                    Files = files;
                    // console.log("test"+data);
                    res.render('FileDirectory', {
                        contents: data,
                        files: files
                    });

                })
            })
        } else {
            console.log("&&&&&\nIts a Folder!&&&")

            fs.readdir(__dirname, function (err, files) {
                console.log(files);
                Files = files;
                res.render('FileDirectory', {
                    files: files,
                    contents: files
                });
            })
        }

    })
});

app.listen(process.env.PORT || 3000);
