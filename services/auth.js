// services/auth.js

function auth (req,res,next) {
    if (!req.session) {
        res.send('Need login bro..!')
    } else {
        next()
    }
}

module.exports = auth