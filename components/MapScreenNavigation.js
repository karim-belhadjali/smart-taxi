import NavigateCard from "./NavigateCard";
import React from "react";
import RideOptionsCard from "./RideOptionsCard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const MapScreenNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="NavigateCard">
      <Stack.Screen
        name="NavigateCard"
        component={NavigateCard}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RideOptionsCard"
        component={RideOptionsCard}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default MapScreenNavigation;
