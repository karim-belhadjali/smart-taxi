import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import tw from "twrnc";

const AnnulerBtn = ({ onClick }) => {
  return (
    <TouchableOpacity
      style={tw`absolute bottom-3 ios:bottom-5 rounded-full bg-[#fff] w-[80] border-[#431879] border-2 p-4 flex justify-center items-center`}
      onPress={onClick}
    >
      <Text style={styles.btn}>Annuler</Text>
    </TouchableOpacity>
  );
};

export default AnnulerBtn;

const styles = StyleSheet.create({
  btn: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#431879",
  },
});
