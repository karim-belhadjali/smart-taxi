import React, { useCallback, useEffect } from "react";

import {
  StyleSheet,
  ScrollView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { Provider } from "react-redux";
import { store } from "./app/store";
import { useDeviceContext } from "twrnc";
import { useKeepAwake } from "expo-keep-awake";
import tw from "twrnc";

import HomeNavigation from "./components/HomeNavigation";
import * as Location from "expo-location";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

export default function App() {
  useDeviceContext(tw);
  useKeepAwake();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <HomeNavigation />
        </SafeAreaProvider>
      </NavigationContainer>
      <StatusBar style="dark" />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
