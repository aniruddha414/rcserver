exports.getProfile = function(collectionNames,req,res,decoded) {
    
    console.log("GetProfile API --POST--");
    res.send({
        roles: "Authenticated"
    });
};