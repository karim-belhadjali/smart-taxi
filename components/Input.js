import { Dimensions, StyleSheet, TextInput, View } from "react-native";
import React, { useState } from "react";
import tw from "twrnc";

import AntDesign from "react-native-vector-icons/AntDesign";
import { useRef } from "react";

const Input = ({ placeHolder, value, onChangeText }) => {
  const [borderColor, setborderColor] = useState("#979797");
  const ref = useRef();
  const { width, height } = Dimensions.get("window");
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
          if (text.length >= 4) {
            ref.current.blur();
          }
        }}
        style={[tw`flex-1`, { fontSize: width * 0.04 }]}
        numberOfLines={1}
        keyboardType="number-pad"
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

export default Input;

const styles = StyleSheet.create({
  icon: {},
  container: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
});
