import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import tw from "twrnc";
import ModalSelector from "react-native-modal-selector";

import { Picker } from "@react-native-picker/picker";
const PickerList = ({ title, selectedValue, setSelectedLanguage, items }) => {
  return (
    <>
      {Platform.OS === "android" && (
        <View style={tw`flex items-start w-[80%] mt-5`}>
          {title && <Text style={[tw`mx-1`, styles.text]}>{title}</Text>}
          <View
            style={tw`border border-[#979797] w-[100%] rounded-lg px-2 text-[#979797]`}
          >
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue, itemIndex) => {
                setSelectedLanguage(itemValue);
              }}
              itemStyle={{ height: 50, backgroundColor: "transparent" }}
            >
              {items.map((value) => {
                return <Picker.Item key={value} label={value} value={value} />;
              })}
            </Picker>
          </View>
        </View>
      )}
      {Platform.OS !== "android" && (
        <View style={tw`flex items-start w-[80%] mt-5`}>
          {title && <Text style={[tw`mx-1`, styles.text]}>{title}</Text>}
          <View style={tw` w-[100%] rounded-lg  text-[#979797]`}>
            <ModalSelector
              data={items}
              initValue={selectedValue}
              onChange={(option) => {
                setSelectedLanguage(option.label);
              }}
            />
          </View>
        </View>
      )}
    </>
  );
};

export default PickerList;

const styles = StyleSheet.create({
  text: {
    fontFamily: "Poppins-Light",
    lineHeight: 21,
  },
});
