// <KeyboardAvoidingView
//   style={styles.container}
//   behavior={Platform.OS === "ios" ? "padding" : "height"}
// >
//   <View style={{ padding: 20, marginTop: 50 }}>
//     <FirebaseRecaptchaVerifierModal
//       ref={recaptchaVerifier}
//       firebaseConfig={app.options}
//       //attemptInvisibleVerification
//     />
//     <Text style={{ marginTop: 20 }}>Enter phone number</Text>
//     <TextInput
//       style={{ marginVertical: 10, fontSize: 17 }}
//       placeholder="+216 99 999 999"
//       autoFocus
//       autoCompleteType="tel"
//       keyboardType="phone-pad"
//       textContentType="telephoneNumber"
//       onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
//     />
//     <Button
//       title="Send Verification Code"
//       disabled={!phoneNumber}
//       onPress={async () => {
//         // The FirebaseRecaptchaVerifierModal ref implements the
//         // FirebaseAuthApplicationVerifier interface and can be
//         // passed directly to `verifyPhoneNumber`.
//         try {
//           const phoneProvider = new PhoneAuthProvider(auth);
//           const verificationId = await phoneProvider.verifyPhoneNumber(
//             phoneNumber,
//             recaptchaVerifier.current
//           );
//           console.log(verificationId);
//           setVerificationId(verificationId);
//           showMessage({
//             text: "Verification code has been sent to your phone.",
//           });
//         } catch (err) {
//           showMessage({ text: `Error: ${err.message}`, color: "red" });
//         }
//       }}
//     />
//     <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
//     <TextInput
//       style={{ marginVertical: 10, fontSize: 17 }}
//       editable={!!verificationId}
//       placeholder="123456"
//       onChangeText={setVerificationCode}
//     />
//     <Button
//       title="Confirm Verification Code"
//       disabled={!verificationId}
//       onPress={async () => {
//         try {
//           const credential = PhoneAuthProvider.credential(
//             verificationId,
//             verificationCode
//           );
//           await signInWithCredential(auth, credential);
//           showMessage({ text: "Phone authentication successful 👍" });
//           dispatch(
//             setCurrentUser({
//               uid: auth.currentUser.uid,
//               phoneNumber: auth.currentUser.phoneNumber,
//             })
//           );
//           navigation.navigate("HomeScreen");
//         } catch (err) {
//           showMessage({ text: `Error: ${err.message}`, color: "red" });
//         }
//       }}
//     />
//     <Button
//       title="Complete Profile"
//       disabled={!verificationId}
//       onPress={async () => {
//         const completeUser = httpsCallable(functions, "completeUser");
//         completeUser({
//           text: "test",
//         })
//           .then((e) => {
//             console.log(e);
//           })
//           .catch((error) => {
//             //
//           });
//       }}
//     />
//     {message ? (
//       <TouchableOpacity
//         style={[
//           StyleSheet.absoluteFill,
//           { backgroundColor: 0xffffffee, justifyContent: "center" },
//         ]}
//         onPress={() => showMessage(undefined)}
//       >
//         <Text
//           style={{
//             color: message.color || "blue",
//             fontSize: 17,
//             textAlign: "center",
//             margin: 20,
//           }}
//         >
//           {message.text}
//         </Text>
//       </TouchableOpacity>
//     ) : undefined}
//     {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
//   </View>
// </KeyboardAvoidingView>
