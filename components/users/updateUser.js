exports.updateUser = function (collectionNames,req,res,decoded) {

    console.log("updateUser --POST--");
    // console.log(req.body);
    let Users = collectionNames.Users;
    let query = {
        _id: req.body.email
    }
    let updateFields = {};
    if (req.body.firstname) {
        updateFields.Firstname = req.body.firstname;
    }
    if (req.body.lastname) {
        updateFields.Lastname = req.body.lastname;
    }
    if (req.body.phoneno) {
        updateFields.PhoneNO = req.body.phoneno;
    }
    Users.findOneAndUpdate(query,{$set:updateFields},{ returnOriginal: false },(err,result) => {
        try {
            if (err) {
                throw err; 
            } else {
                console.log("updated successfully");
                if (result) {
                    // console.log(result.value);
                    let updatedData = {
                        success: true,
                        updated : {
                            Firstname: result.value.Firstname,
                            Lastname: result.value.Lastname
                        }
                    };
                    res.send(updatedData);
                } else {
                    res.send({
                        success:false,
                        message: 'update failed'
                    });
                }
            }
        } catch (error) {
            console.log(error);
            res.send({
                success:false,
                message: 'update failed'
            });
        }
    });
};