var db = require('../database');
var fs = require('fs-extra');

function randomName() {
    return Math.random().toString(36).substring(2);
}

exports.save = function(file) {
    console.log('saveing'+file.name);
    
    /*
     * TODO
     * add validation
     */
    
    var file_name = file.name;
    var temp_path = file.path;
    var new_path  = 'uploads/'+randomName();
    
    fs.copy(temp_path, new_path, function(err) {
        if (err) {
            console.log('upload fail');
            console.error(err);
        }
        else {
            console.log("upload success : "+new_path);
            var i = new db.Image({
                name: file_name,
                path: new_path
            });
            i.save();
        }
    });
};