var db = require("./core/UserDB");

module.exports = function(app){
    app.post('/api/login', function(req, res) {
        console.log(req.body);
        if(!req.body || !req.body.login || !req.body.pass){
            return res.status(500).json({ success: false, data: "Empty login or password"});
        }
        db.find({login: req.body.login, pass: req.body.pass }, function(err, docs){
            if(docs && docs.length > 0){
                res.send({ success: true, data: docs[0]});
            } else {
                return res.status(404).send({ success: false, data:"Wrong login or password"});
            }
        });
    });
    app.get('/api/users', function(req, res) {
        
        db.find({}, function(err, docs){
                res.send({ success: true, users: docs});
        });
    });
    
    app.post('/api/register', function(req, res) {
        if(!req.body || !req.body.login || !req.body.pass){
            return res.status(500).json({ success: false, data: "Empty login or password"});
        }
        db.find({login: req.body.login }, function(err, docs){
            if(docs && docs.length > 0){
                return res.status(404).send({ success: false, data:"User already exist"});
            } else{
                db.insert({login: req.body.login, pass: req.body.pass, name: req.body.name},function(err, docs){
                    res.send({ success: true, data: docs});
                });
            }
        });
    });
}