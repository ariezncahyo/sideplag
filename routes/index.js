// routes/index.js

const express = require('express')
const router = express.Router()

router.get('/', function(req, res, next) {
    res.render('index', {title: 'Homepage'})
})

router.get('/users', function(req, res, next) {
    res.render('users');
})


router.get('/login', function(req, res, next) {
    res.render('login');
})

module.exports = router