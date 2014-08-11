var db = require('../database');
var fs = require('fs-extra');

function randomName() {
    return Math.random().toString(36).substring(2);
}

exports.find = function(id, callback) {
    db.Image.findOne({'_id': id}, 'path', callback);
}

exports.save = function(file) {
    console.log(file.type);
    if(file.type != 'image/png' && file.type != 'image/jpeg') {
        return false;
    }
    
    var type      = file.type == 'image/png' ? 'png' : 'jpg';;
    var temp_path = file.path;
    var new_path  = 'uploads/'+randomName()+'.'+type;
    
    fs.copy(temp_path, new_path, function(err) {
        if (err) {
            console.log('upload fail');
            console.error(err);
        }
        else {
            console.log("upload success : "+new_path);
            var i = new db.Image({
                name: file.name,
                path: new_path
            });
            i.save();
        }
    });
    
    return true;
};