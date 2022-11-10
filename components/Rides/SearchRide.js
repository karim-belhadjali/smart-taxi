import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import CarSvg from "../../assets/svg/CarSvg";
import AnnulerBtn from "../AnnulerBtn";
import Loader from "react-native-three-dots";
import { moderateScale } from "../../Metrics";
const SearchRide = ({ onClick }) => {
  const { width, height } = Dimensions.get("window");

  return (
    <View
      style={[
        tw`bg-[#FFFFFF] w-screen h-[40%] rounded-t-2xl px-4 pb-2 flex justify-center items-center`,
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
      <CarSvg />
      <View style={tw`my-2`} />
      <ActivityIndicator size={"small"} color="#431879" />
      <Text
        style={[
          tw`mt-3`,
          {
            fontFamily: "Poppins-SemiBold",
            fontSize: width * 0.05,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        Recherche en cours
      </Text>
      <Text
        style={[
          tw` mb-5`,
          {
            fontFamily: "Poppins-Light",
            fontSize: width * 0.03,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        Veuiller patienter un moment
      </Text>
      <AnnulerBtn onClick={onClick} />
    </View>
  );
};

export default SearchRide;

const styles = StyleSheet.create({});
