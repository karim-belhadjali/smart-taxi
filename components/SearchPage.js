import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
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
import { moderateScale } from "../Metrics";
const GOOGLE_MAPS_API_KEY = "AIzaSyCZ_g1IKyfqx-UNjhGKnIbZKPF9rAzVJwg";

const SearchPage = ({
  handleback,
  destinationText,
  handledestination,
  originText,
  handleOrigin,
  handleSearch,
  searching,
}) => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const currentLocation = useSelector(selectCurrentLocation);
  const { width, height } = Dimensions.get("window");
  const [mapsBorder, setmapsBorder] = useState("transparent");

  useEffect(() => {
    dispatch(
      setOrigin({
        location: currentLocation.location,
        description: currentLocation.description,
      })
    );
    handleOrigin(currentLocation);
  }, []);

  return (
    <>
      <SafeAreaView style={tw`h-screen bg-white`}>
        <KeyboardAvoidingView
          style={[tw`flex flex-1 items-center w-screen h-full bg-white `]}
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
                  fontSize: width * 0.055,
                },
              ]}
              numberOfLines={1}
              adjustsFontSizeToFit={true}
              allowFontScaling={false}
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
                <View style={[tw``, toInputBoxStyles.container]}>
                  <Text
                    style={[
                      tw`ml-2 opacity-50 text-[#000000]`,
                      {
                        fontSize: width * 0.037,
                        fontFamily: "Poppins-SemiBold",
                        color: "#000000",
                      },
                    ]}
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    allowFontScaling={false}
                  >
                    Votre emplacement
                  </Text>
                </View>
                <GooglePlacesAutocomplete
                  placeholder="Où voulez-vous aller?"
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
                    onFocus: () => {
                      setmapsBorder("rgba(247, 76, 0, 1)");
                    },
                    onBlur: () => {
                      setmapsBorder("transparent");
                    },
                  }}
                  styles={{
                    container: {
                      backgroundColor: "rgba(202, 200, 200, 0.3)",
                      flex: 0,
                      borderRadius: 5,
                      marginTop: 5,
                      borderColor: mapsBorder,
                      borderWidth: 1.5,
                    },
                    textInput: {
                      backgroundColor: "transparent",
                      paddingTop: 10,
                      height: 35,
                      opacity: 1,
                      fontSize: Dimensions.get("window").width * 0.04,
                      color: "#000000",
                    },
                    textInputContainer: {
                      paddingBottom: 0,
                    },
                  }}
                  onPress={(data, details = null) => {
                    dispatch(
                      setDestination({
                        location: details?.geometry.location,
                        description: data.description,
                      })
                    );
                    handledestination(data.description);
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
                    {
                      fontFamily: "Poppins-Regular",
                      fontSize: width * 0.04,
                    },
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  allowFontScaling={false}
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
              <View
                style={tw`flex flex-row w-full justify-start items-center `}
              >
                <Entypo
                  name="suitcase"
                  style={tw`mt-2 ml-5 opacity-30`}
                  size={20}
                  color={"#4F4F4F"}
                />
                <Text
                  style={[
                    tw`opacity-30 mx-8 mt-3`,
                    {
                      fontFamily: "Poppins-Regular",
                      fontSize: width * 0.04,
                    },
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  allowFontScaling={false}
                >
                  Ajouter Travail
                </Text>
              </View>
              <View
                key={"separator"}
                style={tw`bg-[#000000] opacity-10 h-[.35] mt-1 w-[90%]`}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
        {destination && (
          <TouchableOpacity
            style={[
              tw`absolute w-screen flex items-center justify-center bottom-[${
                Dimensions.get("window").height < 720 ? 8 : 2
              }] ios:bottom-10`,
            ]}
            onPress={() => {
              handleSearch();
            }}
          >
            <View
              key={"separator"}
              style={tw`bg-[#000000] opacity-10 h-[.35] mb-3 w-screen`}
            />

            <View style={tw`flex flex-row justify-center items-center`}>
              <AntDesign
                style={tw` pr-3`}
                name="search1"
                size={20}
                color="#000000"
              />

              <Text
                style={[
                  tw`mt-1`,
                  {
                    fontFamily: "Poppins-Regular",
                    fontSize: width * 0.05,
                  },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
                allowFontScaling={false}
              >
                Rechercher
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </SafeAreaView>
      {searching && (
        <View style={tw`h-screen w-screen`}>
          <View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: "#000000",
                justifyContent: "center",
                opacity: 0.6,
              },
              tw`h-screen flex justify-center items-center`,
            ]}
          >
            <ActivityIndicator size={80} color="#F74C00" />
          </View>
        </View>
      )}
    </>
  );
};

export default SearchPage;

const styles = StyleSheet.create({});

const toInputBoxStyle2 = StyleSheet.create({
  container: {
    backgroundColor: "#CAC8C8",
    flex: 0,
    opacity: 0.8,
    borderRadius: 5,
    marginTop: 5,
    borderColor: "",
    borderWidth: 1,
  },
  textInput: {
    backgroundColor: "transparent",
    paddingTop: 10,
    height: 35,
    opacity: 1,
    fontSize: Dimensions.get("window").width * 0.04,
  },
  textInputContainer: {
    paddingBottom: 0,
  },
});
const toInputBoxStyles = StyleSheet.create({
  container: {
    // backgroundColor: "#CAC8C8",
    flex: 0,
    // opacity: 0.5,
    borderRadius: 5,
    fontSize: Dimensions.get("window").width * 0.04,
    paddingTop: 10,
    height: 35,
  },
  textInput: {
    fontSize: Dimensions.get("window").width * 0.04,
    paddingTop: 10,
    height: 35,
    opacity: 1,
  },
  textInputContainer: {
    paddingBottom: 0,
  },
});
