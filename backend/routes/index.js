const express = require('express');
const router = express.Router();
const path = require('path');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../frontend/html/index.html'));
});

router.get('/index.html', function (req, res, next) {
  res.sendFile(path.join(__dirname, '../../frontend/html/index.html'));
});

module.exports = router;
