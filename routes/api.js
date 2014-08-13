var express    = require('express');
var router     = express.Router();
var formidable = require('formidable');
var Image      = require('../models/image')

router.use(function(req, res, next) {
    // continue to the next route
    next();
});


//general get all and save memes
router.route('/')
    .get(function(req, res) {
        //res.sendfile('public/upload.html');
        // TODO - get a list of all memes
        Image.all(function(err, images) {
            res.json(images);
        });
    })
    // save an image
    .post(function(req, res) {
        console.log('saving a meme');
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            // do something here?
        })
        .on('end', function(fields, files) {
            var response = 'Request Failed';
            if(Image.save(this.openedFiles[0])) {
                response = 'request winned';
            }
            res.send(response);
        });
    });

// do something when we have an ID
router.route('/:meme_id')
    .get(function(req, res) {
        console.log('meme id  '+req.params.meme_id+' requested');
        Image.find(req.params.meme_id, function(err, image) {
            if(err || typeof(image) == 'undefined' || image == null) {
                // TODO - send example error page
                res.send('there has been an error');
            }
            else {
                res.sendfile(image.path);
            }
        });
    });

/*
 * TODO ?
 * .put() - to update data
 *
 * .delete() - to remove data
 */

module.exports = router;