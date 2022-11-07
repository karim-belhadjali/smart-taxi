import { StyleSheet, TextInput, View } from "react-native";
import React, { useRef } from "react";
import tw from "twrnc";

const CodeInput = ({ index, active, onChange }) => {
  const ref = useRef();

  if (index == active) {
  }

  const handleChange = (codeNumber) => {
    if (codeNumber.length) {
      onChange(index, codeNumber);
    }
  };
  return (
    <View
      style={tw`border rounded-lg mx-1 w-[15] h-[15] flex justify-center items-center `}
    >
      <TextInput
        ref={ref}
        style={[tw`ml-2 mt-2`, styles.numbers]}
        autoCompleteType="tel"
        keyboardType="numeric"
        focusable
        textContentType="telephoneNumber"
        onChangeText={(codeNumber) => handleChange(codeNumber)}
        maxLength={1}
      />
    </View>
  );
};

export default CodeInput;

const styles = StyleSheet.create({});
