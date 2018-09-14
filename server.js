//Install express server
const express = require('express');
const path = require('path');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/testapp'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/testapp/index.html'));
});

app.use(function (req, res, next) {        
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');    
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');    
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');      
    res.setHeader('Access-Control-Allow-Credentials', true);       
    next();  
});  
 
// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 5000 , function () {
    console.log(process.env.PORT || 5000);
} );
