var express = require('express');
var router = express.Router();

// Get the preview of Email Template
router.get('/preview', function(req, res, next) {
  res.render('previewEmailTemplate', {
    layout: 'emailLayout.handlebars',
    title: 'iSell',
    app: 'iSell'
  });
});

module.exports = router;
