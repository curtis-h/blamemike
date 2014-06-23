var express = require('express');
var router  = express.Router();

router.use(function(req, res, next) {
    console.log('middleware');
    // continue to the next route
    next();
});

router.get('/', function(req, res) {
    console.log('get index');
    res.json({message: 'hello'});
});

// general get all and save memes
router.route('/memes')
    .get(function(req, res) {
        console.log('getting all memes');
        res.json({memes: 'nomemes'});
    })
    .post(function(req, res) {
        console.log('saving a meme');
        res.json({success: true});
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
