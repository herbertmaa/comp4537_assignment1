const express = require('express');
const router = express.Router();
const path = require('path');

router.route('/assignments/1/index')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/assignment1/index.html'));
});

router.route('/assignments/1/admin/')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/assignment1/admin.html'));
});

router.route('/assignments/1/student/')
.get(function (req, res) {
  res.sendFile(path.join(__dirname, '../public/html/assignment1/student.html'));
});

router.route('/').get(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/comp4537.html'));
});

router.route('/comp4537.html').get(function (req, res, next) {
  res.sendFile(path.join(__dirname, '../public/html/comp4537.html'));
});

module.exports = router;
