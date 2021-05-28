const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

exports.makeSurveysAnalisis = functions.database.ref("/survey/{pushId}/status")
    .onUpdate((snapshot, context) => {
      snapshot.child
      return admin.firestore().listCollections();
    });
