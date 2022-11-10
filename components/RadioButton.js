import { Dimensions, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { RadioButton } from "react-native-paper";
import tw from "twrnc";

const RadioButtons = ({ title, value, onSelect, state, disabled }) => {
  return (
    <View style={tw`flex flex-row`}>
      <RadioButton
        value={value}
        status={state === value ? "checked" : "unchecked"}
        disabled={disabled}
        onPress={() => {
          onSelect(value);
        }}
        color="#F74C00"
      />
      <Text
        style={[
          tw`mt-2 ${state === value ? "text-[#F74C00]" : ""}`,
          { fontSize: Dimensions.get("window").width * 0.04 },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        {title}
      </Text>
    </View>
  );
};

export default RadioButtons;

const styles = StyleSheet.create({});
