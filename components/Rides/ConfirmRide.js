import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import CarSvg from "../../assets/svg/CarSvg";

const ConfirmRide = ({ rideInfo, onCancel, onConfirm }) => {
  let place;
  if (rideInfo?.place === "inconnu") {
    place = "votre emplacement";
  } else {
    place = rideInfo?.place;
  }
  return (
    <View
      style={[
        tw`bg-[#FFFFFF] absolute bottom-0 w-screen h-[35%] rounded-t-2xl p-4 flex items-center`,
        {
          shadowRadius: 20,
          shadowOpacity: 0.18,
          shadowColor: "#171717",
          shadowOffset: {
            width: -11,
            height: -5,
          },
          elevation: 50,
        },
      ]}
    >
      <Text
        style={[
          tw`mt-1 pr-10`,
          { fontFamily: "Poppins-Regular", fontSize: 15 },
        ]}
        numberOfLines={1}
      >
        Rendez-vous a {place}
      </Text>
      <View
        key={"separator"}
        style={tw`bg-[#000000] opacity-10 h-[.45] mt-2 w-screen`}
      />
      <View
        style={tw`mt-2 w-screen h-[55%] flex flex-row  justify-evenly items-center`}
      >
        <CarSvg />
        <View style={tw`w-[50%] pl-10`}>
          <Text
            style={[tw``, { fontFamily: "Poppins-SemiBold", fontSize: 20 }]}
          >
            {rideInfo?.driverName}
          </Text>
          <Text style={[tw``, { fontFamily: "Poppins-Light", fontSize: 10 }]}>
            Arrive dans {rideInfo?.time}
          </Text>
          {!isNaN(rideInfo?.price) && (
            <Text style={[tw``, { fontFamily: "Poppins-Bold", fontSize: 20 }]}>
              {rideInfo?.price} TND
            </Text>
          )}
        </View>
      </View>
      <View
        style={tw`mt-2 mb-2 w-screen flex flex-row justify-evenly items-center`}
      >
        <TouchableOpacity
          style={tw`rounded-full bg-[#fff] w-[43%] border-[#431879] border-2 p-4 flex justify-center items-center`}
          onPress={onCancel}
        >
          <Text style={styles.btnAnnuler}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`rounded-full bg-[#431879] w-[51%] border-[#431879]  p-4 flex justify-center items-center`}
          onPress={onConfirm}
        >
          <Text style={styles.btn}>Confirmer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmRide;

const styles = StyleSheet.create({
  btn: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#fff",
  },
  btnAnnuler: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#431879",
  },
});
