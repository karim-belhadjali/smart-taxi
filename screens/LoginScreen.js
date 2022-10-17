import { useNavigation } from "@react-navigation/core";
import React, { useState, useRef, createRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  Image,
} from "react-native";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { auth, app, functions, httpsCallable } from "../firebase";
import { Icon } from "react-native-elements";

import { useDispatch } from "react-redux";
import { setCurrentUser } from "../app/slices/navigationSlice";
import tw from "twrnc";

import CodeInput from "../components/CodeInput";

const LoginScreen = () => {
  // Phone Ref management hooks
  const recaptchaVerifier = useRef(null);

  // Code Ref management hooks
  const code2 = useRef();
  const code3 = useRef();
  const code1 = useRef();
  const code4 = useRef();
  const code5 = useRef();
  const code6 = useRef();

  const statusbarheight = StatusBar.currentHeight;
  // Phone State management hooks
  const [phonebordercolor, setphonebordercolor] = useState("#431879");
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [message, showMessage] = useState();

  // Code State management hooks
  const [verifycode, setverifycode] = useState(false);
  const [codeNumber1, setcodeNumber1] = useState();
  const [codeNumber2, setcodeNumber2] = useState();
  const [codeNumber3, setcodeNumber3] = useState();
  const [codeNumber4, setcodeNumber4] = useState();
  const [codeNumber5, setcodeNumber5] = useState();
  const [codeNumber6, setcodeNumber6] = useState();

  //redux
  const dispatch = useDispatch();

  //firebase
  const firebaseConfig = app ? app.options : undefined;

  const navigation = useNavigation();

  return (
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
    <KeyboardAvoidingView
      style={tw`flex items-center h-screen w-screen pt-15 px-4 mt-[${statusbarheight}] bg-[#FFFFFF]`}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={app.options}
        //attemptInvisibleVerification
      />
      {!verifycode && (
        <>
          <View style={tw`flex items-start  my-4`}>
            <Text style={styles.title}>Entrer votre numéro</Text>
            <Text style={styles.subtitle}>
              Vous allez recevoir un code de verification sur votre numéro de
              téléphone.
            </Text>
          </View>
          <View
            style={[
              tw`border-2 w-full my-10  p-4 border-[${phonebordercolor}] flex-row justify-between rounded-md `,
              styles.phoneContainer,
            ]}
          >
            <View style={tw`flex-row`}>
              <Image
                source={require("../assets/png/tunisia.png")}
                style={tw`mt-[5]`}
              />
              <Text style={styles.number}>+216</Text>
            </View>
            <View style={tw`h-full border-[0.15] mx-6 `} />
            <TextInput
              style={[tw`mr-12 w-[40]`, styles.numbers]}
              placeholder="Num téléphone"
              autoCompleteType="tel"
              keyboardType="phone-pad"
              textContentType="telephoneNumber"
              onChangeText={(phoneNumber) => setPhoneNumber(phoneNumber)}
              onFocus={() => setphonebordercolor("#F74C00")}
            />
          </View>

          <TouchableOpacity
            style={tw`absolute bottom-5 rounded-full bg-[#431879] w-[80] p-4 flex justify-center items-center`}
            onPress={async () => {
              // The FirebaseRecaptchaVerifierModal ref implements the
              // FirebaseAuthApplicationVerifier interface and can be
              // passed directly to `verifyPhoneNumber`.
              try {
                if (phoneNumber !== "" && phoneNumber.length === 8) {
                  const phoneProvider = new PhoneAuthProvider(auth);
                  const verificationId = await phoneProvider.verifyPhoneNumber(
                    "+216" + phoneNumber,
                    recaptchaVerifier.current
                  );
                  setVerificationId(verificationId);
                  setverifycode(true);
                }
              } catch (err) {
                showMessage({ text: `Error: ${err.message}`, color: "red" });
                console.log(err);
              }
            }}
          >
            <Text style={styles.btn}>Continuer</Text>
          </TouchableOpacity>
        </>
      )}
      {verifycode && (
        <>
          <View style={tw`flex items-start w-full ml-[15%]`}>
            <Text style={styles.title}>Entrer votre code</Text>
            <Text style={[tw`my-2`, styles.subSubtitle]}>
              Le code SMS a été envoyer à
            </Text>
            <Text style={styles.subtitleNumber}>+216 {phoneNumber}</Text>
          </View>
          <View style={[tw`w-full items-start mt-10 `]}>
            <Text
              style={[tw`text-[#F74C00] underline ml-[9%] `, { fontSize: 16 }]}
              onPress={() => setverifycode(false)}
            >
              Modifier mon numéro
            </Text>
            <View style={[tw`flex-row w-full mt-4 justify-center`]}>
              <View
                style={tw`border rounded-lg mx-1 w-[12] h-[15] flex justify-center items-center `}
              >
                <TextInput
                  ref={code1}
                  style={[tw`ml-2 mt-2`, styles.numbers]}
                  autoCompleteType="tel"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    code2.current.focus();
                  }}
                  blurOnSubmit={false}
                  textContentType="telephoneNumber"
                  onChangeText={(codeNumber) => {
                    if (codeNumber.length === 1) {
                      code2.current.focus();
                      setcodeNumber1(codeNumber);
                    } else {
                      setcodeNumber1("");
                    }
                  }}
                  maxLength={1}
                />
              </View>
              <View
                style={tw`border rounded-lg mx-1 w-[12] h-[15] flex justify-center items-center `}
              >
                <TextInput
                  ref={code2}
                  style={[tw`ml-2 mt-2`, styles.numbers]}
                  autoCompleteType="tel"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    code3.current.focus();
                  }}
                  blurOnSubmit={false}
                  focusable
                  textContentType="telephoneNumber"
                  onChangeText={(codeNumber) => {
                    if (codeNumber.length === 1) {
                      code3.current.focus();
                      setcodeNumber2(codeNumber);
                    } else {
                      setcodeNumber2("");
                    }
                  }}
                  maxLength={1}
                />
              </View>
              <View
                style={tw`border rounded-lg mx-1 w-[12] h-[15] flex justify-center items-center `}
              >
                <TextInput
                  ref={code3}
                  style={[tw`ml-2 mt-2`, styles.numbers]}
                  autoCompleteType="tel"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    code4.current.focus();
                  }}
                  blurOnSubmit={false}
                  focusable
                  textContentType="telephoneNumber"
                  onChangeText={(codeNumber) => {
                    if (codeNumber.length === 1) {
                      code4.current.focus();
                      setcodeNumber3(codeNumber);
                    } else {
                      setcodeNumber3("");
                    }
                  }}
                  maxLength={1}
                />
              </View>
              <View
                style={tw`border rounded-lg mx-1 w-[12] h-[15] flex justify-center items-center `}
              >
                <TextInput
                  ref={code4}
                  style={[tw`ml-2 mt-2`, styles.numbers]}
                  autoCompleteType="tel"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    code5.current.focus();
                  }}
                  blurOnSubmit={false}
                  focusable
                  textContentType="telephoneNumber"
                  onChangeText={(codeNumber) => {
                    if (codeNumber.length === 1) {
                      code5.current.focus();
                      setcodeNumber4(codeNumber);
                    } else {
                      setcodeNumber4("");
                    }
                  }}
                  maxLength={1}
                />
              </View>
              <View
                style={tw`border rounded-lg mx-1 w-[12] h-[15] flex justify-center items-center `}
              >
                <TextInput
                  ref={code5}
                  style={[tw`ml-2 mt-2`, styles.numbers]}
                  autoCompleteType="tel"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    code6.current.focus();
                  }}
                  blurOnSubmit={false}
                  focusable
                  textContentType="telephoneNumber"
                  onChangeText={(codeNumber) => {
                    if (codeNumber.length === 1) {
                      code6.current.focus();
                      setcodeNumber5(codeNumber);
                    } else {
                      setcodeNumber5("");
                    }
                  }}
                  maxLength={1}
                />
              </View>
              <View
                style={tw`border rounded-lg mx-1 w-[12] h-[15] flex justify-center items-center `}
              >
                <TextInput
                  ref={code6}
                  style={[tw`ml-2 mt-2`, styles.numbers]}
                  autoCompleteType="tel"
                  keyboardType="numeric"
                  returnKeyType="next"
                  onSubmitEditing={() => {
                    code1.current.blur();
                  }}
                  blurOnSubmit={false}
                  focusable
                  textContentType="telephoneNumber"
                  onChangeText={(codeNumber) => {
                    if (codeNumber.length === 1) {
                      code6.current.blur();
                      setcodeNumber6(codeNumber);
                    } else {
                      setcodeNumber6("");
                    }
                  }}
                  maxLength={1}
                />
              </View>
            </View>
          </View>
          <View style={tw`absolute bottom-5`}>
            <Text style={tw`mb-2`}>
              Renvoi du code dans
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins-SemiBold",
                }}
              >
                {" "}
                16sec
              </Text>
            </Text>

            <TouchableOpacity
              style={tw` rounded-full bg-[#431879] w-[80]  p-4 flex justify-center items-center`}
              onPress={async () => {
                try {
                  if (
                    codeNumber1.length === 1 &&
                    codeNumber2.length === 1 &&
                    codeNumber3.length === 1 &&
                    codeNumber4.length === 1 &&
                    codeNumber5.length === 1
                  ) {
                    console.log();
                    const credential = PhoneAuthProvider.credential(
                      verificationId,
                      codeNumber1 +
                        codeNumber2 +
                        codeNumber3 +
                        codeNumber4 +
                        codeNumber5 +
                        codeNumber6
                    );
                    await signInWithCredential(auth, credential);
                    showMessage({ text: "Phone authentication successful 👍" });
                    dispatch(
                      setCurrentUser({
                        uid: auth.currentUser.uid,
                        phoneNumber: auth.currentUser.phoneNumber,
                      })
                    );
                    navigation.navigate("HomeScreen");
                  } else {
                    showMessage({
                      text: `Error: Pleas fill all the numbers`,
                      color: "red",
                    });
                  }
                } catch (err) {
                  showMessage({ text: `Error: ${err.message}`, color: "red" });
                }
              }}
            >
              <Text style={styles.btn}>Verifier</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
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
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 28,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: 15,
  },
  subSubtitle: {
    fontFamily: "Poppins-Light",
    fontSize: 15,
  },
  subtitleNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: 15,
  },
  number: {
    fontFamily: "Poppins-Light",
    marginLeft: 20,
    fontSize: 20,
  },
  numbers: {
    fontFamily: "Poppins-Light",
    fontSize: 20,
  },
  phoneContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  btn: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#fff",
  },
});
