var express    = require('express');
var router     = express.Router();
var formidable = require('formidable');
var Image      = require('../models/image')

router.use(function(req, res, next) {
    // continue to the next route
    next();
});

router.route('/')
    .get(function(req, res) {
        res.sendfile('public/upload.html');
    })
    .post(function(req, res) {
        console.log('saving a meme');
        var form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            res.send('request success?');
        });
        
        form.on('end', function(fields, files) {
            Image.save(this.openedFiles[0]);
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