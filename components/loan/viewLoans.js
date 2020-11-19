exports.viewLoans = function(collectionNames,req,res,decoded) {

    let Loans = collectionNames.Loans;

    let query  = {};

    if (req.body.status) {
        query.Status = req.body.status;
    } 
    if (req.body.loantype) {
        query.LoanType = req.body.loantype;
    }
    if (req.body.email) {
        query.Email = req.body.email;
    }
    console.log("query : ",query);
    Loans.find(query).toArray((err,loans) => {
        try {
            if (err) {
                throw err;
            } else {
                console.log(decoded);
                // console.log(loans);
                res.send({
                    success:true,
                    loans: loans
                });
            }
        } catch (error) {
            console.log(error); 
            res.send({
                success: false,
                message: 'something went wrong'
            });
        }
    });

}