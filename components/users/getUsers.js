exports.getUsers = function(collectionNames,req,res) {
    let query = {};
    let role = req.body.role;
    
    if (role === 'agent') {
        query.Role = 'customer'
    } else if (role === 'admin') {
        query = {};
    }

    let Users = collectionNames.Users;

    Users.find(query).project({ _id:0,Firstname:1,Lastname:1,Email:1,Role:1}).toArray((err,users) => {
        try {
            if (err) {
                throw err;
            } else {
                // console.log(users);
                res.send(users);
            }
        } catch (error) {
            console.log(error);
        }
    });
};