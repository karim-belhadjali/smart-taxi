import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import CarSvg from "../../assets/svg/CarSvg";
import { moderateScale } from "../../Metrics";

const ConfirmRide = ({ rideInfo, onCancel, onConfirm }) => {
  const { width, height } = Dimensions.get("window");

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
          tw`mt-1 ml-5 w-90`,
          {
            fontFamily: "Poppins-Regular",
            fontSize: width * 0.04,
          },
        ]}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
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
            style={[
              tw`mt-1`,
              {
                fontFamily: "Poppins-SemiBold",
                fontSize: width * 0.05,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            {rideInfo?.driverName}
          </Text>
          <Text
            style={[
              tw`mt-1`,
              {
                fontFamily: "Poppins-Light",
                fontSize: width * 0.03,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            Arrive dans {rideInfo?.time}
          </Text>
          {!isNaN(rideInfo?.price) && (
            <Text
              style={[
                tw`mt-1`,
                {
                  fontFamily: "Poppins-Bold",
                  fontSize: width * 0.05,
                },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              allowFontScaling={false}
            >
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
          <Text
            style={styles.btnAnnuler}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            Annuler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`rounded-full bg-[#431879] w-[51%] border-[#431879]  p-4 flex justify-center items-center`}
          onPress={onConfirm}
        >
          <Text
            style={styles.btn}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            Confirmer
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ConfirmRide;

const styles = StyleSheet.create({
  btn: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Dimensions.get("window").width * 0.04,
    color: "#fff",
  },
  btnAnnuler: {
    fontFamily: "Poppins-SemiBold",
    fontSize: Dimensions.get("window").width * 0.04,
    color: "#431879",
  },
});
