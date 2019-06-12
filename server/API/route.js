var userCtrl = require("./UserController");
var entityCtrl = require("./EntityController");
module.exports = function (app){
    userCtrl(app);
    entityCtrl(app);
}