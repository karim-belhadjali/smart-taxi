import { Dimensions, StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";
import { moderateScale } from "../Metrics";

const NextBtn = ({ text, onClick }) => {
  return (
    <TouchableOpacity
      style={tw`absolute android:bottom-5 ios:bottom-10 rounded-full bg-[#431879] w-[80]  p-4 flex justify-center items-center `}
      onPress={onClick}
    >
      <Text
        style={styles.btn}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default NextBtn;

const styles = StyleSheet.create({
  btn: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Dimensions.get("window").width * 0.04,
    color: "#fff",
  },
});
