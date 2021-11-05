const parser = require('./parser')
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const server = require("http").createServer(app)
var port = process.env.PORT || 3001

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', function(request, response) {
    response.sendfile('./public/index.html');
   });

app.get('/style.css', function(request, response) {
    response.sendfile('./public/style.css');
   });


app.post('/calculate',(req,res)=>{
    var start = process.hrtime();
    var elapsed_time = function(note){
        var precision = 3; // 3 afficher en décimales
        var elapsed = process.hrtime(start)[1] / 1000000; // diviser par un million pour obtenir nano à milli
        console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
        start = process.hrtime(); // réinitialiser la minuteri
    }
    try {
        const num =parser.parse("calculate " + req.body.expression)
        if(num != Infinity) {
            res.json( {result : num} );
        } else {
            res.json( {result : "Erreur division par 0 "} )
        }
        
    } catch (e) {
        res.json( {result : "Erreur de syntaxe"} );
    }
    elapsed_time('')
})

server.listen(port,() => console.log('server is runing'));

const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`Le script utilise environ ${Math.round(used * 100) / 100} MB`);

