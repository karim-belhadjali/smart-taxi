import {
  Dimensions,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import DestinationSvgBig from "../assets/svg/destinationSvgBig";
import FinalCarSvg from "../assets/svg/FinalCarSvg";
import StarSvg from "../assets/svg/StarSvg";
import { moderateScale } from "../Metrics";

const FinishedPage = ({ ride, OnFinish }) => {
  const { width, height } = Dimensions.get("window");

  let place;
  if (ride?.origin.description === "inconnu") {
    place = "votre emplacement";
  } else {
    place = ride?.origin.description;
  }
  return (
    <View
      style={tw`flex justify-around items-center w-screen h-screen  pt-[${
        StatusBar.currentHeight + 10
      }]`}
    >
      <View key={"road"} style={tw`flex  `}>
        <View style={tw`flex flex-row items-center justify-center  `}>
          <View style={tw` mr-5`}>
            <DestinationSvgBig />
          </View>
          <View style={tw`flex w-70`}>
            <Text
              style={[
                tw`mb-4`,
                { fontFamily: "Poppins-Regular", fontSize: width * 0.05 },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              allowFontScaling={false}
            >
              {place}
            </Text>
            <Text
              style={[
                tw`mb-1`,
                { fontFamily: "Poppins-Bold", fontSize: width * 0.05 },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              allowFontScaling={false}
            >
              {ride?.destination.description}
            </Text>
          </View>
        </View>
        <View
          key={"separator"}
          style={tw`bg-[#000000] opacity-10 h-[.45] mt-10 w-screen`}
        />
      </View>

      <FinalCarSvg style={tw`mr-8`} />
      <View style={tw`flex items-center `}>
        <Text
          style={[tw``, { fontFamily: "Poppins-Bold", fontSize: width * 0.08 }]}
          numberOfLines={1}
          adjustsFontSizeToFit
          allowFontScaling={false}
        >
          {ride?.price} TND
        </Text>
        <Text
          style={[
            tw`opacity-60`,
            { fontFamily: "Poppins-Light", fontSize: width * 0.05 },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
          allowFontScaling={false}
        >
          Paiement Cash
        </Text>
      </View>
      <View
        key={"message"}
        style={tw`mt-4 w-screen flex flex-row justify-evenly items-center`}
      >
        <StarSvg style={tw`mt-1`} />
        <Text
          style={[
            tw`pt-2`,
            { fontFamily: "Poppins-Regular", fontSize: width * 0.04 },
          ]}
          numberOfLines={1}
          adjustsFontSizeToFit
          allowFontScaling={false}
        >
          beem vous souhaite une Bonne journée !
        </Text>
        <StarSvg />
      </View>

      <Text
        style={[
          tw`pt-2 opacity-60 underline`,
          { fontFamily: "Poppins-Light", fontSize: width * 0.05 },
        ]}
        onPress={OnFinish}
        numberOfLines={1}
        adjustsFontSizeToFit
        allowFontScaling={false}
      >
        Retour à la page d’accueil
      </Text>
    </View>
  );
};

export default FinishedPage;

const styles = StyleSheet.create({});
