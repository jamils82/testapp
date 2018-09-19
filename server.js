//Install express server
const express = require('express');
const path = require('path');
var OpenTok = require('opentok');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
  const apiKey=  '46168292';
  const apiSecret = '828124981dd61607ed239dcc30838cebcf5daebd';
  opentok = new OpenTok(apiKey, apiSecret);
  const SESSION_ID= '2_MX40NjE2ODI5Mn5-MTUzNjg2ODUzNjc4OX5tY0FuRkQwUExhQ21sWHNDMVE5cFFaenl-fg';
// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/testapp'));

app.get('/', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/testapp/index.html'));
});
app.get('', function(req,res) {
    
  res.sendFile(path.join(__dirname+'/dist/testapp/index.html'));
  });
  app.use(bodyParser.json());
  
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
  app.route('/api/cat' ).get((req, res) => {
    const token = opentok.generateToken(SESSION_ID, {
      role: 'publisher'});
    res.send( token );
  });
  app.route('/api/cats').post((req, res) => {
    res.send(201, req.body);
  });
  app.route('/api/session/').post((req, res) => {
    const myname = req.params['name'];
    res.send(200, req.body);
  });

  app.route('/api/session/:name').get((req, res) => {
    res.render('name',{output: req.params.name})
   // res.send(myname);
  });
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000 , function () {
    console.log(process.env.PORT || 5000);
} );
