const controller = require(__dirname + '/controller');

module.exports = (router) => {

    //Carriers
    router.get('/', controller.initializeAPI);
    router.get('/carriers', controller.viewCarriers);
    router.get('/carrier/:id', controller.viewCarrier);
    router.post('/carriers', controller.addCarrier);
    router.put('/carrier/:id', controller.editCarrier);
    router.delete('/carrier/:id', controller.deleteCarrier);

    return router;
}