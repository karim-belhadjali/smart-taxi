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
import AntDesign from "react-native-vector-icons/AntDesign";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import MapView, { Marker } from "react-native-maps";
import { Icon } from "react-native-elements";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapViewDirections from "react-native-maps-directions";

import { functions, httpsCallable, db } from "../firebase";
import {
  query,
  onSnapshot,
  collection,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import tw from "twrnc";
const GOOGLE_MAPS_API_KEY = "AIzaSyCZ_g1IKyfqx-UNjhGKnIbZKPF9rAzVJwg";

import Svg, { Path } from "react-native-svg";
import NavFavourites from "../components/NavFavourites";

const MapHomeScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const currentLocation = useSelector(selectCurrentLocation);
  const driverLocation = useSelector(selectDriverLocation);
  const user = useSelector(selectCurrentUser);
  const mapRef = useRef(null);

  const [currentLocationActive, setcurrentLocationActive] = useState(true);
  const [destinationDispaly, setdestinationDispaly] = useState(false);
  const [destinationText, setdestinationText] = useState("");
  const [searching, setsearching] = useState(false);
  const [displaySearchBar, setdisplaySearchBar] = useState(true);
  const [requestSent, setrequestSent] = useState(false);
  const [requestAccepted, setrequestAccepted] = useState(false);
  const [occupied, setoccupied] = useState(false);
  const [driverInfo, setdriverInfo] = useState("");
  const [currentDoc, setcurrentDoc] = useState(undefined);

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
    setTimeout(() => {
      mapRef?.current?.fitToSuppliedMarkers(
        ["origin", "destination", "driver"],
        {
          edgePadding: { top: 150, right: 100, bottom: 50, left: 100 },
          duration: 1000,
        }
      );
    }, 300);
  }, [driverLocation]);

  useEffect(() => {
    if (!origin || !destination) return;
    setdisplaySearchBar(false);
    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${origin.description}&destinations=${destination.description}&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      console.log(data.rows[0].elements[0]);
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
    if (!requestSent) return;
    const q = query(collection(db, "Current Ride"));
    const ref = onSnapshot(q, async (querySnapshot) => {
      console.log("in Listner");
      if (!occupied) {
        console.log("user not occupied");
        let rideStarted = false;
        for (let index = 0; index < querySnapshot?.docs?.length; index++) {
          if (rideStarted) break;
          const docu = querySnapshot.docs[index].data();
          if (docu.uid === user.uid) {
            rideStarted = true;
            dispatch(setDriverLocation(docu.driver.driverLocation));
            setoccupied(true);
            setsearching(false);
            setdriverInfo({
              driverName: docu.driver.driverId,
              location: docu.driver.driverLocation,
            });
            ref();
          }
        }
        return;
      }
    });
    return () => ref();
  }, [requestSent]);

  useEffect(() => {
    if (!occupied && ref) return () => ref();
    if (!occupied) return;
    const ref = onSnapshot(doc(db, "Current Ride", user.uid), (doc) => {
      if (doc.exists()) {
        if (!currentDoc) {
          setcurrentDoc(doc);
        }
        dispatch(setDriverLocation(doc?.data()?.driver.driverLocation));

        if (doc?.data()?.canceledByDriver) {
          setoccupied(false);
          setcurrentDoc(undefined);
          setrequestAccepted(false);
          setrequestSent(false);
          dispatch(setOrigin(undefined));
          dispatch(setDriverLocation(undefined));
          dispatch(setDestination(undefined));
          ref();
          return;
        }
        if (doc?.data()?.finished) {
          setoccupied(false);
          setcurrentDoc(undefined);
          setrequestAccepted(false);
          setrequestSent(false);
          dispatch(setOrigin(undefined));
          dispatch(setDriverLocation(undefined));
          dispatch(setDestination(undefined));
          ref();
        }
      } else {
        ref();
        return;
      }
    });
    return () => ref();
  }, [occupied]);

  const handleCancelClient = () => {
    setDoc(
      doc(db, "Current Ride", currentDoc.data().uid),
      { canceledByClient: true },
      { merge: true }
    ).then(() => {
      setDoc(
        doc(
          db,
          "Canceled Rides",
          currentDoc.data().uid +
            "_" +
            currentDoc.data().driver.driverId +
            "_" +
            Date.now()
        ),
        {
          userUid: user.uid,
          driverUid: currentDoc.data().driver.driverId,
          startTime: currentDoc.data().startedAt,
          FinishedTime: Date.now(),
          finalPrice: currentDoc.data().price,
          driverStartingLocation:
            currentDoc.data().driver.driverstartingLocation,
          pickUpPlace: currentDoc.data().client.origin,
          rideDestination: currentDoc.data().client.destination,
          canceledBy: "client",
        }
      ).then((e) => {
        setoccupied(false);
        setcurrentDoc(undefined);
        setrequestAccepted(false);
        setrequestSent(false);
        dispatch(setOrigin(undefined));
        dispatch(setDriverLocation(undefined));
        dispatch(setDestination(undefined));
        setTimeout(() => {
          deleteDoc(doc(db, "Current Ride", user.uid));
        }, 3000);
      });
    });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: StatusBar.currentHeight }}
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
        style={tw`w-screen h-[60%]`}
        zoomEnabled={true}
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
            title="Driver"
            description={driverLocation.description}
            identifier="driver"
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
      {occupied && <Button title="Cancel ride" onPress={handleCancelClient} />}
      <NavFavourites onSearch={() => console.log("search")} />
      <TouchableOpacity
        style={tw`rounded-full absolute w-[11] h-[11] flex justify-center items-center bottom-[42%] right-[5%] bg-[#fff]`}
      >
        <Svg
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <Path
            d="M25.1132 15.4C24.8016 17.8674 23.678 20.1609 21.9195 21.9195C20.1609 23.678 17.8674 24.8016 15.4 25.1132V28H12.6V25.1132C10.1326 24.8016 7.83907 23.678 6.08053 21.9195C4.32199 20.1609 3.19842 17.8674 2.8868 15.4H0V12.6H2.8868C3.19842 10.1326 4.32199 7.83907 6.08053 6.08053C7.83907 4.32199 10.1326 3.19842 12.6 2.8868V0H15.4V2.8868C17.8674 3.19842 20.1609 4.32199 21.9195 6.08053C23.678 7.83907 24.8016 10.1326 25.1132 12.6H28V15.4H25.1132ZM14 22.4C16.2278 22.4 18.3644 21.515 19.9397 19.9397C21.515 18.3644 22.4 16.2278 22.4 14C22.4 11.7722 21.515 9.63561 19.9397 8.0603C18.3644 6.485 16.2278 5.6 14 5.6C11.7722 5.6 9.63561 6.485 8.0603 8.0603C6.485 9.63561 5.6 11.7722 5.6 14C5.6 16.2278 6.485 18.3644 8.0603 19.9397C9.63561 21.515 11.7722 22.4 14 22.4ZM14 18.2C15.1139 18.2 16.1822 17.7575 16.9698 16.9698C17.7575 16.1822 18.2 15.1139 18.2 14C18.2 12.8861 17.7575 11.8178 16.9698 11.0302C16.1822 10.2425 15.1139 9.8 14 9.8C12.8861 9.8 11.8178 10.2425 11.0302 11.0302C10.2425 11.8178 9.8 12.8861 9.8 14C9.8 15.1139 10.2425 16.1822 11.0302 16.9698C11.8178 17.7575 12.8861 18.2 14 18.2Z"
            fill={`${currentLocationActive === true ? "#431879" : "#171717"}`}
            fill-opacity="0.71"
          />
        </Svg>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default MapHomeScreen;

const styles = StyleSheet.create({});
