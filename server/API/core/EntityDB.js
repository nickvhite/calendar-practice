var Datastore = require('nedb');
var db = new Datastore({filename : 'eintities'});
db.loadDatabase();
module.exports = db;