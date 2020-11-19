let collectionNames = {};
class Collections {
	static initCollections(db) {
		collectionNames.Users = db.collection('Users');
		collectionNames.Loans = db.collection('Loans');
		collectionNames.LoansVersions = db.collection('LoansVersions');
	}
}
module.exports.collectionNames = collectionNames;
module.exports.Collections = Collections;
