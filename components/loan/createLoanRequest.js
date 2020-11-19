exports.createLoanRequest = function (collectionNames,req,res,decoded) {
    
    let email = req.body.email;
    let Users = collectionNames.Users;
    let Loans = collectionNames.Loans;

    console.log(req.body);
    let query = {
        Email: email,
        Role: 'customer'
    }
    Users.find(query).toArray((err,user) => {
        try {
            if (err) {
                throw err;
            } else {
                if (user.length === 0) {
                    res.send({
                        success: false,
                        message: 'Unable to find Customer'
                    });
                } else {
                    let sd = new Date(req.body.startDate);
                    let ed = sd.setMonth(sd.getMonth() + req.body.tenure);
                    let loan = {
                        Email: req.body.email,
                        ApplicantFirstname: user[0].Firstname,
                        ApplicantLastname: user[0].Lastname,
                        _id: new Date().getTime(),
                        StartDate: sd,
                        EndDate: ed,
                        RateType: req.body.rateType,
                        LoanType: req.body.loanType,
                        Rate: req.body.rate,
                        Amount: req.body.amount,
                        Status: "NEW"
                    };  
                    Loans.insert(loan,(err,result) => {
                        try {
                            if (err) { 
                                throw err;
                            } else {
                                console.log(result);
                                res.send({
                                    success: true,
                                    message: 'Loan Request Created Successfully'
                                });
                            }
                        } catch (error) {
                            console.log(error);
                            res.send({
                                success:false,
                                message:'error in creating loan request'
                            });
                        }
                    });
                }
            }
        } catch(error) {
            console.log(error);
            res.send({
                success: false,
                message: 'Unable to create Loan Request'
            });
        }
    });
}