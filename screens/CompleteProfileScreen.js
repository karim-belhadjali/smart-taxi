import {
  KeyboardAvoidingView,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  StatusBar,
} from "react-native";
import React, { useState, useEffect } from "react";

import AntDesign from "react-native-vector-icons/AntDesign";
import tw from "twrnc";
import TextInputs from "../components/TextInput";
import NextBtn from "../components/NextBtn";
import PickerList from "../components/PickerList";
import DatePicker from "../components/DatePicker";
import Input from "../components/Input";
import RadioButtons from "../components/RadioButton";

import { auth, app, functions, httpsCallable } from "../firebase";

import { useNavigation } from "@react-navigation/core";

const CompleteProfileScreen = () => {
  const navigation = useNavigation();

  const [currentStep, setcurrentStep] = useState("step1");
  const [email, setemail] = useState("");
  const [fullName, setfullName] = useState("");

  const [showerror, setshowerror] = useState(undefined);

  const [selectedGov, setselectedGov] = useState("Ben Arous");
  const [selectedVille, setselectedVille] = useState("Rades");
  const [currentDate, setcurrentDate] = useState(new Date(Date.now()));
  const [codePostal, setcodePostal] = useState("");

  const [mainGroup, setmainGroup] = useState("Régulierement");
  const [subGroup, setsubGroup] = useState("second");

  const [firstGroupDisabled, setfirstGroupDisabled] = useState(false);
  const [secondGroupDisabled, setsecondGroupDisabled] = useState(true);

  const gouvernorats = ["ben arous", "ariana", "mannouba"];
  const ville = ["Hammem-lif", "ezzahra", "rades"];

  const statusBarHeight = StatusBar.currentHeight;

  const handleStep1Click = () => {
    if (
      fullName !== "" &&
      email !== "" &&
      isValidEmail(email) &&
      fullName.length > 6
    ) {
      setcurrentStep("step2");
    } else if (isValidEmail(email)) {
      setshowerror({ text: "Please enter a valid email" });
    } else if (!fullName.length > 6) {
      setshowerror({ text: "Please enter a valid full name" });
    } else {
      setshowerror({ text: "Please fill all the required values" });
    }
  };
  const handleReturn = () => {
    if (currentStep === "step2") {
      setcurrentStep("step1");
    } else if (currentStep === "step3") {
      setcurrentStep("step2");
    }
  };

  const handleNext = async () => {
    if (currentStep === "step2") {
      setcurrentStep("step3");
    } else {
      const completeUser = httpsCallable(functions, "completeUser");
      completeUser({
        fullName: fullName,
        email: email,
        gouvernorat: selectedGov,
        ville: selectedVille,
        birthDate: currentDate,
        codePostal: codePostal,
        attendance: { main: mainGroup, secondary: subGroup },
      })
        .then((e) => {
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
          setcurrentStep("step1");
          showerror({ text: "There was a problem while updating you profile" });
        });
    }
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  useEffect(() => {
    if (mainGroup === "Régulierement") {
      setsubGroup("Hébdomadaire");
      setsecondGroupDisabled(true);
      setfirstGroupDisabled(false);
    } else {
      setsubGroup("Pas souvent");
      setsecondGroupDisabled(false);
      setfirstGroupDisabled(true);
    }
  }, [mainGroup]);

  return (
    <KeyboardAvoidingView
      style={[tw`w-screen mr-5`, styles.container]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={[tw`rounded-full`, styles.ellipse1]} />
      <View style={[tw`rounded-full`, styles.ellipse2]} />
      <TouchableOpacity style={styles.flesh} onPress={handleReturn}>
        <AntDesign name="arrowleft" size={20} color={"#ffff"} />
      </TouchableOpacity>
      {currentStep === "step1" && (
        <>
          <View style={[styles.styleSEnregistrer, tw`mb-15`]}>
            <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 30 }}>
              S'enregistrer
            </Text>
          </View>

          <View style={styles.inputContainer}>
            <TextInputs
              placeHolder={"Nom et prénom"}
              value={fullName}
              onChangeText={setfullName}
              iconName="user"
            />
            <TextInputs
              placeHolder={"Email"}
              value={email}
              onChangeText={setemail}
              iconName="mail"
            />
          </View>
          <NextBtn text={"Continuer"} onClick={handleStep1Click} />
        </>
      )}
      {currentStep === "step2" && (
        <View style={tw`w-full ml-[15%]`}>
          <DatePicker onSelect={setcurrentDate} />
          <PickerList
            title="Lieu de résidence principal"
            selectedValue={selectedGov}
            setSelectedLanguage={setselectedGov}
            items={gouvernorats}
          />
          <PickerList
            selectedValue={selectedVille}
            setSelectedLanguage={setselectedVille}
            items={ville}
          />
          <Input
            placeHolder="Code postal"
            value={codePostal}
            onChangeText={setcodePostal}
          />
        </View>
      )}
      {currentStep === "step3" && (
        <ScrollView
          style={tw`w-screen  pt-[170]`}
          contentContainerStyle={tw`flex justify-center items-center`}
        >
          <Text
            style={{
              width: "80%",
              fontFamily: "Poppins-Regular",
              fontSize: 15,
              lineHeight: 30,
            }}
          >
            En précisant votre fréquence d'utilisation des taxis vous pouvez
            recevoir un service adapté à vos besoins et plusieurs avantages :
          </Text>

          <View
            style={tw`w-full flex justify-center items-start ml-[15%] mt-[5%]`}
          >
            <RadioButtons
              title="Régulierement"
              value="Régulierement"
              onSelect={setmainGroup}
              state={mainGroup}
              disabled={false}
            />
            <View
              style={tw`w-full flex justify-center items-start ml-[5%] my-2`}
            >
              <RadioButtons
                title="Quotidienne"
                value="Quotidienne"
                onSelect={setsubGroup}
                state={subGroup}
                disabled={firstGroupDisabled}
              />
              <RadioButtons
                title="Hébdomadaire"
                value="Hébdomadaire"
                onSelect={setsubGroup}
                state={subGroup}
                disabled={firstGroupDisabled}
              />
              <RadioButtons
                title="Mensuel"
                value="Mensuel"
                onSelect={setsubGroup}
                state={subGroup}
                disabled={firstGroupDisabled}
              />
            </View>
            <RadioButtons
              title="Irrégulierement"
              value="Irrégulierement"
              onSelect={setmainGroup}
              state={mainGroup}
              disabled={false}
            />
            <View
              style={tw`w-full flex justify-center items-start ml-[5%] my-2`}
            >
              <RadioButtons
                title="Très souvent"
                value="Très souvent"
                onSelect={setsubGroup}
                state={subGroup}
                disabled={secondGroupDisabled}
              />
              <RadioButtons
                title="Assez souvent"
                value="Assez souvent"
                onSelect={setsubGroup}
                state={subGroup}
                disabled={secondGroupDisabled}
              />
              <RadioButtons
                title="Pas souvent"
                value="Pas souvent"
                onSelect={setsubGroup}
                state={subGroup}
                disabled={secondGroupDisabled}
              />
              <RadioButtons
                title="Rarement"
                value="Rarement"
                onSelect={setsubGroup}
                state={subGroup}
                disabled={secondGroupDisabled}
              />
            </View>
          </View>
        </ScrollView>
      )}
      {currentStep !== "step1" && (
        <View
          style={tw`absolute bottom-3 w-screen flex flex-row justify-between px-8 `}
        >
          <TouchableOpacity
            style={tw`rounded-full bg-[#fff] w-45%  p-4 flex justify-center items-center`}
            onPress={handleNext}
          >
            <Text style={[styles.btn, styles.ignore]}>Ignorer</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              tw`rounded-full bg-[#431879] w-45%   p-4 flex justify-center items-center`,
            ]}
            onPress={handleNext}
          >
            <Text style={[styles.btn, styles.next]}>Suivant</Text>
          </TouchableOpacity>
        </View>
      )}
    </KeyboardAvoidingView>
  );
};

export default CompleteProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  ellipse2: {
    position: "absolute",
    left: 159,
    top: -164,
    backgroundColor: "#431879",
    width: 283,
    height: 283,
  },
  ellipse1: {
    position: "absolute",
    left: -33,
    top: -126,
    backgroundColor: "#431879B8",
    opacity: 0.72,
    width: 283,
    height: 283,
  },
  flesh: {
    position: "absolute",
    left: 29,
    top: 60,
    width: 30,
    height: "auto",
    zIndex: 100,
  },
  styleSEnregistrer: {
    display: "flex",
    width: "80%",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    fontSize: 30,
  },
  inputContainer: {
    width: "80%",
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
  text: {
    fontFamily: "Poppins-Light",
    lineHeight: 21,
  },
  next: {
    fontFamily: "Poppins-SemiBold",
    lineHeight: 21,
    color: "white",
  },
  ignore: {
    fontFamily: "Poppins-SemiBold",
    lineHeight: 21,
    color: "black",
  },
});