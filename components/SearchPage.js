import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import DestinationSvg from "../assets/svg/destinationSvg";

import AntDesign from "react-native-vector-icons/AntDesign";
import Entypo from "react-native-vector-icons/Entypo";

import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setOrigin,
  selectOrigin,
  selectDestination,
  selectCurrentLocation,
  selectCurrentUser,
} from "../app/slices/navigationSlice";
import tw from "twrnc";
const GOOGLE_MAPS_API_KEY = "AIzaSyCZ_g1IKyfqx-UNjhGKnIbZKPF9rAzVJwg";

const SearchPage = ({
  handleback,
  destinationText,
  handledestination,
  originText,
  handleOrigin,
  handleSearch,
}) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);

  return (
    <KeyboardAvoidingView
      style={[
        tw`flex flex-1 items-center w-screen h-screen bg-[#E5E5E5]`,
        { zIndex: 100 },
      ]}
    >
      <View key={"titleView"} style={tw`flex flex-row w-[90%] mt-2`}>
        <TouchableOpacity style={styles.flesh} onPress={handleback}>
          <AntDesign
            name="arrowleft"
            style={tw`mt-[6] mr-5`}
            size={25}
            color={"#4F4F4F"}
          />
        </TouchableOpacity>
        <Text
          style={[
            tw` flex-1 ml-2`,
            {
              fontFamily: "Poppins-SemiBold",
              letterSpacing: 0.3,
              fontSize: 20,
            },
          ]}
        >
          Entrer votre destination
        </Text>
      </View>
      <View
        key={"restOfThePage"}
        style={[
          tw`absolute w-screen top-[6%] left-0 bg-transparent z-50  flex `,
        ]}
      >
        <View key={"searchView"} style={tw`flex flex-row items-center`}>
          <View style={tw`ml-5 mr-5`}>
            <DestinationSvg />
          </View>

          <View style={tw`m-2 bg-transparent w-[70%]`} focusable={true}>
            <GooglePlacesAutocomplete
              placeholder="From where?"
              autoFillOnNotFound={true}
              debounce={400}
              fetchDetails={true}
              enablePoweredByContainer={false}
              nearbyPlacesAPI="GooglePlacesSearch"
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
                components: "country:tn",
              }}
              styles={toInputBoxStyles}
              isRowScrollable={true}
              textInputProps={{
                value: originText,
                onChange: (e) => {
                  handleOrigin(e.target.value);
                },
              }}
              onPress={(data, details = null) => {
                dispatch(
                  setOrigin({
                    location: details?.geometry.location,
                    description: data.description,
                  })
                );
                handleOrigin(data.description);
              }}
            />

            <GooglePlacesAutocomplete
              placeholder="Where to?"
              debounce={400}
              fetchDetails={true}
              enablePoweredByContainer={false}
              nearbyPlacesAPI="GooglePlacesSearch"
              query={{
                key: GOOGLE_MAPS_API_KEY,
                language: "en",
                components: "country:tn",
              }}
              textInputProps={{
                value: destinationText,
                onChange: (e) => {
                  handledestination(e.target.value);
                },
              }}
              styles={toInputBoxStyle2}
              onPress={(data, details = null) => {
                dispatch(
                  setDestination({
                    location: details?.geometry.location,
                    description: data.description,
                  })
                );
                handledestination(data.description);
                // navigation.navigate("RideOptionsCard");
              }}
            />
          </View>
        </View>
        <View
          key={"separator"}
          style={tw`bg-[#000000] opacity-10 h-[.35] mt-1 w-screen`}
        />
        <View
          key={"add home"}
          style={tw`w-screen flex  justify-center items-center mt-1`}
        >
          <View style={tw`flex flex-row w-full justify-start items-center`}>
            <AntDesign
              name="home"
              style={tw`mt-2 ml-5 opacity-30`}
              size={20}
              color={"#4F4F4F"}
            />
            <Text
              style={[
                tw`opacity-30 mx-8 mt-3`,
                { fontFamily: "Poppins-Regular", fontSize: 15 },
              ]}
            >
              Ajouter Domicile
            </Text>
          </View>
          <View
            key={"separator"}
            style={tw`bg-[#000000] opacity-10 h-[.35] mt-1 w-[90%]`}
          />
        </View>
        <View
          key={"add work"}
          style={tw`w-screen flex  justify-center items-center mt-1`}
        >
          <View style={tw`flex flex-row w-full justify-start items-center `}>
            <Entypo
              name="suitcase"
              style={tw`mt-2 ml-5 opacity-30`}
              size={20}
              color={"#4F4F4F"}
            />
            <Text
              style={[
                tw`opacity-30 mx-8 mt-3`,
                { fontFamily: "Poppins-Regular", fontSize: 15 },
              ]}
            >
              Ajouter Travail
            </Text>
          </View>
          <View
            key={"separator"}
            style={tw`bg-[#000000] opacity-10 h-[.35] mt-1 w-[90%]`}
          />
        </View>

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
                style={tw`flex my-2 w-screen px-4`}
                onPress={() => {
                  handledestination(item.item.description);
                  dispatch(
                    setDestination({
                      location: item.item.location,
                      description: item.item.description,
                    })
                  );
                }}
              >
                <View style={tw`flex flex-row`}>
                  <Entypo
                    name="location-pin"
                    style={tw`mt-1  `}
                    size={25}
                    color={"#4F4F4F"}
                  />
                  <Text
                    style={[
                      tw`flex-1 mt-1 mx-8 opacity-60`,
                      { fontFamily: "Poppins-Light", fontSize: 18 },
                    ]}
                  >
                    {item.item.description}
                  </Text>
                </View>
                <View
                  key={"separator"}
                  style={tw`bg-[#000000] opacity-10 h-[.35] mt-1 `}
                />
              </TouchableOpacity>
            );
          }}
          keyExtractor={(item) => item.name}
        />
      </View>

      {/* {origin && destination && ( */}
      <TouchableOpacity
        style={tw`absolute w-screen flex items-center justify-center bottom-2`}
        onPress={() => {
          handleSearch();
        }}
      >
        <View
          key={"separator"}
          style={tw`bg-[#000000] opacity-10 h-[.35] mt-1 w-screen`}
        />
        <View style={tw`flex flex-row justify-center items-center`}>
          <AntDesign
            style={tw` pr-3`}
            name="search1"
            size={20}
            color="#000000"
          />

          <Text
            style={[tw`mt-1`, { fontFamily: "Poppins-Regular", fontSize: 18 }]}
          >
            Rechercher
          </Text>
        </View>
      </TouchableOpacity>
      {/* )} */}
    </KeyboardAvoidingView>
  );
};

export default SearchPage;

const styles = StyleSheet.create({});

const toInputBoxStyle2 = StyleSheet.create({
  container: {
    backgroundColor: "#CAC8C8",
    flex: 0,
    opacity: 0.5,
    borderRadius: 5,
    marginTop: 5,
  },
  textInput: {
    backgroundColor: "transparent",
    fontSize: 15,
    paddingTop: 10,
    height: 35,
    opacity: 1,
  },
  textInputContainer: {
    paddingBottom: 0,
  },
});
const toInputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "#CAC8C8",
    flex: 0,
    opacity: 0.5,
    borderRadius: 5,
  },
  textInput: {
    backgroundColor: "transparent",
    fontSize: 15,
    paddingTop: 10,
    height: 35,
    opacity: 1,
  },
  textInputContainer: {
    paddingBottom: 0,
  },
});

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
