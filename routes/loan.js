var express = require('express');
var router = express.Router();

let verifyToken = require('../components/auth/verifyToken');
let createLoanRequest =  require('../components/loan/createLoanRequest');
let viewLoans = require('../components/loan/viewLoans');
let updateStatus = require('../components/loan/updateStatus');
let updateLoan = require('../components/loan/updateLoan');

let collectionNames = {};
let getCollectionNames = function (names) {
  console.log("collections initialized for user router");
	collectionNames = names;
};

/* GET home page. */
router.post('/createLoanRequest', (req, res) => {
  verifyToken.verifyToken(collectionNames,req,res,createLoanRequest.createLoanRequest);
});

router.post('/viewLoans', (req,res) => {
    verifyToken.verifyToken(collectionNames,req,res,viewLoans.viewLoans);
});

router.post('/updateStatus', (req,res) => {
    verifyToken.verifyToken(collectionNames,req,res,updateStatus.updateStatus);
});

router.post('/updateLoan', (req,res) => {
    verifyToken.verifyToken(collectionNames,req,res,updateLoan.updateLoan);
});

module.exports = router;
module.exports.getCollectionNames = getCollectionNames;