import React from "react";
import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";

import { Icon } from "react-native-elements";

import { useSelector } from "react-redux";
import { selectOrigin } from "../app/slices/navigationSlice";
import { useNavigation } from "@react-navigation/native";

import tw from "twrnc";

export const data = [
  {
    id: "123",
    title: "Get a ride",
    image: "https://links.papareact.com/3pn",
    screen: "MapScreen",
  },
  {
    id: "456",
    title: "Order Food",
    image: "https://links.papareact.com/28w",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const origin = useSelector(selectOrigin);
  const navigation = useNavigation();
  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!origin}
          onPress={() => navigation.navigate(item.screen)}
          style={tw`pr-2 pl-6 pt-4 pb-8 bg-gray-200 mr-2 mb-5 w-40 rounded-md`}
        >
          <View style={tw.style(!origin && "opacity-20")}>
            <Image
              source={{ uri: item.image }}
              style={{ width: 120, height: 120, resizeMode: "contain" }}
            />
            <Text style={tw`mt-2 text-lg font-bold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-6`}
              type="antdesign"
              color="white"
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
