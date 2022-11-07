import React from "react";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import tw from "twrnc";
import UserLocationSvg from "../assets/svg/UserLocationSvg";
import NavFavourites from "../components/NavFavourites";
import { StyleSheet, Dimensions, StatusBar } from "react-native";

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
        style={styles.map}
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
        >
          <UserLocationSvg />
        </Marker>
      </MapView>

      <NavFavourites onSearch={() => handleStep("search")} />
    </>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    height: "100%",
    paddingTop: StatusBar.currentHeight,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "60%",
  },
});
