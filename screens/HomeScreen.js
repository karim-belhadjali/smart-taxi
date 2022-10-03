import React from "react";
import { StyleSheet, Image, View, StatusBar, SafeAreaView } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";

import { useDispatch } from "react-redux";
import { setDestination, setOrigin } from "../app/slices/navigationSlice";
import { useNavigation } from "@react-navigation/native";
import { Input } from "react-native-elements";

import tw from "twrnc";

import NavOptions from "../components/NavOptions";
import NavFavourites from "../components/NavFavourites";

const HomeScreen = () => {
  const h = StatusBar.currentHeight;
  const navigation = useNavigation();
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={tw`android:pt-[${h}]`}>
      <View>
        <View style={tw`p-5`}>
          <Image
            style={{ width: 100, height: 100, resizeMode: "contain" }}
            source={{
              uri: "https://links.papareact.com/gzs",
            }}
          />
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
            textInputProps={{
              InputComp: Input,
              errorStyle: { color: "red" },
            }}
            isRowScrollable={true}
            onPress={(data, details = null) => {
              dispatch(
                setOrigin({
                  location: details?.geometry.location,
                  description: data.description,
                })
              );
              dispatch(setDestination(null));

              //navigation.navigate("MapScreen");
            }}
          />
          <NavOptions />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "transparent",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingBottom: 0,
  },
});
