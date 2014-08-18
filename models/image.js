var db = require('../database');
var fs = require('fs-extra');

function randomName() {
    return Math.random().toString(36).substring(2);
}

/**
 * get all the images
 */
exports.all = function(callback) {
    db.Image.find({}, '_id name path', callback);
}

/**
 * get a single image by the id
 */
exports.find = function(id, callback) {
    db.Image.findOne({'_id': id}, 'path', callback);
}

/**
 * save an image in the db and move it to the correct path
 */
exports.save = function(file) {
    if(typeof(file) == 'undefined' || typeof(file.type) == 'undefined' || (file.type != 'image/png' && file.type != 'image/jpeg')) {
        return false;
    }
    
    var type      = file.type == 'image/png' ? 'png' : 'jpg';;
    var temp_path = file.path;
    var new_path  = 'uploads/'+randomName()+'.'+type;

    var i = new db.Image({
        name: file.name,
        path: new_path
    });
    i.save();
    
    fs.copy(temp_path, new_path, function(err) {
        if (err) {
            console.log('upload fail');
            console.error(err);
        }
        else {
            console.log("upload success : "+new_path);
        }
    });
    
    return i;
};
