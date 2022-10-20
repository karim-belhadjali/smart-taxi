import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import CarSvg from "../../assets/svg/CarSvg";
import SmallCarSvg from "../../assets/svg/SmallCarSvg";
import StarSvg from "../../assets/svg/StarSvg";

import DestinationSvg from "../../assets/svg/destinationSvg";

const OngoingRide = ({ ride, onNext }) => {
  console.log(ride);
  return (
    <View
      style={[
        tw`bg-[#FFFFFF] absolute bottom-0 w-screen h-[35%] rounded-t-2xl p-4 flex items-center`,
        {
          shadowRadius: 100,
          shadowOpacity: 0.8,
          shadowColor: "#171717",
          shadowOffset: {
            width: -11,
            height: -50,
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
          <Text style={[tw``, { fontFamily: "Poppins-Light", fontSize: 10 }]}>
            Paiement Cash
          </Text>
        </View>
      </View>

      <View
        key={"separator"}
        style={tw`bg-[#000000] opacity-10 h-[.45] mt-1 w-screen`}
      />
      <View key={"details"} style={tw`mt-2 w-[80%] h-[50%] flex  items-start`}>
        <Text
          style={[tw`mb-2`, { fontFamily: "Poppins-Regular", fontSize: 14 }]}
        >
          En route
        </Text>
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
              {ride?.origin.description}
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
        <Text
          style={[tw`pt-2`, { fontFamily: "Poppins-Regular", fontSize: 14 }]}
        >
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
