import React, { useState, useEffect } from "react";
import {
  Platform,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  Button,
  Dimensions,
  Image,
  StatusBar,
} from "react-native";

import * as Location from "expo-location";
import * as Network from "expo-network";
import * as SplashScreen from "expo-splash-screen";
import { GOOGLE_MAPS_API_KEY } from "@env";

import {
  selectCurrentLocation,
  setCurrentLocation,
} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { useFonts } from "expo-font";
import LogoSvg from "../assets/svg/LogoSvg";

export default function App() {
  const navigation = useNavigation();

  const [reload, setreload] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const dispatch = useDispatch();
  useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins/Poppins-Black.ttf"),
    "Poppins-Italic": require("../assets/fonts/Poppins/Poppins-Italic.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins/Poppins-Light.ttf"),
  });

  useEffect(() => {
    (async () => {
      let { isConnected, isInternetReachable } =
        await Network.getNetworkStateAsync();
      if (isConnected && isInternetReachable) {
        let { status } = await Location.requestBackgroundPermissionsAsync();
        if (status !== "granted") {
          setErrorMsg("Permission to access location was denied");
          return;
        }

        await Location.getCurrentPositionAsync({})
          .then(async (location) => {
            const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
            const response = await fetch(url);
            const data = await response.json();
            dispatch(
              setCurrentLocation({
                location: {
                  lat: location.coords.latitude,
                  lng: location.coords.longitude,
                },
                description: data.results[0]?.formatted_address,
              })
            );
            setErrorMsg(null);
            navigation.navigate("LoginScreen");
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: "LoginScreen",
                },
              ],
            });
          })
          .catch((e) => {
            setErrorMsg(e.message);
          });
      } else {
        setErrorMsg("No Internet Connection is detected please try again");
      }
    })();
  }, [reload]);

  const handleTryAgain = () => {
    setreload(!reload);
  };
  return (
    <View style={stylesheet.styleRectangle1}>
      <View
        style={tw`flex justify-center items-center overflow-visible h-full`}
      >
        <LogoSvg style={tw`justify-center items-center `} />
      </View>
    </View>
  );
}

const stylesheet = StyleSheet.create({
  styleRectangle1: {
    position: "absolute",
    left: 0,
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height + StatusBar.currentHeight,
    backgroundColor: "#431879",
  },
});
