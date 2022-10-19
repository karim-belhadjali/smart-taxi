import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { GOOGLE_MAPS_API_KEY } from "@env";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { setDestination } from "../app/slices/navigationSlice";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import NavFavourites from "./NavFavourites";

const NavigateCard = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <SafeAreaView style={tw`bg-white flex-1 justify-between`}>
      <View style={tw`flex-shrink`}>
        <Text style={tw`text-center pb-5 text-lg`}>Good morning</Text>
        <View style={tw`border-t border-gray-200 `}>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            debounce={400}
            fetchDetails={true}
            enablePoweredByContainer={false}
            nearbyPlacesAPI="GooglePlacesSearch"
            styles={toInputBoxStyles}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
              components: "country:tn",
            }}
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
        <View style={tw`px-5`}>
          <NavFavourites />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "#DDDDDF",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 0,
  },
});
