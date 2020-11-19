exports.updateStatus = function(collectionNames,req,res,decoded) {
    
    console.log('Update status --POST-- ');
    console.log(decoded);
    console.log(req.body);
    let Loans = collectionNames.Loans;
    let LoansVersions = collectionNames.LoansVersions;
    let query = {
        _id: req.body.loanID
    };

    Loans.findOneAndUpdate(query,{$set: {Status:req.body.status}},{returnOriginal:true}, (err,result) => {
        try {
            if (err) {
                throw err;
            } else {
                console.log("update successfully");
                res.send({
                    success:'true',
                    message: `${result.value._id} status successfully updates as ${req.body.status}`
                });
            }
        } catch (error) {
            console.log(error);
            res.send({
                success: false,
                message: 'Error in udapting status'
            });
        }
    });

};