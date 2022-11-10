import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";

const AboutItem = ({ style, fontStyle, text, iconStyle }) => {
  return (
    <TouchableOpacity
      style={[tw`flex flex-row justify-between items-center mx-5`, style]}
    >
      <Text
        style={[fontStyle, { fontSize: Dimensions.get("window").width * 0.05 }]}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        {text}
      </Text>
      <AntDesign name="right" size={20} color={"#000000"} style={iconStyle} />
    </TouchableOpacity>
  );
};

export default AboutItem;

const styles = StyleSheet.create({});
