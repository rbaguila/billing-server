const pool = require('../db');

//Initializes API
exports.initializeAPI = (req, res) => {
    res.json({ message: 'API Initialized!'});
};

//Shows all carriers
exports.viewCarriers = (req, res, next) => {
  pool.query("SELECT ID, RTRIM(Name) AS Name, \
  RTRIM(Description) AS Description \
  FROM carriers", 
  (err, result) => {
    if(err) {
      return console.error('error running query', err);
    }
    
    res.status(200).send(result.rows);
  
  });
};

//View individual carriers
exports.viewCarrier = (req, res, next) => {
  const id = req.params.id;
  pool.query("SELECT ID, RTRIM(Name) AS Name, \
  RTRIM(Description) AS Description \
  FROM carriers WHERE ID = "+id, 
  (err, result) => {
    if(err) {
      return console.error('error running query', err);
    }
    
    res.status(200).send(result.rows);
  
  });
};

//Add a carrier
exports.addCarrier = (req, res, next) => {
  //used destructuring assignment for variables that will be used for the insert query
  let name, description;
  ({name, description} = req.body);
  
  pool.query("INSERT INTO carriers (Name, Description) VALUES \
    ('"+name+"', '"+description+"')", 
  (err, result) => {
    if(err) {
      return console.error('error running query', err);
    }
    res.json({ message: 'Carrier successfully added!' });
  });
  
};

//Update a carrier
exports.editCarrier = (req, res, next) => {
  const id = req.params.id;
  
  let name, description;
  ({name, description} = req.body);
  
  pool.query("UPDATE carriers SET Name = '"+name+"', Description = '"+description+"' \
    WHERE ID = "+id , 
  (err, result) => {
    if(err) {
      return console.error('error running query', err);
    }
    res.json({ message: 'Carrier successfully updated!' });
  });
};

//Delete a carrier
exports.deleteCarrier = (req, res, next) => {
  const id = req.params.id;
  
  pool.query("DELETE FROM carriers WHERE ID = "+id , 
  (err, result) => {
    if(err) {
      return console.error('error running query', err);
    }
    res.json({ message: 'Carrier successfully deleted!' });
  });
};
