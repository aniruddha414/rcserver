let bcrypt = require('bcrypt');
let jwt = require('jsonwebtoken');

exports.newRegistration = function (collectionNames,req,res) {

    console.log("New User API --POST--");

    bcrypt.genSalt(10, (err,salt) => {
        try {
            if (err) {
                throw err;
            } else {
                bcrypt.hash(req.body.password,salt,(err,hash) => {
                    try {
                        if (err) {
                            throw err;
                        } else {
                            let user = {
                                Firstname: req.body.firstname,
                                Lastname: req.body.lastname,
                                Role: req.body.role,
                                Email: req.body.email,
                                _id: req.body.email,
                                PhoneNO: req.body.phoneno,
                                Password: hash
                            }   
                        
                            let Users = collectionNames.Users;
                            let query = {
                                Email: req.body.email
                            };
                        
                            Users.find(query).toArray((err,result) => {
                                try {
                                    if (err) {
                                        throw err;
                                    } else {
                                        if (result.length === 0) {
                                            // add user 
                                            Users.insert(user,function(err,result){
                                                try {
                                                    if(err) {
                                                        throw err;
                                                    } else {
                                                        console.log(result);
                                                        let token = jwt.sign({id: user._id}, 'serversecret', {
                                                            expiresIn: 86400 // 24 hrs
                                                        });
                                                        res.send({
                                                            success: true,
                                                            user: {
                                                                firstname: result.ops[0].Firstname,
                                                                lastname: result.ops[0].Lastname,
                                                                token: token,
                                                                email: result.ops[0].Email,
                                                                role: result.ops[0].Role
                                                            }
                                                        });
                                                    }
                                                } catch (error) {
                                                    console.log(error);
                                                }
                                            });
                        
                                        } else {
                                            res.send({
                                                success: false,
                                                message: 'User Already exists'
                                            });
                                        }
                                    }
                                } catch (err) {
                                    console.log(err);
                                }
                            });
                        }
                    } catch (err) {
                        console.log(err);
                    }
                });
            }
        } catch (err) {
            console.log(err);
        }
    });
};