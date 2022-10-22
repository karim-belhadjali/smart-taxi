import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import CarSvg from "../../assets/svg/CarSvg";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as Linking from "expo-linking";

const WaitingRide = ({ ride, onCall }) => {
  return (
    <View
      style={[
        tw`bg-[#FFFFFF] absolute bottom-0 w-screen h-[35%] rounded-t-2xl p-4 flex items-center`,
        {
          shadowRadius: 100,
          shadowOpacity: 0.8,
          shadowColor: "#171717",
          shadowOffset: {
            width: -11,
            height: -50,
          },
          elevation: 50,
        },
      ]}
    >
      <Text
        style={[
          tw`mt-1 ml-5 w-90`,
          { fontFamily: "Poppins-Regular", fontSize: 15 },
        ]}
        numberOfLines={1}
      >
        Rendez-vous a {ride?.origin.description}
      </Text>
      <View
        key={"separator"}
        style={tw`bg-[#000000] opacity-10 h-[.45] mt-1 w-screen`}
      />
      <View
        style={tw`mt-2 w-screen h-[55%] flex flex-row  justify-evenly items-center`}
      >
        <View style={tw`flex justify-center items-center`}>
          <CarSvg />
          <Text
            style={[
              tw`pt-2`,
              {
                fontFamily: "Poppins-SemiBold",
                fontSize: 15,
                color: "#979797",
              },
            ]}
          >
            {ride?.driverInfo.carType}
          </Text>
        </View>
        <View style={tw`w-[50%] pl-10`}>
          <Text
            style={[tw``, { fontFamily: "Poppins-SemiBold", fontSize: 20 }]}
          >
            {ride?.driverInfo.name}
          </Text>
          <Text style={[tw``, { fontFamily: "Poppins-Light", fontSize: 10 }]}>
            En route
          </Text>
          <Text style={[tw``, { fontFamily: "Poppins-Bold", fontSize: 20 }]}>
            {ride?.price} TND
          </Text>
        </View>
      </View>

      <TouchableOpacity
        style={tw`rounded-full bg-[#fff] h-[15] w-[80] border-[#431879] border-2 p-2 flex flex-row justify-center items-center`}
        onPress={() => Linking.openURL(`tel:+216 ${ride?.driverInfo?.phone}`)}
      >
        <FontAwesome name="phone" size={35} color="#431879" />
        <Text style={styles.btnAnnuler}>Appel Driver</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WaitingRide;

const styles = StyleSheet.create({
  btnAnnuler: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 15,
    color: "#431879",
    marginLeft: 20,
  },
});
