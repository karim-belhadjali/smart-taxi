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
import { moderateScale } from "../Metrics";

const MenuItem = ({ iconName, text, onClick }) => {
  return (
    <TouchableOpacity style={tw`flex flex-row w-full my-5`} onPress={onClick}>
      <AntDesign style={tw`mx-5`} name={iconName} size={30} color={"#455154"} />
      <Text
        style={[
          tw``,
          {
            fontFamily: "Poppins-Regular",
            fontSize: Dimensions.get("window").width * 0.05,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({});
