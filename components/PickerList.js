import { StyleSheet, Text, View, Platform } from "react-native";
import React from "react";
import tw from "twrnc";

import { Picker } from "@react-native-picker/picker";
const PickerList = ({ title, selectedValue, setSelectedLanguage, items }) => {
  const data = [
    { key: 1, section: true, label: "Fruits" },
    { key: 2, label: "Red Apples" },
    { key: 3, label: "Cherries" },
    { key: 4, label: "Cranberries" },
    { key: 5, label: "Pink Grapefruit" },
    { key: 6, label: "Raspberries" },
    { key: 8, label: "Beets" },
    { key: 9, label: "Red Peppers" },
    { key: 7, label: "Radishes" },
    { key: 41, label: "Red Onions" },
  ];

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
      {Platform.OS === "ios" && (
        <View style={tw`flex items-start w-[80%] mt-5`}>
          {title && <Text style={[tw`mx-1`, styles.text]}>{title}</Text>}
          <View
            style={tw`border border-[#979797] w-[100%] rounded-lg px-2 text-[#979797]`}
          >
            <ModalPicker
              data={data}
              initValue="Select something yummy!"
              onChange={(option) => {
                console.log(option);
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
