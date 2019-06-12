var express         = require('express');
var path            = require('path'); 
var log             = require('./server/libs/log')(module);
var userDB = require("./server/API/core/UserDB");
var entityDB = require("./server/API/core/EntityDB");
var multer = require('multer');
var logger = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');
var route = require('./server/API/route');
var conf = require('./server/config/configurations');
var cors = require('cors');
var app = express();
app.use(cors());
app.use(logger("dev")); 
app.use(methodOverride()); 
app.use(session({ resave: true, saveUninitialized: true, 
                  secret: 'uwotm8' }));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

route(app);
app.use(express.static(path.join(__dirname, 'public')));
app.use(function(req, res, next){
    res.status(404);
    log.debug('Not found URL: %s',req.url);
    res.send({ error: 'Not found' });
    return;
});

app.use(function(err, req, res, next){
    res.status(err.status || 500);
    log.error('Internal error(%d): %s',res.statusCode,err.message);
    res.send({ error: err.message });
    return;
});
app.get('/api', function (req, res) {
    res.send('API is running');
});

app.listen(conf.get("listenPort"), function(){
    log.info('Express server listening on port ' + conf.get("listenPort"));
});
