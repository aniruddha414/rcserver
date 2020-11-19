let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

exports.loginUser = function(collectionNames,req,res) {

    console.log("Login User API --POST--");

    let query = {
        Email: req.body.email
    };
    let Users = collectionNames.Users;

    Users.find(query).toArray((err,user) => {
        try {
            if (err) {
                throw err;
            } else {
                if (user.length !== 0) {
                    console.log('user found checking password');
                    bcrypt.compare(req.body.password,user[0].Password).then((isMatch) => {
                        
                        if(!isMatch) {
                            res.send({
                                success: false,
                                message: 'Wrong Credentials!'
                            });
                        } else {
                            // generate token
                            console.log('user found');
                            let token = jwt.sign({id: user._id}, 'serversecret', {
                                expiresIn: 86400 // 24 hrs
                            });

                            res.send({
                                success: true,
                                user: {
                                    firstname: user[0].Firstname,
                                    lastname: user[0].Lastname,
                                    token: token,
                                    email: user[0].Email,
                                    role: user[0].Role
                                }
                            });
                        }

                    })
                } else {
                    res.send({
                        success: false,
                        message: 'Wrong Credentials!'
                    });
                }
            }
        } catch (err) {
            console.log(err);
        }
    });
};