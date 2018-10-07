//Install express server
const express = require('express');
const path = require('path');
var OpenTok = require('opentok');
const socketIO = require('socket.io');
const cors = require('cors');
const http = require('http');
const app = express();
const myname ='saad';
const bodyParser = require('body-parser');
var clients = [];
var server =http.createServer(app);
var io = socketIO.listen(server);
app.use(bodyParser.json());
app.use(cors());
  
app.use(express.static(__dirname + '/dist/testapp'));

var jsonParser = bodyParser.json();
app.use(jsonParser);


app.use(bodyParser.urlencoded({ extended: true }))
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    
 
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
  
  
app.get('/', function(req,res) {
     
  res.sendFile(path.join(__dirname+'/dist/testapp'));
});

  app.get('', function(req,res) {
     
    res.sendFile(path.join(__dirname+'/dist/testapp/index.html'));
});