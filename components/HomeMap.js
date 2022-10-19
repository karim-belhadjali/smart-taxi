import React from "react";
import MapView, { Marker } from "react-native-maps";
import tw from "twrnc";
import NavFavourites from "../components/NavFavourites";
const HomeMap = ({ currentLocation, handleStep, currentLocationActive }) => {
  return (
    <>
      <MapView
        initialRegion={{
          latitude: currentLocation.location.lat,
          longitude: currentLocation.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="mutedStandard"
        provider="google"
        style={tw`w-screen h-[60%]`}
        zoomEnabled={true}
      >
        <Marker
          coordinate={{
            latitude: currentLocation.location.lat,
            longitude: currentLocation.location.lng,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005,
          }}
          title="current"
          description={currentLocation.description}
          identifier="current"
        />
      </MapView>

      <NavFavourites onSearch={() => handleStep("search")} />
      {/* <TouchableOpacity
        style={tw`rounded-full absolute w-[11] h-[11] flex justify-center items-center bottom-[42%] right-[5%] bg-[#fff]`}
        // onPress={() => setcurrentLocationActive(!currentLocationActive)}
      >
        <LocationSvg currentLocationActive={currentLocationActive} />
      </TouchableOpacity> */}
    </>
  );
};

export default HomeMap;