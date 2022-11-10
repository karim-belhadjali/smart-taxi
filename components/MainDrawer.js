import React, { useRef, useEffect } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
  Dimensions,
} from "react-native";
import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";
import MenuItem from "./MenuItem";
import { useNavigation } from "@react-navigation/core";
import { selectCurrentUser } from "../app/slices/navigationSlice";
import { useSelector } from "react-redux";
import { moderateScale } from "../Metrics";

const MainDrawer = () => {
  const navigation = useNavigation();
  const user = useSelector(selectCurrentUser);
  const screenWidth = Dimensions.get("window").width;
  const screenHieght = Dimensions.get("window").height;

  const leftpos = useRef(new Animated.Value(-screenWidth)).current;
  useEffect(() => {
    Animated.timing(leftpos, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, []);
  return (
    <SafeAreaView
      style={[
        tw`h-screen bg-white android:pt-[${StatusBar.currentHeight}]`,
        StyleSheet.absoluteFill,
      ]}
    >
      <Animated.View
        style={[
          tw`flex flex-row w-screen h-full`,
          StyleSheet.absoluteFill,
          { left: leftpos },
        ]}
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
                { fontFamily: "Poppins-Bold", fontSize: screenWidth * 0.05 },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit
              allowFontScaling={false}
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
                navigation.navigate("À propos");
              }}
            />
          </View>
          <Text
            style={[
              tw`absolute bottom-2 left-10`,
              {
                fontFamily: "Poppins-SemiBold",
                fontSize: moderateScale(15),
                opacity: 0.5,
              },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            Beem 2022 - Version 1.0.0
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
      </Animated.View>
    </SafeAreaView>
  );
};

export default MainDrawer;

const styles = StyleSheet.create({});
