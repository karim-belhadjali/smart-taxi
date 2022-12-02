import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useRef } from "react";
import { moderateScale } from "../Metrics";

const InputGeneral = ({ placeHolder, value, onChangeText }) => {
  const [borderColor, setborderColor] = useState("#979797");
  const { width, height } = Dimensions.get("window");
  const ref = useRef();
  return (
    <View
      style={[
        tw`flex flex-row w-50% mt-5 border`,
        styles.container,

        { borderColor: borderColor },
      ]}
    >
      <TextInput
        ref={ref}
        placeholder={placeHolder}
        value={value}
        onChangeText={(text) => {
          onChangeText(text);
        }}
        style={[tw`flex-1`, { fontSize: width * 0.04 }]}
        keyboardType="default"
        blurOnSubmit={true}
        onFocus={() => {
          setborderColor("#F74C00");
        }}
        onBlur={() => setborderColor("")}
        allowFontScaling={false}
      />
    </View>
  );
};

export default InputGeneral;

const styles = StyleSheet.create({
  icon: {},
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
