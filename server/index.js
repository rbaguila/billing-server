const express = require('express');
const bodyParser = require('body-parser');

//create app instance
const app = express();
const router = require(__dirname + '/router')(express.Router());

//set api port to 3000
const port = 3000;

//Configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    
    res.setHeader('Cache-Control', 'no-cache');
    next();
});

//Use our router configuration when we call /api
app.use('/api', router);


//starts the server and listens for requests
app.listen(port, function() {
    console.log(`API running on port ${port}`);
});