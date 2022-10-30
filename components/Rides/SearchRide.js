import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import tw from "twrnc";
import CarSvg from "../../assets/svg/CarSvg";
import AnnulerBtn from "../AnnulerBtn";
import Loader from "react-native-three-dots";
const SearchRide = ({ onClick }) => {
  return (
    <View
      style={[
        tw`bg-[#FFFFFF] w-screen h-[40%] rounded-t-2xl px-4 py-2 flex justify-center items-center`,
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
      <CarSvg />
      <View style={tw`my-2`} />
      <ActivityIndicator size={"small"} color="#431879" />
      <Text
        style={[tw`mt-3`, { fontFamily: "Poppins-SemiBold", fontSize: 18 }]}
      >
        Recherche en cours
      </Text>
      <Text style={[tw` mb-5`, { fontFamily: "Poppins-Light", fontSize: 11 }]}>
        Veuiller patienter un moment
      </Text>
      <AnnulerBtn onClick={onClick} />
    </View>
  );
};

export default SearchRide;

const styles = StyleSheet.create({});
