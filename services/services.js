// services/services.js

const db = require('./db')

module.exports.conn = async (req,res,next) => {
    (db.state === 'undefined') ? res.send('Server down..') : next()
}

module.exports.fetchUsers = async (req,res) => {
    await db.query ("select * from tb_users", (error,result) => {
        if (error) res.send(error.message)
        res.render('users', {title: 'Users', data: result})
    })
}

module.exports.saveUsers = async (req,res) => {
    const data = req.body

    if (data.tb_nama.length == 0) {
        res.send({status: 'error', message: 'Nama harus diisi.'})
    }

    if (data.tb_email.length == 0) {
        res.send({status: 'error', message: 'Email harus diisi.'})
    }

    if (data.tb_password.length == 0) {
        res.send({status: 'error', message: 'Password harus diisi.'})
    }
    
    const strQr =   
        "Insert Into tb_users "+
        "( "+
            "nama, "+
            "email, "+
            "password, "+
            "grub, "+
            "aktif "+
        ") Values "+
            "('"+ data.tb_nama +"', "+
            "'"+ data.tb_email +"',"+
            "'"+ data.tb_password +"', "+
            "'"+ data.tb_group +"',"+
            "'Y') ";

    await db.query(strQr, (error,result) => {
        if(error) {
            res.send({status: 'error', message: error})
        } else {
            res.send({status: 'success', message: result})
        }
    })
}

module.exports.deleteUser = async (req,res) => {
    const data = req.body.data.id;

    const strQr = 
        "Delete From tb_users "+
        "Where id = '"+ data +"' ";
    
    await db.query(strQr, (error,result)  => {
        if (error) res.send({status: 'error', message: error})
        res.send({status: 'success', message: result})
    })
}
