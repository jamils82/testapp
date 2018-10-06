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

var server =http.createServer(app);
var io = SocketIO(server);
app.use(bodyParser.json());
app.use(cors());
  const apiKey=  '46168292';
  var callernames = [];
  var patcallers = ''
  var newLength ='';
  favcaller = '';
  doctorconnected = false;
  var patient = { 
    patname :'' ,
    phone : '',
    activedoc : ''
  }
  var requestedCatName ='hadi';
  const apiSecret = '828124981dd61607ed239dcc30838cebcf5daebd';
  opentok = new OpenTok(apiKey, apiSecret);
  const SESSION_ID= '2_MX40NjE2ODI5Mn5-MTUzNjg2ODUzNjc4OX5tY0FuRkQwUExhQ21sWHNDMVE5cFFaenl-fg';
// Serve only the static files form the dist directory
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
  
  
  io.sockets.on('connection', function(socket) {
    // once a client has connected, we expect to get a ping from them saying what room they want to join
    socket.on('room', function(room) {
        socket.join(room);
    });
  });
  
  // now, it's easy to send a message to just the clients in a given room
  room = "abc123";
  io.sockets.in(room).emit('message', 'what is going on, party people?');
  
  // this message will NOT go to the client defined above
  io.sockets.in('foobar').emit('message', 'anyone in this room yet?');
  
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000 , function () {
    console.log(process.env.PORT || 5000);
} );

app.get('/', function(req,res) {
     
  res.sendFile(path.join(__dirname+'/dist/testapp'));
});
app.get('*', function(req,res) {
   
  res.sendFile(path.join(__dirname+'/dist/testapp/index.html'));
  });
  app.get('', function(req,res) {
     
    res.sendFile(path.join(__dirname+'/dist/testapp/index.html'));
});