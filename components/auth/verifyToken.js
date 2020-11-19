let jwt = require('jsonwebtoken');
const { token } = require('morgan');

exports.verifyToken = function(collectionNames,req,res,fun) {

    let token = req.headers['x-access-token'];
    if (!token) {
        res.send({
            success: false,
            message: 'token not found'
        })
    } else {
        jwt.verify(token,'serversecret', (err,decoded) => {
            if (err) {
                res.send({
                    success: false,
                    message: 'failed to auth'
                })      
            } else {
                console.log("deoced : ",decoded);
                console.log("API called Verified");
                fun(collectionNames,req,res,decoded);   
            }
        });
    }   
};