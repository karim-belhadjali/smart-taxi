import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import { selectCurrentUser } from "../app/slices/navigationSlice";
import { useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { moderateScale } from "../Metrics";

const ProfileScreen = () => {
  const { width, height } = Dimensions.get("window");
  const navigation = useNavigation();

  const user = useSelector(selectCurrentUser);
  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("Client");
      navigation.navigate("LoginScreen");
      navigation.reset({
        index: 0,
        routes: [
          {
            name: "LoginScreen",
          },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={tw`bg-[#FFFFFF]  w-screen h-screen flex items-center px-5`}>
      <View style={tw`w-[90%] flex flex-row mt-5 items-center`}>
        <View
          style={tw`bg-[#979797] rounded-full w-12 h-12 flex justify-center items-center`}
        >
          <AntDesign style={tw``} name={"user"} size={25} color={"#ffff"} />
        </View>
        <View style={tw`flex `}>
          <Text
            style={[
              tw`mt-3 mx-3`,
              { fontFamily: "Poppins-Bold", fontSize: width * 0.06 },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            {user?.fullName}
          </Text>
        </View>
      </View>
      <View style={tw`bg-[#000000] opacity-10 h-[.45] w-full mt-5`} />

      {user?.email && (
        <View style={tw`flex flex-row w-[80%] mt-5 `}>
          <Entypo name={"email"} size={25} color={"#455154"} />
          <Text
            style={[
              tw`mt-[1] ml-5`,
              { fontFamily: "Poppins-SemiBold", fontSize: width * 0.04 },
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}
            allowFontScaling={false}
          >
            {user?.email}
          </Text>
        </View>
      )}
      {user?.phone && (
        <View style={tw`flex flex-row w-[80%] mt-5 `}>
          <AntDesign style={tw``} name={"phone"} size={25} color={"#455154"} />
          <View>
            <Text
              style={[
                tw`mt-[1] ml-5`,
                { fontFamily: "Poppins-SemiBold", fontSize: width * 0.04 },
              ]}
              adjustsFontSizeToFit
              numberOfLines={1}
              allowFontScaling={false}
            >
              (+216) {user?.phone}
            </Text>
          </View>
        </View>
      )}
      {user?.ville && user?.gouvernorat && (
        <View style={tw`flex flex-row w-[80%] mt-5 `}>
          <Entypo name={"location"} size={25} color={"#455154"} />
          <Text
            style={[
              tw`mt-[4] ml-5`,
              { fontFamily: "Poppins-SemiBold", fontSize: width * 0.04 },
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}
            allowFontScaling={false}
          >
            {user?.ville}, {user?.gouvernorat}
          </Text>
        </View>
      )}
      {user?.matricule && (
        <View style={tw`flex flex-row w-[80%] mt-5 `}>
          <AntDesign style={tw``} name={"car"} size={25} color={"#455154"} />

          <Text
            style={[
              tw`mt-[1] ml-5`,
              { fontFamily: "Poppins-SemiBold", fontSize: width * 0.04 },
            ]}
            adjustsFontSizeToFit
            numberOfLines={1}
            allowFontScaling={false}
          >
            {user?.matricule}
          </Text>
        </View>
      )}
      <View
        style={tw`absolute bottom-18 w-full flex justify-center ios:bottom-30`}
      >
        <View style={tw`bg-[#000000] opacity-10 h-[.45] w-full mt-5`} />
        <TouchableOpacity
          style={tw`flex flex-row ml-5 mt-5`}
          onPress={handleLogout}
        >
          <SimpleLineIcons
            style={tw``}
            name={"logout"}
            size={20}
            color={"#000000"}
          />

          <Text
            style={[
              tw`ml-5`,
              { fontFamily: "Poppins-SemiBold", fontSize: width * 0.043 },
            ]}
            numberOfLines={1}
            adjustsFontSizeToFit
            allowFontScaling={false}
          >
            Se déconnecter
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
