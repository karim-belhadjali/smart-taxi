import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import CarSvg from "../../assets/svg/CarSvg";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Linking from "expo-linking";
import { moderateScale } from "../../Metrics";

const WaitingRide = ({ ride, onCall, cancelRide }) => {
  const { width, height } = Dimensions.get("window");

  let place;
  if (ride?.origin.description === "inconnu") {
    place = "votre emplacement";
  } else {
    place = ride?.origin.description;
  }
  return (
    <View
      style={[
        tw`bg-[#FFFFFF] absolute bottom-0 w-screen h-[35%] rounded-t-2xl p-4 flex items-center`,
        {
          shadowRadius: 20,
          shadowOpacity: 0.18,
          shadowColor: "#171717",
          shadowOffset: {
            width: -11,
            height: -5,
          },
          elevation: 50,
        },
      ]}
    >
      <Text
        style={[
          tw`mt-1 ml-5 w-90`,
          {
            fontFamily: "Poppins-Regular",
            fontSize: width * 0.04,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        Rendez-vous a {place}
      </Text>
      <View
        key={"separator"}
        style={tw`bg-[#000000] opacity-10 h-[.45] mt-1 w-screen`}
      />
      <View
        style={tw`mt-2 w-screen h-[55%] flex flex-row  justify-evenly items-center`}
      >
        <View style={tw`flex justify-center items-center`}>
          <CarSvg />
          <Text
            style={[
              tw`pt-2`,
              {
                fontFamily: "Poppins-SemiBold",
                fontSize: width * 0.04,
                color: "#979797",
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            {ride?.driverInfo.carType}
          </Text>
        </View>
        <View style={tw`w-[50%] pl-10`}>
          <Text
            style={[
              tw``,
              {
                fontFamily: "Poppins-SemiBold",
                fontSize: width * 0.05,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            {ride?.driverInfo.name}
          </Text>
          <Text
            style={[
              tw``,
              {
                fontFamily: "Poppins-Light",
                fontSize: width * 0.03,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            En route
          </Text>
          <Text
            style={[
              tw``,
              {
                fontFamily: "Poppins-Bold",
                fontSize: width * 0.05,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            {ride?.price} TND
          </Text>
        </View>
      </View>
      <View style={tw`flex flex-row items-center justify-around w-full mt-2`}>
        <TouchableOpacity
          style={tw`rounded-full bg-[#fff] h-[11] w-50% border-[#66CFC7] border-2 p-2 flex flex-row justify-center items-center`}
          onPress={() => Linking.openURL(`tel:+216 ${ride?.driverInfo?.phone}`)}
        >
          <FontAwesome name="phone" size={20} color="#66CFC7" />
          <Text style={styles.btnappel} allowFontScaling={false}>
            Appel Driver
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`rounded-full bg-[#fff] h-[11] w-40% border-[#979797] border-2 p-2 flex flex-row justify-center items-center`}
          onPress={() => {
            Alert.alert("Annuler la course", "voulez-vous annuler la course?", [
              {
                text: "retour",
                onPress: () => {},
              },
              {
                text: "Annuler la course",
                onPress: () => {
                  cancelRide();
                },
                style: "cancel",
              },
            ]);
          }}
        >
          <Text style={styles.btnAnnuler} allowFontScaling={false}>
            Annuler
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WaitingRide;

const styles = StyleSheet.create({
  btnappel: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Dimensions.get("window").width * 0.035,
    color: "#66CFC7",
    marginLeft: 20,
  },
  btnAnnuler: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Dimensions.get("window").width * 0.035,
  },
});
