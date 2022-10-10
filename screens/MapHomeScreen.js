import React, { useEffect, useRef, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Button,
  ActivityIndicator,
} from "react-native";
import {
  selectDestination,
  selectOrigin,
  selectCurrentLocation,
  selectCurrentUser,
  selectDriverLocation,
} from "../app/slices/navigationSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  setDestination,
  setOrigin,
  setTravelTimeInfo,
  setDriverLocation,
} from "../app/slices/navigationSlice";

import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import MapViewDirections from "react-native-maps-directions";

import { functions, httpsCallable, db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";

import tw from "twrnc";

const MapHomeScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const currentLocation = useSelector(selectCurrentLocation);
  const driverLocation = useSelector(selectDriverLocation);
  const user = useSelector(selectCurrentUser);
  const mapRef = useRef(null);

  const [destinationDispaly, setdestinationDispaly] = useState(false);
  const [destinationText, setdestinationText] = useState("");
  const [searching, setsearching] = useState(false);
  const [displaySearchBar, setdisplaySearchBar] = useState(true);
  const [requestSent, setrequestSent] = useState(false);
  const [requestAccepted, setrequestAccepted] = useState(false);
  const [driverInfo, setdriverInfo] = useState("");
  useEffect(() => {
    if (!origin || !destination) return;

    setTimeout(() => {
      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 150, right: 100, bottom: 50, left: 100 },
        duration: 1000,
      });
    }, 300);
  }, [origin, destination]);

  useEffect(() => {
    if (!origin || !destination) return;
    setdisplaySearchBar(false);
    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  const handleSearch = () => {
    setsearching(true);
    const createRideRequest = httpsCallable(functions, "createRideRequest");
    createRideRequest({
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      origin: origin,
      destination: destination,
    })
      .then((e) => {
        setrequestSent(true);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    //if (!requestSent) return;
    const ref = onSnapshot(doc(db, "Ride Requests", user.uid), (doc) => {
      if (doc?.data()?.accepted === true) {
        dispatch(setDriverLocation(doc?.data()?.driverLocation));
        setsearching(false);
        setrequestAccepted(true);
        setdriverInfo({
          driverName: doc.data().driverId,
          location: doc.data().driverLocation.description,
        });
      }
    });
    return () => ref();
  }, [requestSent]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View
        style={[
          tw`absolute top-15 bg-transparent left-4 z-50 flex flex-row px-3`,
        ]}
      >
        <TouchableOpacity
          onPress={() => setdisplaySearchBar(!displaySearchBar)}
          style={tw`bg-gray-50 p-3 mt-1 w-12 h-12 rounded-full shadow-lg mr-3`}
        >
          <Icon name="menu" />
        </TouchableOpacity>
        {displaySearchBar && (
          <View style={tw`m-2 w-60`} focusable={true}>
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
              textInputProps={{
                onChange: () => setdestinationDispaly(false),
              }}
              isRowScrollable={true}
              onPress={(data, details = null) => {
                dispatch(
                  setOrigin({
                    location: details?.geometry.location,
                    description: data.description,
                  })
                );
                mapRef.current.animateToRegion(
                  {
                    latitude: details?.geometry.location.lat,
                    longitude: details?.geometry.location.lng,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  },
                  1000
                );
                setdestinationDispaly(true);
              }}
            />

            {destinationDispaly && (
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
                    setdestinationText(e.target.value);
                  },
                }}
                onPress={(data, details = null) => {
                  dispatch(
                    setDestination({
                      location: details?.geometry.location,
                      description: data.description,
                    })
                  );
                  setdestinationText(data.description);
                  // navigation.navigate("RideOptionsCard");
                }}
              />
            )}
          </View>
        )}
      </View>

      <MapView
        ref={mapRef}
        initialRegion={{
          latitude: currentLocation.location.lat,
          longitude: currentLocation.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        mapType="mutedStandard"
        provider="google"
        style={tw`flex-1`}
      >
        {origin && destination && (
          <MapViewDirections
            origin={`${origin.location.lat},${origin.location.lng}`}
            destination={destination.description}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="blue"
            lineDashPattern={[0]}
          />
        )}
        {origin && driverLocation && (
          <MapViewDirections
            origin={`${origin.location.lat},${origin.location.lng}`}
            destination={`${driverLocation.location.lat},${driverLocation.location.lng}`}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={3}
            strokeColor="red"
            lineDashPattern={[0]}
          />
        )}
        {!origin && (
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
        )}
        {driverLocation && (
          <Marker
            coordinate={{
              latitude: driverLocation.location.lat,
              longitude: driverLocation.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            title="current"
            description={driverLocation.description}
            identifier="current"
          >
            <Icon size={50} name="location" type="evilicon" color="#8B8000" />
          </Marker>
        )}
        {origin?.location && (
          <Marker
            coordinate={{
              latitude: origin.location.lat,
              longitude: origin.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            title="Origin"
            description={origin.description}
            identifier="origin"
          />
        )}

        {destination?.location && (
          <Marker
            coordinate={{
              latitude: destination.location.lat,
              longitude: destination.location.lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
            title="Destination"
            description={destination.description}
            identifier="destination"
          />
        )}
      </MapView>
      {origin && destination && (
        <Button title="Search For a ride" onPress={handleSearch} />
      )}
      {searching && (
        <View
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator size={100} />
        </View>
      )}
      {requestAccepted && (
        <TouchableOpacity
          style={{
            position: "absolute",
            height: "100%",
            width: "100%",
            backgroundColor: "black",
            opacity: 0.5,
            zIndex: 100,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "black",
          }}
          onPress={() => setrequestAccepted(false)}
        >
          <Text>{driverInfo?.driverName}</Text>
          <Text>{driverInfo?.location}</Text>
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
};

export default MapHomeScreen;

const styles = StyleSheet.create({});
