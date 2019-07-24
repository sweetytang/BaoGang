var mongoose = require('mongoose');
var config = require('../../config');

mongoose.connect(config.mongodbUrl, {
  useNewUrlParser: true
});

var db=mongoose.connection;

db.on('error', function(err) {
  next(err);
});

db.once('open', function() {
  console.log('mongodb connect successed!')
});