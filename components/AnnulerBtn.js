import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { moderateScale } from "../Metrics";

const AnnulerBtn = ({ onClick }) => {
  return (
    <TouchableOpacity
      style={tw`absolute bottom-3 ios:bottom-5 rounded-full bg-[#fff] w-[80] border-[#431879] border-2 p-4 flex justify-center items-center`}
      onPress={onClick}
    >
      <Text
        style={styles.btn}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        Annuler
      </Text>
    </TouchableOpacity>
  );
};

export default AnnulerBtn;

const styles = StyleSheet.create({
  btn: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Dimensions.get("window").width * 0.04,
    color: "#431879",
  },
});
