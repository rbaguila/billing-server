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

//Add a carrier
exports.addCarrier = (req, res, next) => {
  console.log("Received request");
  
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

// //Edit a user via his userID
// exports.editUser = (req, res) =>{
//     User.findById(req.params.user_id, function(err, user) {
//         if (err){
//             res.send(err);
//         }else{
//             //setting the new username and password to whatever was changed. If 
//             //nothing was changed we will not alter the field.
//             (req.body.username) ? user.username = req.body.username : null;
//             (req.body.password) ? user.password = req.body.password : null;
//             (req.body.firstName) ? user.firstName = req.body.firstName : null;
//             (req.body.middleName) ? user.middleName = req.body.middleName : null;
//             (req.body.lastName) ? user.lastName = req.body.lastName : null;

//             (req.body.officeAddress) ? user.officeAddress = req.body.officeAddress : null;
//             (req.body.homeAddress) ? user.homeAddress = req.body.homeAddress : null;
//             (req.body.civilStatus) ? user.civilStatus = req.body.civilStatus : null;
//             (req.body.occupation) ? user.occupation = req.body.occupation : null;
//             (req.body.age) ? user.age = req.body.age : null;
//             (req.body.sex) ? user.sex = req.body.sex : null;

//             (req.body.birthDate) ? user.birthDate = req.body.birthDate : null;
//             (req.body.refferedBy) ? user.refferedBy = req.body.refferedBy : null;
//             (req.body.contactNumber) ? user.contactNumber = req.body.contactNumber : null;
//         }
        
//         //save user
//         user.save(function(err) {
//             if (err)
//             res.send(err);
//             res.json({ message: 'User has been updated' });
//         });
//     });
// };

// //Deletes a user
// exports.deleteUser = (req, res) =>{
//     User.remove({ _id: req.params.user_id }, function(err, user) {
//         if (err){
//             res.send(err);
//         }else{
//              res.json({ message: 'User has been deleted' })
//         }
//     });
// }