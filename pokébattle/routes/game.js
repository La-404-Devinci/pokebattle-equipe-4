var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/game', function(req, res, next) {
  res.sendFile('game.html', { root: 'public' });
});

module.exports = router;
