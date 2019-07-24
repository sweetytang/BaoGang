var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var showSchema = new Schema({
    gray1:String,
    gray2:String,
    gray3:String,
    gray4:String,
    gray5:String,
    gray6:String,
    gray7:String,
    gray8:String,
    gray9:String,
    gray10:String,
    path:String,
    time:String,
    workId:String,
});

const showModel = mongoose.model('showData', showSchema);

module.exports = showModel;
