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
  Alert,
  ActivityIndicator,
} from "react-native";

import * as Location from "expo-location";
import * as Network from "expo-network";
const GOOGLE_MAPS_API_KEY = "";

import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  selectCurrentLocation,
  setCurrentLocation,
  setCurrentUser,
  setVersion,
} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import tw from "twrnc";
import { useFonts } from "expo-font";
import LogoSvg from "../assets/svg/LogoSvg";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

import AppLink from "react-native-app-link";

export default function App() {
  const navigation = useNavigation();

  const version = "1.1.0";

  const [reload, setreload] = useState(false);
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
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert(
            "Autorisation de localisation",
            "Cette application doit avoir accès à votre emplacement pour fonctionner, si le problème persiste, autorisez-le manuellement dans les paramètres",
            [
              {
                text: "Réessayer",
                onPress: () => {
                  setreload(!reload);
                },
              },
            ]
          );
          return;
        } else {
          await Location.getCurrentPositionAsync({})
            .then(async (location) => {
              const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.coords.latitude},${location.coords.longitude}&key=${GOOGLE_MAPS_API_KEY}`;
              const response = await fetch(url);
              const data = await response.json();
              let adress;
              if (data.results[0]?.formatted_address) {
                adress = data.results[0]?.formatted_address;
              } else {
                adress = "inconnu";
              }
              dispatch(
                setCurrentLocation({
                  location: {
                    lat: location.coords.latitude,
                    lng: location.coords.longitude,
                  },
                  description: adress,
                })
              );
              await getVersion();
            })
            .catch((e) => {
              setreload(!reload);
            });
        }
      } else {
        Alert.alert(
          "Connexion Internet non détectée",
          "Aucune connexion Internet n'est détectée, veuillez réessayer",
          [
            {
              text: "Réessayer",
              onPress: () => {
                setreload(!reload);
              },
            },
          ]
        );
      }
    })();
  }, [reload]);

  const getUser = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null) {
        let client = JSON.parse(value);
        dispatch(setCurrentUser(client));
        navigation.navigate("HomeScreen");
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "HomeScreen",
            },
          ],
        });
      } else {
        navigation.navigate("LoginScreen");
        navigation.reset({
          index: 0,
          routes: [
            {
              name: "LoginScreen",
            },
          ],
        });
      }
    } catch (e) {
      navigation.navigate("LoginScreen");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "LoginScreen",
          },
        ],
      });
    }
  };
  const getVersion = async () => {
    const docRef = doc(db, "versions", "kLJoU0er6GIOQoLVh9gU");
    const docSnap = await getDoc(docRef);
    if (docSnap?.exists()) {
      if (docSnap.data().name === version) {
        dispatch(setVersion(version));
        await getUser("Client");
      } else {
        Alert.alert(
          "Nouvelle mise à jour détectée",
          "Nouvelle mise à jour détectée, veuillez mettre à jour l'application vers la dernière version",
          [
            {
              text: "Mettre à jour",
              onPress: () => {
                AppLink.openInStore({
                  appName: "Beem Smart Taxi",
                  playStoreId: "com.beem.smarttaxi",
                });
              },
            },
            {
              text: "Réessayer",
              onPress: () => {
                setreload(!reload);
              },
            },
          ]
        );
      }
    } else {
      await getUser("Client");
    }
  };

  const handleTryAgain = () => {
    setreload(!reload);
  };
  return (
    <View style={stylesheet.styleRectangle1}>
      <View
        style={tw`flex justify-center items-center overflow-visible h-full`}
      >
        <LogoSvg style={tw`justify-center items-center `} />
        <ActivityIndicator size={"large"} style={tw`mt-10`} color="#7A3BFF" />
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
    backgroundColor: "#fff",
  },
});
