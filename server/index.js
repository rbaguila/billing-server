const pool = require('./db');

const express = require('express')


//create app instance
const app = express();
const router = require(__dirname + '/router')(express.Router());

//set api port to 3000
const port = 3000;

//to run a query we just pass it to the pool 
//after we're done nothing has to be taken care of 
//we don't have to return any client to the pool or close a connection 
// pool.query('SELECT $1::int AS number', ['2'], function(err, res) {
//   if(err) {
//     return console.error('error running query', err);
//   }
 
//   console.log('number:', res.rows[0].number);
// });

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