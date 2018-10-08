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
  room = '';
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
  
  
  app.route('/api/cats').get((req, res) => {
    res.send({
      cats: [{ name: 'lilly' }, { name: 'lucy' }]
    });
  });
  
  
  app.route('/api/pattok' ).get((req, res) => {
    const token = opentok.generateToken(SESSION_ID, {
      role: 'subscriber'});
    res.send( token );
  });
  app.route('/api/cats',jsonParser ).post((req, res) => {
    if (!req.body) return res.sendStatus(400)
    // myname = req.body.params.name;
    res.send(201, req.body);
  });
 
  app.route('/api/cats/:name').get((req, res) => {
    requestedCatName = req.params['name'];
    newLength = callernames.push(req.params['name']);
   
    res.send( {requestedCatName} );
  });
  
  app.route('/api/patobj/:name').get((req, res) => {
    requestedCatName = req.params['name'];
    });
  app.route('/api/docobj/:name').get((req, res) => {
    res.send({requestedCatName} );
  });
  app.route('/api/connecteddoctor/:bool').get((req, res) => {
    doctorconnected = true;
   // newLength = callernames.push(req.params['name']);
    res.send( doctorconnected );
  });
  app.route('/api/connecteddoctor').get((req, res) => {
    res.send( doctorconnected );
  });
  app.route('/api/favcaller/:name').get((req,res) => {
    favcaller = req.params['name'];
  });
  app.route('/api/getfavcaller').get((req,res) => {
    res.send(favcaller);
  } );
  app.route('/api/sess').get((req, res ) => {
    res.send(callernames);
  })
  app.route('/api/session/:name').get((req, res) => {
    requestedCatName = req.params['name'];
    var a = callernames.indexOf(requestedCatName);
    if(a > -1)
      callernames.splice(a,1); 
   // newLength =callernames.pop(requestedCatName);
    res.send( {requestedCatName} );
  });
// Start the app by listening on the default Heroku port
server.listen(process.env.PORT || 5000 , function () {
    console.log(process.env.PORT || 5000);
} );

app.get('/', function(req,res) {
     
  res.sendFile(path.join(__dirname+'/dist/testapp'));
});

  
  
  app.get('', function(req,res) {
     
    res.sendFile(path.join(__dirname+'/dist/testapp/index.html'));
});

io.on('connection', function(socket) {
  console.log('A user connected');

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
     console.log('A user disconnected');
  });
});
