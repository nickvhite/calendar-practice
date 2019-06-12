var nconf = require('nconf');
nconf.defaults({
    'listenPort': '8008'
  });
  module.exports = nconf;