let express = require('express');
let router = express.Router();

let sample = require('../components/users/sample');
let newRegistration = require('../components/users/newRegistration');
let loginUser = require('../components/users/loginUser');
let getProfile = require('../components/users/getProfile');
let getUsers = require('../components/users/getUsers');
let updateUser = require('../components/users/updateUser');

let verfiyToken = require('../components/auth/verifyToken');

let collectionNames = {};
let getCollectionNames = function (names) {
  console.log("collections initialized for user router");
	collectionNames = names;
};
/* GET users listing. */
router.post('/getProfile', (req, res) => {
  verfiyToken.verifyToken(collectionNames,req,res,getProfile.getProfile);
});

router.post('/getUsers' ,(req,res) => {
  verfiyToken.verifyToken(collectionNames,req,res,getUsers.getUsers);
  // getUsers.getUsers(collectionNames,req,res);
});

router.post('/sample' , (req,res) => {
  console.log('sample called in router');
  sample.sample(collectionNames,req,res);
});

router.post('/newUser', (req,res) => {
  console.log('new user');
  newRegistration.newRegistration(collectionNames,req,res);
});

router.post('/login' , (req,res) => {
  console.log('login');
  loginUser.loginUser(collectionNames,req,res);
});

router.post('/updateUser' ,(req,res) => {
  console.log('update user');
  console.log(req.body);
  verfiyToken.verifyToken(collectionNames,req,res,updateUser.updateUser);
  // updateUser.updateUser(collectionNames,req,res);
});
module.exports = router;
module.exports.getCollectionNames = getCollectionNames;