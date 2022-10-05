/* eslint-disable indent */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// auth trigger (new user signup)
exports.newUserSignUp = functions.auth.user().onCreate((user) => {
  //  for background triggers you must return a value/promise
  if (user.providerData[0].providerId === "phone") {
    return admin
      .firestore()
      .collection("users")
      .doc(user.uid)
      .set({
        phone: user.phoneNumber,
        email: "",
        lastName: "",
        firstName: "",
        birthDate: "",
        residencePlace: "",
        phoneNumber1: "",
        taxiUsage: "",
        currentPostion: {
          description: "",
          latitude: "",
          longitude: "",
        },
      });
  } else {
    return admin
      .firestore()
      .collection("drivers")
      .doc(user.uid)
      .set({
        email: user.email,
        lastName: "",
        firstName: "",
        birthDate: "",
        residencePlace: "",
        phoneNumber1: "",
        phoneNumber2: "",
        status: "",
        authorizationNumber: "",
        carPlate: "",
        actifVille: "",
        gouvernorat: "",
        currentPostion: {
          description: "",
          latitude: "",
          longitude: "",
        },
      });
  }
});

// auth trigger (user deleted)
exports.userDeleted = functions.auth.user().onDelete((user) => {
  if (user.providerData[0].providerId === "phone") {
    const doc = admin.firestore().collection("users").doc(user.uid);
    return doc.delete();
  } else {
    const doc = admin.firestore().collection("drivers").doc(user.uid);
    return doc.delete();
  }
});

// http callable function (adding a request)
exports.completeUser = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can add requests"
    );
  }
  return admin.firestore().collection("requests").add({
    text: data.text,
    upvotes: 0,
  });
});

exports.createRideRequest = functions.https.onCall((data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users can add requests"
    );
  }
  // const user = admin.firestore().collection("users").doc(context.auth.uid);
  return admin
    .firestore()
    .collection("Ride Requests")
    .doc(context.auth.uid)
    .set({
      uid: data.uid,
      clientFirstName: "user.firstName",
      clientLastName: "user.lastName",
      phoneNumber: data.phoneNumber,
      origin: data.origin,
      destination: data.destination,
      accepted: false,
      driverId: "",
    });
});
