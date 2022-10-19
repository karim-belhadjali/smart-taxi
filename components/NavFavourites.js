import { FlatList, Text, TouchableOpacity, View } from "react-native";

import tw from "twrnc";
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import React from "react";

import { useDispatch } from "react-redux";
import { setDestination } from "../app/slices/navigationSlice";

const NavFavourites = ({ onSearch, recents }) => {
  const dispatch = useDispatch();

  return (
    <View
      style={[
        tw`bg-[#FFFFFF] w-screen h-[40%] rounded-t-2xl p-4 flex items-center`,
        {
          shadowRadius: 100,
          shadowOpacity: 0.8,
          shadowColor: "#171717",
          shadowOffset: {
            width: -11,
            height: -50,
          },
          elevation: 50,
        },
      ]}
    >
      <View style={tw`flex w-90% mt-5 mb-1 items-start`}>
        <Text style={{ fontFamily: "Poppins-Light" }}>
          Heureux de vous voir
        </Text>
        <Text style={{ fontFamily: "Poppins-SemiBold", fontSize: 20 }}>
          Où aller vous ?
        </Text>
      </View>
      <TouchableOpacity
        style={[
          tw`rounded-2xl w-92% bg-white h-13 flex flex-row items-center px-4`,
          { elevation: 5 },
        ]}
        onPress={onSearch}
      >
        <AntDesign style={tw` pr-3`} name="search1" size={20} color="#F74C00" />
        <Text
          style={[tw`flex-1 mt-1 opacity-50`, { fontFamily: "Poppins-Light" }]}
        >
          Recherche de la destination
        </Text>
      </TouchableOpacity>
      <View style={[tw`flex justify-center w-[90%] items-center mt-2 px-2`]}>
        <FlatList
          data={favoritesData}
          ItemSeparatorComponent={() => (
            <View
              style={[
                tw`bg-gray-200`,
                {
                  height: 1,
                },
              ]}
            />
          )}
          renderItem={(item) => {
            return (
              <TouchableOpacity
                style={tw`flex flex-row my-2 w-screen`}
                onPress={() =>
                  dispatch(
                    setDestination({
                      location: item.item.location,
                      description: item.item.description,
                    })
                  )
                }
              >
                <EvilIcons
                  style={tw` pr-3`}
                  name="clock"
                  size={40}
                  color="rgba(171, 171, 171, 0.55)"
                />
                <Text
                  style={[
                    tw`flex-1 mt-1 opacity-60`,
                    { fontFamily: "Poppins-Light", fontSize: 18 },
                  ]}
                >
                  {item.item.description}
                </Text>
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </View>
    </View>
  );
};

export default NavFavourites;

const favoritesData = [
  {
    name: "Home",
    location: { lat: 20.4945, lng: -0.4118 },
    description: "Ezzahra",
  },
  {
    name: "Work",
    location: { lat: 5.5497, lng: -0.3522 },
    description: "Rades",
  },
];
