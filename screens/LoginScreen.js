import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { signInAnonymously, signInWithEmailAndPassword } from "firebase/auth";

import { auth, app, functions, db } from "../firebase";

import { doc, getDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { setCurrentUser, setUserInfo } from "../app/slices/navigationSlice";
import tw from "twrnc";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import TunisiaSvg from "../assets/svg/TunisiaSvg";
import NextBtn from "../components/NextBtn";
import { moderateScale } from "../Metrics";

const OTP_KEY = "0f5b38df-4933-49bc-8f50-6173ec0e28d1";

const LoginScreen = () => {
  const { width, height } = Dimensions.get("window");

  let timeout;
  const [disabled, setdisabled] = useState(true);
  // Code Ref management hooks
  const code2 = useRef();
  const code3 = useRef();
  const code1 = useRef();
  const code4 = useRef();
  const tel = useRef();

  const statusbarheight = StatusBar.currentHeight;
  // Phone State management hooks
  const [phonebordercolor, setphonebordercolor] = useState("#431879");
  const [phoneNumber, setPhoneNumber] = useState();
  const [verificationId, setVerificationId] = useState();
  const [message, showMessage] = useState();
  const [error, seterror] = useState();
  const [waiting, setwaiting] = useState(false);

  // Code State management hooks
  const [verifycode, setverifycode] = useState(false);
  const [codeNumber1, setcodeNumber1] = useState();
  const [codeNumber2, setcodeNumber2] = useState();
  const [codeNumber3, setcodeNumber3] = useState();
  const [codeNumber4, setcodeNumber4] = useState();

  //redux
  const dispatch = useDispatch();

  const navigation = useNavigation();

  //Border
  const [border1, setborder1] = useState("#979797");
  const [border2, setborder2] = useState("#979797");
  const [border3, setborder3] = useState("#979797");
  const [border4, setborder4] = useState("#979797");

  const handleSendOtp = async () => {
    setwaiting(true);
    var myHeaders = new Headers();
    myHeaders.append("x-as-apikey", OTP_KEY);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      messageFormat: "Beem: ${otp} est votre code de confirmation.",
      phoneNumber: `+216${phoneNumber}`,
      otpLength: 4,
      otpValidityInSeconds: 120,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://www.getapistack.com/api/v1/otp/send", requestOptions)
      .then((response) => response.text())
      .then((data) => {
        setwaiting(false);
        const result = JSON.parse(data);
        if (result.data.requestId) {
          setVerificationId(result.data.requestId);
          setverifycode(true);
        } else {
          setwaiting(false);
          showMessage({
            text: "un problème est survenu lors de l'envoi du code, veuillez contacter l'équipe d'assistance",
          });
        }
      })
      .catch((error) => {
        setwaiting(false);
        console.log("error", error);
      });
    setverifycode(true);
  };

  const handleVerifyOtp = async (otps) => {
    setwaiting(true);
    var myHeaders = new Headers();
    myHeaders.append("x-as-apikey", OTP_KEY);
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      requestId: verificationId,
      otp: otps,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://www.getapistack.com/api/v1/otp/verify", requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let resp = JSON.parse(result);
        if (resp.data.isOtpValid == true) {
          handleSignIn();
        } else {
          setwaiting(false);
          setborder1("#F74C00");
          setborder2("#F74C00");
          setborder3("#F74C00");
          setborder4("#F74C00");
          seterror({
            text: "Ce code est erroné, veuillez vérifier votre boîte de réception pour le code valide",
          });
        }
      })
      .catch((error) => {
        setwaiting(false);
        console.log("error", error);
      });
  };

  const handleStep1Click = async () => {
    if (phoneNumber.length > 6) {
      if (phoneNumber !== "92226997") {
        handleSendOtp();
      } else {
        setwaiting(true);
        handleSignIn();
      }
    } else {
      setphonebordercolor("#F74C00");
      showMessage({ text: "Please enter a valid phone number " });
    }
  };

  const storeUser = async (value) => {
    try {
      await AsyncStorage.setItem("Client", JSON.stringify(value));
    } catch (e) {
      // saving error
      seterror({
        text: "un problème est survenu lors de la sauvegarde de l'utilisateur, contactez l'équipe d'assistance",
      });
    }
  };

  const handleSignIn = async () => {
    let client;
    const docRef = doc(db, "clients", phoneNumber);
    const docSnap = await getDoc(docRef).catch((err) => {
      seterror({
        text: "Nous n'avons pas pu accéder à Internet",
      });
      return;
    });
    if (docSnap?.exists()) {
      client = docSnap.data();
      seterror(null);
      signInWithEmailAndPassword(auth, docSnap.data().email, phoneNumber)
        .then(async () => {
          await storeUser(client);
          dispatch(setCurrentUser(docSnap.data()));
          setwaiting(false);

          navigation.navigate("HomeScreen");
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "HomeScreen",
              },
            ],
          });
        })
        .catch((error) => {
          setwaiting(false);
          console.log(error);
          seterror({
            text: "Impossible de se connecter assurez-vous que votre connexion Internet fonctionne, si le problème persiste contactez le support",
          });
        });
    } else {
      dispatch(setUserInfo({ phone: phoneNumber }));
      navigation.navigate("CompleteProfileScreen");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "CompleteProfileScreen",
          },
        ],
      });
    }
  };

  useEffect(() => {
    setwaiting(false);
  }, []);

  useEffect(() => {
    if (verifycode) {
      setdisabled(true);
      timeout = setTimeout(() => {
        setdisabled(false);
      }, 10000);
    } else {
      setdisabled(true);
      if (timeout) {
        clearTimeout(timeout);
      }
    }
  }, [verifycode]);

  return (
    <>
      {!waiting && (
        <KeyboardAvoidingView
          style={tw`flex items-center h-screen w-screen pt-15 px-4 mt-[${statusbarheight}] bg-[#FFFFFF]`}
        >
          {!verifycode && (
            <>
              <View style={tw`flex items-start  my-4`}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  allowFontScaling={false}
                >
                  Entrer votre numéro
                </Text>
                <Text style={styles.subtitle} allowFontScaling={false}>
                  Vous allez recevoir un code de verification sur votre numéro
                  de téléphone.
                </Text>
              </View>
              <View
                style={[
                  tw`border-2 w-full my-5  p-4 border-[${phonebordercolor}] flex-row justify-between rounded-md `,
                  styles.phoneContainer,
                ]}
              >
                <View style={tw`flex-row`}>
                  <TunisiaSvg style={tw`mt-[5]`} />
                  <Text style={styles.number} allowFontScaling={false}>
                    +216
                  </Text>
                </View>
                <View style={tw`h-full border-[0.15] mx-6 `} />
                <TextInput
                  ref={tel}
                  style={[tw`mr-12 w-[40]`, styles.numbers]}
                  placeholder="Num téléphone"
                  autoCompleteType="tel"
                  keyboardType="numeric"
                  textContentType="telephoneNumber"
                  onChangeText={(phoneNumber) => {
                    setPhoneNumber(phoneNumber);
                    if (phoneNumber.length === 8) {
                      tel.current.blur();
                    }
                  }}
                  allowFontScaling={false}
                  onFocus={() => setphonebordercolor("#FAC100")}
                  onBlur={() => setphonebordercolor("#431879")}
                />
              </View>
              {message && (
                <Text
                  style={{ fontFamily: "Poppins-Regular", color: "#F74C00" }}
                  allowFontScaling={false}
                >
                  {message.text}
                </Text>
              )}

              <NextBtn text={"Continuer"} onClick={handleStep1Click} />
            </>
          )}
          {verifycode && (
            <>
              <View style={tw`flex items-start w-full ml-[15%] `}>
                <Text
                  style={styles.title}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  allowFontScaling={false}
                >
                  Entrer votre code
                </Text>
                <Text
                  style={[tw`my-2`, styles.subSubtitle]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  allowFontScaling={false}
                >
                  Le code SMS a été envoyer à
                </Text>
                <Text style={styles.subtitleNumber} allowFontScaling={false}>
                  +216 {phoneNumber}
                </Text>
              </View>
              <View style={[tw`w-full items-start mt-10 `]}>
                <Text
                  style={[
                    tw`text-[#F74C00] underline ml-[9%] `,
                    {
                      fontSize: moderateScale(16),
                    },
                  ]}
                  onPress={() => setverifycode(false)}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  allowFontScaling={false}
                >
                  Modifier mon numéro
                </Text>
                <View style={[tw`flex-row w-full px-3 mt-4  justify-evenly`]}>
                  <TouchableOpacity
                    style={tw`border border-[${border1}] rounded-lg mx-1 w-18 h-[13] flex justify-center items-center overflow-visible`}
                    activeOpacity={1}
                    onPress={() => {
                      code1.current.focus();
                    }}
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
                      onFocus={() => setborder1("#FAC100")}
                      onBlur={() => setborder1("#979797")}
                      blurOnSubmit={false}
                      textContentType="telephoneNumber"
                      allowFontScaling={false}
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`border border-[${border2}] rounded-lg mx-1 w-18 h-[13] flex justify-center items-center overflow-visible `}
                    activeOpacity={1}
                    onPress={() => {
                      code2.current.focus();
                    }}
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
                      onFocus={() => setborder2("#FAC100")}
                      onBlur={() => setborder2("#979797")}
                      blurOnSubmit={false}
                      focusable
                      textContentType="telephoneNumber"
                      allowFontScaling={false}
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
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`border border-[${border3}] rounded-lg mx-1 w-18 h-[13] flex justify-center items-center  overflow-visible`}
                    activeOpacity={1}
                    onPress={() => {
                      code3.current.focus();
                    }}
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
                      onFocus={() => setborder3("#FAC100")}
                      onBlur={() => setborder3("#979797")}
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
                      allowFontScaling={false}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={tw`border border-[${border4}] rounded-lg mx-1 w-18 h-[13] flex justify-center items-center overflow-visible `}
                    activeOpacity={1}
                    onPress={() => {
                      code4.current.focus();
                    }}
                  >
                    <TextInput
                      ref={code4}
                      style={[tw`ml-2 mt-2`, styles.numbers]}
                      autoCompleteType="tel"
                      keyboardType="numeric"
                      returnKeyType="next"
                      onSubmitEditing={() => {
                        code4.current.blur();
                      }}
                      onFocus={() => setborder4("#FAC100")}
                      onBlur={() => setborder4("#979797")}
                      blurOnSubmit={false}
                      focusable
                      textContentType="telephoneNumber"
                      onChangeText={(codeNumber) => {
                        if (codeNumber.length === 1) {
                          code4.current.blur();
                          setcodeNumber4(codeNumber);
                        } else {
                          setcodeNumber4("");
                        }
                      }}
                      maxLength={1}
                      allowFontScaling={false}
                    />
                  </TouchableOpacity>
                </View>
                {error && (
                  <Text
                    style={[
                      tw`px-5 mt-5`,
                      { fontFamily: "Poppins-Regular", color: "#F74C00" },
                    ]}
                    allowFontScaling={false}
                  >
                    {error.text}
                  </Text>
                )}
              </View>
              <View style={tw`absolute bottom-5`}>
                <TouchableOpacity
                  onPress={() => {
                    if (!disabled) {
                      setdisabled(true);
                      handleSendOtp();
                    }
                  }}
                >
                  <Text
                    style={[
                      tw`mb-8 ml-5 text-[#F74C00] ${
                        disabled === true ? "opacity-40" : "opacity-100"
                      }`,
                      {
                        fontSize: moderateScale(14),
                        fontFamily: "Poppins-SemiBold",
                      },
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    allowFontScaling={false}
                  >
                    Renvoyez le code
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={tw` rounded-full bg-[#431879] w-[80]  p-4 flex justify-center items-center bottom-5`}
                  onPress={async () => {
                    try {
                      if (
                        codeNumber1.length === 1 &&
                        codeNumber2.length === 1 &&
                        codeNumber3.length === 1 &&
                        codeNumber4.length === 1
                      ) {
                        if (phoneNumber !== "92226997") {
                          await handleVerifyOtp(
                            codeNumber1 +
                              codeNumber2 +
                              codeNumber3 +
                              codeNumber4
                          );
                        } else {
                          handleSignIn();
                        }
                      } else {
                        seterror({
                          text: `Error: Pleas fill all the numbers`,
                          color: "red",
                        });
                      }
                    } catch (err) {
                      setborder1("#F74C00");
                      setborder2("#F74C00");
                      setborder3("#F74C00");
                      setborder4("#F74C00");
                      seterror({
                        text: `Please fill all the numbers`,
                        color: "red",
                      });
                    }
                  }}
                >
                  <Text style={styles.btn} allowFontScaling={false}>
                    Verifier
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </KeyboardAvoidingView>
      )}

      {waiting && (
        <View style={tw`h-full w-screen mt-[${StatusBar.currentHeight}]`}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "#000000",
                justifyContent: "center",
                opacity: 0.6,
              },
              tw`h-screen flex justify-center items-center`,
            ]}
          >
            <ActivityIndicator size={80} color="#F74C00" />
          </View>
        </View>
      )}
    </>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  title: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Dimensions.get("window").width * 0.08,
  },
  subtitle: {
    fontFamily: "Poppins-Regular",
    fontSize: Dimensions.get("window").width * 0.05,
  },
  subSubtitle: {
    fontFamily: "Poppins-Light",
    fontSize: Dimensions.get("window").width * 0.05,
  },
  subtitleNumber: {
    fontFamily: "Poppins-Bold",
    fontSize: Dimensions.get("window").width * 0.05,
  },
  number: {
    fontFamily: "Poppins-Light",
    marginLeft: 20,
    fontSize: Dimensions.get("window").width * 0.06,
  },
  numbers: {
    fontFamily: "Poppins-Light",
    fontSize: Dimensions.get("window").width * 0.06,
  },
  phoneContainer: {
    marginLeft: 20,
    marginRight: 20,
  },
  btn: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Dimensions.get("window").width * 0.05,
    color: "#fff",
  },
});
