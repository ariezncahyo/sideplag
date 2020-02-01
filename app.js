const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const cors = require('cors')
const partials = require('express-partials')
const http = require('http')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const session = require('express-session')

const app = express()

const {redisStore} = require('./services/redis')

// routers
const router = require('./router')

// midleware
app.use(session({
    secret: 'somesecret',
    store: redisStore,
    saveUninitialized: false,
    resave: false
}))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.static('assets'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(partials())
app.use(logger('dev'))
app.use(cookieParser())

// cors
app.use(cors())

// routing
app.use('/', router)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    next(createError(404));
})
  
// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.render('error')
})

// listening
app.listen(8000, (req,res) => {
    console.log('Listen on port 8000')
})