var express = require('express');
var router  = express.Router();

router.use(function(req, res, next) {
    // TODO - create proper index page
    res.sendfile('public/index.html');
});

module.exports = router;