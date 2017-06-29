// var User = require('../../model/users');

//Initializes API
exports.initializeAPI = (req, res) => {
    res.json({ message: 'API Initialized!'});
};

// //Shows all users
// exports.viewUsers = (req, res) => {
//     User.find(function(err, users){
//         if (err)
//             res.send(err);
//             //responds with a json object of our database users.
//         res.json(users)
//     });
// };

// //Adds a user
// exports.addUser = (req, res) => {
//     console.log("Received request");
//     console.log(req.body);

//     var user = new User();
  
//     //First bracket
//     user.username = req.body.username;
//     user.password = req.body.password;
//     user.firstName = req.body.firstName;
//     user.middleName = req.body.middleName;
//     user.lastName = req.body.lastName;
    
//   //console.log("Room Number: " +req.body.roomNumber);

//     user.officeAddress.push({"roomNumber": req.body.roomNumber});
//     user.officeAddress.push({"mainAddress": req.body.mainAddress});


//     user.ptrNumber = req.body.ptrNumber;
//     user.licenseNumber = req.body.licenseNumber;


//     user.civilStatus = req.body.civilStatus;
//     user.occupation = req.body.occupation;
//     user.age = req.body.age;
//     user.sex = req.body.sex;
    
//     //Second bracket
//     user.birthDate = req.body.birthDate;
//     user.refferedBy = req.body.refferedBy;
//     user.contactNumber = req.body.contactNumber;

//     user.dateRegistered = req.body.dateRegistered;

//     user.save(function(err) {
//         if (err)
//         res.send(err);
//         res.json({ message: 'User successfully added!' });
//     });
// };

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