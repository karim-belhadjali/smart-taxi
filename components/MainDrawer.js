import {
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";
import MenuItem from "./MenuItem";
import { useNavigation } from "@react-navigation/core";
import { selectCurrentUser } from "../app/slices/navigationSlice";
import { useSelector } from "react-redux";

const MainDrawer = () => {
  const navigation = useNavigation();
  const user = useSelector(selectCurrentUser);
  return (
    <View
      style={tw`flex flex-row w-screen h-full pt-[${StatusBar.currentHeight}]`}
    >
      <View style={tw`bg-[#FFFFFF]  w-[75%] flex items-center`}>
        <View style={tw`w-[90%] flex flex-row mt-5`}>
          <View
            style={tw`bg-[#431879] rounded-full w-12 h-12 flex justify-center items-center`}
          >
            <AntDesign style={tw``} name={"user"} size={25} color={"#ffff"} />
          </View>
          <Text
            style={[
              tw`mt-3 mx-3`,
              { fontFamily: "Poppins-Bold", fontSize: 20 },
            ]}
            numberOfLines={1}
          >
            {user?.fullName}
          </Text>
        </View>
        <View style={tw`bg-[#000000] opacity-10 h-[.45] w-full mt-5`} />
        <View style={tw`mt-5 w-[90%]`}>
          <MenuItem
            iconName={"hearto"}
            text="Profile"
            onClick={() => navigation.navigate("Profile")}
          />
          <View style={tw`opacity-30`}>
            <MenuItem
              iconName={"clockcircleo"}
              text="Historique"
              onClick={() => console.log("disabled")}
            />
          </View>
          <MenuItem
            iconName={"infocirlceo"}
            text="À propos"
            onClick={() => {
              navigation.navigate("AboutScreen");
            }}
          />
        </View>
        <Text
          style={[
            tw`absolute bottom-2 left-10`,
            { fontFamily: "Poppins-SemiBold", fontSize: 15, opacity: 0.5 },
          ]}
        >
          Beem 2022 - Version 1.0
        </Text>
      </View>
      <TouchableOpacity
        style={tw`bg-[#000000] opacity-50 w-[25%]`}
        onPress={() => {
          navigation.navigate("HomeScreen");
          navigation.reset({
            index: 0,
            routes: [
              {
                name: "HomeScreen",
              },
            ],
          });
        }}
      />
    </View>
  );
};

export default MainDrawer;

const styles = StyleSheet.create({});
