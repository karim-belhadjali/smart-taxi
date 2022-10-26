import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import App from "../screens/PermissionScreen";
import MapHomeScreen from "../screens/MapHomeScreen";
import CompleteProfileScreen from "../screens/CompleteProfileScreen";
import AboutScreen from "../screens/AboutScreen";
import MainDrawer from "./MainDrawer";
import ProfileScreen from "../screens/ProfileScreen";

const Stack = createNativeStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator style={{ flex: 1 }} initialRouteName="PermissionScreen">
      <Stack.Screen
        name="HomeScreen"
        component={MapHomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="PermissionScreen"
        component={App}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CompleteProfileScreen"
        component={CompleteProfileScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AboutScreen"
        component={AboutScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="MainDrawer"
        component={MainDrawer}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
    </Stack.Navigator>
  );
};
export default HomeNavigation;
