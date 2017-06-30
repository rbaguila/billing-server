const controller = require(__dirname + '/controller')

module.exports = (router) => {

    //Carriers
    router.get('/', controller.initializeAPI);
    router.get('/carriers', controller.viewCarriers);
    router.post('/carriers', controller.addCarrier);

    // //Edit functions
    // router.put('/user/:user_id', user.editUser);

    // //Delete functions
    // router.delete('/user/:user_id', user.deleteUser);

    return router;
}