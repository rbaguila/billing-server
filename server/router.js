const controller = require(__dirname + '/controller');

module.exports = (router) => {

    //Carriers
    router.get('/', controller.initializeAPI);
    router.get('/carriers', controller.viewCarriers);
    router.get('/carriers/:id', controller.viewCarrier);
    router.post('/carriers', controller.addCarrier);
    router.put('/carriers/:id', controller.editCarrier);
    router.delete('/carriers/:id', controller.deleteCarrier);

    return router;
}