import { useNavigation } from "@react-navigation/core";
import * as React from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import {
  createUserWithEmailAndPassword,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { auth, app } from "../firebase";

const LoginScreen = () => {
  // Ref or state management hooks
  const recaptchaVerifier = React.useRef(null);
  const [phoneNumber, setPhoneNumber] = React.useState();
  const [verificationId, setVerificationId] = React.useState();
  const [verificationCode, setVerificationCode] = React.useState();

  const firebaseConfig = app ? app.options : undefined;
  const [message, showMessage] = React.useState();
  const attemptInvisibleVerification = false;

  const navigation = useNavigation();

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={{ padding: 20, marginTop: 50 }}>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={app.options}
          // attemptInvisibleVerification
        />
        <Text style={{ marginTop: 20 }}>Enter phone number</Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17 }}
          placeholder="+1 999 999 9999"
          autoFocus
          autoCompleteType="tel"
          keyboardType="phone-pad"
          textContentType="telephoneNumber"
          onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
        />
        <Button
          title="Send Verification Code"
          disabled={!phoneNumber}
          onPress={async () => {
            // The FirebaseRecaptchaVerifierModal ref implements the
            // FirebaseAuthApplicationVerifier interface and can be
            // passed directly to `verifyPhoneNumber`.
            try {
              const phoneProvider = new PhoneAuthProvider(auth);
              const verificationId = await phoneProvider.verifyPhoneNumber(
                phoneNumber,
                recaptchaVerifier.current
              );
              setVerificationId(verificationId);
              showMessage({
                text: "Verification code has been sent to your phone.",
              });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: "red" });
            }
          }}
        />
        <Text style={{ marginTop: 20 }}>Enter Verification code</Text>
        <TextInput
          style={{ marginVertical: 10, fontSize: 17 }}
          editable={!!verificationId}
          placeholder="123456"
          onChangeText={setVerificationCode}
        />
        <Button
          title="Confirm Verification Code"
          disabled={!verificationId}
          onPress={async () => {
            try {
              const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              await signInWithCredential(auth, credential);
              showMessage({ text: "Phone authentication successful 👍" });
            } catch (err) {
              showMessage({ text: `Error: ${err.message}`, color: "red" });
            }
          }}
        />
        {message ? (
          <TouchableOpacity
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: 0xffffffee, justifyContent: "center" },
            ]}
            onPress={() => showMessage(undefined)}
          >
            <Text
              style={{
                color: message.color || "blue",
                fontSize: 17,
                textAlign: "center",
                margin: 20,
              }}
            >
              {message.text}
            </Text>
          </TouchableOpacity>
        ) : undefined}
        {attemptInvisibleVerification && <FirebaseRecaptchaBanner />}
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    borderWidth: 2,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
