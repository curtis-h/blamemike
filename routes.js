var express = require('express');
var router  = express.Router();
var db      = require('./database');
var formidable = require('formidable');
var fs = require('fs-extra');

console.log("IAMGES: ");
//console.log(images);

router.use(function(req, res, next) {
    console.log('middleware');
    // continue to the next route
    next();
});

router.route('/')
.get(function(req, res) {
    console.log('get index');
    form = '<form action="" enctype="multipart/form-data" method="post">'+ 
        '<input name="title" type="text" />'+ 
        '<input multiple="multiple" name="upload" type="file" /> '+ 
        '<input type="submit" value="Upload" />'+ 
        '</form>';
    res.send(form);
})
.post(function(req, res) {
    console.log('saving a meme');
    
      var form = new formidable.IncomingForm();
      form.parse(req, function(err, fields, files) {
          res.send('request success?');
      });

      form.on('end', function(fields, files) {
        /* Temporary location of our uploaded file */
        var temp_path = this.openedFiles[0].path;
        /* The file name of the uploaded file */
        var file_name = this.openedFiles[0].name;
        /* Location where we want to copy the uploaded file */
        var new_location = 'uploads/';

        fs.copy(temp_path, new_location + file_name, function(err) {  
          if (err) {
              console.log('upload fail');
            console.error(err);
          } else {
            console.log("upload success!");
          }
        });
      });
});


// general get all and save memes
router.route('/memes')
    .get(function(req, res) {
        console.log('getting all memes');
        console.log(images.find());
        res.json({memes: 'nomemes'});
    });
    
// do something when we have an ID
router.route('/memes/:meme_id')
    .get(function(req, res) {
        console.log('meme id  '+req.params.meme_id+' requested');
        res.json({meme_id: req.params.meme_id});
    });

/*
 * TODO ?
 * .put() - to update data
 *
 * .delete() - to remove data
 */

module.exports = router;
