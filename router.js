// routes/index.js

const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const service = require('./services/services')
 
router.get('/', function(req, res, next) {
    res.render('index',{title: 'Homepage'})
})

router.get('/login', function(req, res, next) {
    res.render('login',{title: 'Login'})
})

router.get('/register', function(req, res, next) {
    res.render('register',{title: 'Register'})
})

router.post('/uploads', function(req, res, next) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            var dir = './uploads';
            if (!fs.existsSync(dir)){
                fs.mkdirSync(dir);
            }
            callback(null, dir);
        },
        filename: function (req, file, callback) {
            callback(null, file.originalname);
        }
    });
    
    var upload = multer({storage: storage}).array('files', 12);
    
    upload(req, res, function (err) {
        if (err) {
            res.json({status: 'error', data: err})
        } else {
            res.json({status: 'success', data: req.files})
        }
    });
})

router.get('/users', service.fetchUsers)

router.get('/pengujian', function(req, res, next) {
    res.render('pengujian', {title: 'Pengujian'})
})

router.get('/about', function(req, res, next) {
    res.render('about', {title: 'About'})
})

router.post('/deleteUser', service.deleteUser)


module.exports = router