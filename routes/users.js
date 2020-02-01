// routes/users.js

const express = require('express')
const router = express.Router()
const services = require('../services/services')

router.get('/users', function(req,res) {
    res.send('users')
})

router.post('/save', services.saveUsers)


router.get('/add', function(req, res, next) {
    res.render('users/addUser', {title: 'Users'})
})

router.get('/edit', function(req, res, next) {
    res.render('users/editUser', {title: 'Users'})
})

module.exports = router