exports.updateLoan = function (collectionNames,req,res,decoded) {

    console.log("updateLoan --POST--");
    // console.log(req.body);
    let Loans = collectionNames.Loans;
    let LoansVersions = collectionNames.LoansVersions;

    let query = {
        _id: req.body.loanID
    }
    let updateFields = {};

    if (req.body.firstname) {
        updateFields.ApplicantFirstname = req.body.firstname;
    }
    if (req.body.lastname) {
        updateFields.ApplicantLastname = req.body.lastname;
    }
    if (req.body.amount) {
        updateFields.Amount = req.body.amount;
    }
    if (req.body.loantype) {
        updateFields.LoanType = req.body.loantype;
    }
    if (req.body.rate) {
        updateFields.Rate = req.body.rate;
    }

    // console.log(req.body);
    // console.log("update");
    // console.log(updateFields);

    Loans.findOneAndUpdate(query,{$set:updateFields},{ returnOriginal: true },(err,result) => {
        try {
            if (err) {
                throw err; 
            } else {
                console.log("updated successfully");
                if (result) {
                    // console.log(result.value);

                    let oldLoan = {
                        LoanID: result.value._id,
                        Email: result.value.Email,
                        StartDate: result.value.StartDate,
                        EndDate: result.value.EndDate,
                        RateType: result.value.RateType,
                        LoanType: result.value.LoanType,
                        Rate: result.value.Rate,
                        Amount: result.value.Amount,
                        Status: result.value.Status
                    }

                    LoansVersions.insertOne(oldLoan, (err,result) => {
                        try {
                            if (err) {
                                throw err;
                            } else {
                                console.log('backed up');
                            }
                        } catch (error) {
                            console.log(err);
                        }
                    });

                    let updatedData = {
                        success: true,
                        message: 'update successfull'
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