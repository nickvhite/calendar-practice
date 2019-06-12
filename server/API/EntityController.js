var db = require("./core/EntityDB");

function createModel(entityName, initEntity){
    var result = JSON.parse(JSON.stringify(initEntity));
    result._entityType = entityName;
    return result;
}
module.exports = function(app){
    app.post('/api/:entity/create', function(req, res) {
        var newItem = createModel(req.params.entity, req.body);
        newItem._creationDate = new Date();
        db.insert(newItem, function(err, docs){
            res.send({ success: true, data: docs});
        });
    });
    app.post('/api/:entity/update', function(req, res) {
        var newItem = createModel(req.params.entity, req.body);
        newItem._updatedDate = new Date();
        db.update({
            _entityType: req.params.entity,
            _id: req.body._id
        }, newItem, {}, function(err, docs){
            res.send({ success: docs != null && docs > 0});
        });
    });
    app.get('/api/:entity/delete/:id', function(req, res) {

        db.remove({
            _entityType: req.params.entity,
            _id: req.params.id
        }, {}, function(err, numRemoved ){
            res.send({ success: numRemoved > 0, numRemoved: numRemoved });
        });
    });
    app.get('/api/:entity/get/:id', function(req, res) {
        db.findOne({
            _entityType: req.params.entity,
            _id: req.params.id
        }, function (err, doc) {
            res.send({ success: doc != null, data: doc });
          });
    });
    app.post('/api/:entity/get', function(req, res) {
        var filter = createModel(req.params.entity, req.body);
        db.find(filter, function (err, docs) {
            res.send({ success: docs != null, data: docs });
          });
    });

}

