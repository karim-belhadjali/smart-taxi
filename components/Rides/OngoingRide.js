import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import CarSvg from "../../assets/svg/CarSvg";
import SmallCarSvg from "../../assets/svg/SmallCarSvg";
import StarSvg from "../../assets/svg/StarSvg";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import DestinationSvg from "../../assets/svg/destinationSvg";

const OngoingRide = ({ ride, onNext }) => {
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
      <View
        style={tw`w-screen flex flex-row justify-between items-center px-7`}
      >
        <SmallCarSvg />
        <View>
          <Text style={[tw``, { fontFamily: "Poppins-Bold", fontSize: 20 }]}>
            {ride?.price} TND
          </Text>
          <Text
            style={[tw`pb-2`, { fontFamily: "Poppins-Light", fontSize: 10 }]}
          >
            Paiement Cash
          </Text>
        </View>
      </View>

      <View
        key={"separator"}
        style={tw`bg-[#000000] opacity-10 h-[.45] mt-1 w-screen`}
      />
      <View key={"details"} style={tw`mt-2 w-[80%] h-[50%] flex  items-start`}>
        <View style={tw`flex-row mb-3`}>
          <EvilIcons
            name="clock"
            size={20}
            color="#66CFC7"
            style={tw`mt-[3] mr-3`}
          />

          <Text
            style={[
              tw``,
              { fontFamily: "Poppins-SemiBold", fontSize: 14, opacity: 0.7 },
            ]}
          >
            En route
          </Text>
        </View>
        <View key={"road"} style={tw`flex flex-row`}>
          <View style={tw`ml-5 mr-5`}>
            <DestinationSvg />
          </View>
          <View style={tw`flex `}>
            <Text
              style={[
                tw`mb-4`,
                { fontFamily: "Poppins-Regular", fontSize: 14 },
              ]}
            >
              {place}
            </Text>
            <Text
              style={[
                tw`mb-2`,
                { fontFamily: "Poppins-Regular", fontSize: 14 },
              ]}
            >
              {ride?.destination.description}
            </Text>
          </View>
        </View>
      </View>
      <View
        key={"separator2"}
        style={tw`bg-[#000000] opacity-10 h-[.45] mt-1 w-screen`}
      />
      <TouchableOpacity
        key={"message"}
        style={tw`mt-4 w-screen flex flex-row justify-evenly items-center`}
        onPress={onNext}
      >
        <StarSvg style={tw`mt-1`} />
        <Text style={[tw``, { fontFamily: "Poppins-Regular", fontSize: 14 }]}>
          beem vous souhaite une Bonne route !
        </Text>
        <StarSvg />
      </TouchableOpacity>
    </View>
  );
};

export default OngoingRide;

const styles = StyleSheet.create({
  btn: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  btnAnnuler: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#431879",
  },
});
