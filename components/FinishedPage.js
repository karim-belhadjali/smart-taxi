import {
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

const FinishedPage = ({ OnFinish }) => {
  return (
    <View
      style={tw`flex justify-around items-center w-screen h-screen  pt-[${
        StatusBar.currentHeight + 50
      }]`}
    >
      <View key={"road"} style={tw`flex  `}>
        <View style={tw`flex flex-row items-center justify-center  `}>
          <View style={tw` mr-5`}>
            <DestinationSvgBig />
          </View>
          <View style={tw`flex `}>
            <Text
              style={[
                tw`mb-4`,
                { fontFamily: "Poppins-Regular", fontSize: 18 },
              ]}
            >
              Avenue Mohamed V , Tunis
            </Text>
            <Text
              style={[tw`mb-1`, { fontFamily: "Poppins-Bold", fontSize: 18 }]}
            >
              Lake of Tunis
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
        <Text style={[tw``, { fontFamily: "Poppins-Bold", fontSize: 30 }]}>
          10,560 TND
        </Text>
        <Text
          style={[
            tw`opacity-60`,
            { fontFamily: "Poppins-Light", fontSize: 15 },
          ]}
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
          style={[tw`pt-2`, { fontFamily: "Poppins-Regular", fontSize: 14 }]}
        >
          beem vous souhaite une Bonne route !
        </Text>
        <StarSvg />
      </View>

      <Text
        style={[
          tw`pt-2 opacity-60 underline`,
          { fontFamily: "Poppins-Light", fontSize: 20 },
        ]}
        onPress={OnFinish}
      >
        Retour à la page d’accueil
      </Text>
    </View>
  );
};

export default FinishedPage;

const styles = StyleSheet.create({});