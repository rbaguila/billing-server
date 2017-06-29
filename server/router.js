const controller = require(__dirname + '/controller')

module.exports = (router) => {

    //User
    //Get functions
    router.get('/', controller.initializeAPI);
    // router.get('/users', user.viewUsers);

    // //Post functions
    // router.post('/users', user.addUser);

    // //Edit functions
    // router.put('/user/:user_id', user.editUser);

    // //Delete functions
    // router.delete('/user/:user_id', user.deleteUser);

    return router;
}