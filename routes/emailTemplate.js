var express = require('express');
var router = express.Router();

// Get the preview of Email Template
router.get('/emailTemplate', function(req, res, next) {
  res.render('emailTemplate', {layout: 'emailLayout.hbs', title: 'iSell', app: 'iSell' }, function(err, template) {
    global.template = template;
    res.send('email template rendered into variable');
  });
});

module.exports = router;
