import React, { useEffect, useRef, useState } from "react";
import {
  View,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
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
  selectTravelTimeInfo,
} from "../app/slices/navigationSlice";
import Entypo from "react-native-vector-icons/Entypo";
import EvilIcons from "react-native-vector-icons/EvilIcons";

import MapView, { Marker } from "react-native-maps";

import MapViewDirections from "react-native-maps-directions";

import { db } from "../firebase";
import { onSnapshot, doc, setDoc, deleteDoc } from "firebase/firestore";

import tw from "twrnc";

const GOOGLE_MAPS_API_KEY = "AIzaSyCZ_g1IKyfqx-UNjhGKnIbZKPF9rAzVJwg";

import SearchPage from "../components/SearchPage";
import HomeMap from "../components/HomeMap";
import SearchRide from "../components/Rides/SearchRide";
import ConfirmRide from "../components/Rides/ConfirmRide";
import WaitingRide from "../components/Rides/WaitingRide";
import OngoingRide from "../components/Rides/OngoingRide";
import FinishedPage from "../components/FinishedPage";
import { useNavigation } from "@react-navigation/core";

const MapHomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const destination = useSelector(selectDestination);
  const currentUser = useSelector(selectCurrentUser);
  const currentLocation = useSelector(selectCurrentLocation);
  const travelTimeInfo = useSelector(selectTravelTimeInfo);
  const driverLocation = useSelector(selectDriverLocation);
  const user = useSelector(selectCurrentUser);
  const mapRef = useRef(null);

  const [requestDriverInfo, setrequestDriverInfo] = useState(null);
  const [currentRequest, setcurrentRequest] = useState(null);
  const [price, setprice] = useState(0);

  const [currentRide, setcurrentRide] = useState(null);

  const [currentLocationActive, setcurrentLocationActive] = useState(true);
  const [destinationText, setdestinationText] = useState("");
  const [originText, setoriginText] = useState();
  const [searching, setsearching] = useState(false);
  const [currentStep, setcurrentStep] = useState("home");
  const [substep, setsubstep] = useState("search");
  const [mapHeight, setmapHeight] = useState("60%");
  const [displayMenu, setdisplayMenu] = useState("false");

  useEffect(() => {
    if (!origin || !destination || currentStep !== "confirm") return;
    if (!driverLocation) {
      setTimeout(() => {
        mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
          edgePadding: { top: 150, right: 100, bottom: 50, left: 100 },
          duration: 1000,
        });
      }, 300);
    }
  }, [origin, destination]);

  useEffect(() => {
    setTimeout(() => {
      mapRef?.current?.fitToSuppliedMarkers(["origin", "destination"], {
        edgePadding: { top: 150, right: 100, bottom: 50, left: 100 },
        duration: 1000,
      });
    }, 300);

    if (!origin || !destination || currentStep !== "confirm") return;
  }, [currentStep]);

  useEffect(() => {
    if (substep !== "search") {
      setmapHeight("65%");
    } else {
      setmapHeight("60%");
    }
  }, [substep]);

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
    const getTravelTime = async () => {
      const url = `https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&origins=${
        origin.location.lat + "," + origin.location.lng
      }&destinations=${
        destination.location.lat + "," + destination.location.lng
      }&key=${GOOGLE_MAPS_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      dispatch(setTravelTimeInfo(data.rows[0].elements[0]));
    };

    getTravelTime();
  }, [origin, destination, GOOGLE_MAPS_API_KEY]);

  useEffect(() => {
    setsearching(false);
  }, []);

  const handleSearch = () => {
    if (travelTimeInfo !== null && travelTimeInfo?.status !== "NOT_FOUND") {
      setsearching(true);
      let distance = parseFloat(travelTimeInfo.distance.text);
      let duration = travelTimeInfo.duration.text;
      setsubstep("search");
      setDoc(
        doc(db, "Ride Requests", currentUser?.phone),
        {
          driverAccepted: false,
          clientAccepted: false,
          user: user,
          origin: origin,
          destination: destination,
          clientDistance: distance,
          canceled: false,
          duration,
        },
        { merge: true }
      )
        .then(() => {
          setsearching(false);
          setcurrentStep("confirm");
          handleSearchForDriver(false);
        })
        .catch((err) => {});
    } else {
    }
  };

  const handleSearchForDriver = (del) => {
    if (!del) {
      const unsub = onSnapshot(
        doc(db, "Ride Requests", currentUser?.phone),
        async (current) => {
          if (current.exists()) {
            const request = current.data();
            if (request.driverAccepted && request.clientAccepted == false) {
              let prices = await calculatePrice(
                request.clientDistance,
                request.driverDistance
              );
              setprice(prices);
              setrequestDriverInfo({
                place: request?.origin?.description,
                driverName: request?.driverInfo?.name,
                time: request?.driverTime,
                price: prices,
              });
              setcurrentRequest(request);
              setsubstep("confirm");
              unsub();
            } else if (
              request.driverAccepted &&
              request.clientAccepted == true
            ) {
              unsub();
            }
          } else {
            unsub();
            setcurrentStep("home");
          }
        }
      );
    } else {
      deleteDoc(doc(db, "Ride Requests", currentUser?.phone));
      setcurrentStep("home");
      dispatch(setOrigin(null));
      dispatch(setDestination(null));
      setdestinationText("");
      setoriginText("");
    }
  };

  const handleConfirmCancelRequest = (confirm) => {
    if (confirm) {
      setDoc(
        doc(db, "Ride Requests", currentUser?.phone),
        {
          clientAccepted: true,
        },
        { merge: true }
      )
        .then(async () => {
          let newRide = {
            canceledByDriver: false,
            canceledByClient: false,
            driverArrived: false,
            driverTime: currentRequest.driverTime,
            duration: currentRequest.duration,
            user: user,
            origin: origin,
            destination: destination,
            driverInfo: currentRequest.driverInfo,
            price: price,
            clientDistance: currentRequest.clientDistance,
            canceled: false,
            driveStarted: false,
            finished: false,
          };
          dispatch(setDriverLocation(currentRequest?.driverInfo?.location));
          setDoc(doc(db, "Current Courses", currentUser?.phone), newRide, {
            merge: true,
          })
            .then(() => {
              setcurrentRide(newRide);
              setcurrentStep("confirm");
              setsubstep("waiting");
              setcurrentRequest(null);
              handleSearchForDriver(false);
              handleWaitForDriver(false);
            })
            .catch((err) => {});
        })
        .catch((err) => {});
    } else {
      setDoc(
        doc(db, "Ride Requests", currentUser?.phone),
        {
          canceled: true,
        },
        { merge: true }
      )
        .then(async () => {
          setrequestDriverInfo(null);
          setcurrentRequest(null);
          setcurrentStep("home");
          setsubstep("seach");
          dispatch(setDestination(null));
          dispatch(setOrigin(null));
          setdestinationText("");
          setoriginText("");
        })
        .catch((err) => {});
    }
  };

  const handleWaitForDriver = (del) => {
    const unsub = onSnapshot(
      doc(db, "Current Courses", currentUser?.phone),
      async (current) => {
        const request = current.data();

        if (!request.finished) {
          dispatch(setDriverLocation(request?.driverInfo?.location));
        }
        if (request.driverArrived && request.driveStarted === false) {
          setDoc(
            doc(db, "Current Courses", currentUser?.phone),
            { driveStarted: true },
            {
              merge: true,
            }
          )
            .then(() => {
              setcurrentRide(request);
              setsubstep("onGoing");
              dispatch(setOrigin(null));
            })
            .catch((err) => {});
        } else if (request.finished) {
          setcurrentStep("finished");
          setsubstep("search");
          dispatch(setDriverLocation(null));
          dispatch(setDestination(null));
          unsub();
        }
      }
    );
  };

  const calculatePrice = async (distanceClient, distanceDriver) => {
    var hour = new Date().getHours();
    let startcounter = 1.1;
    const nightyHours = [21, 22, 23, 0, 1, 2, 3, 4, 5];
    const busyHours = [7, 8, 17, 18];
    const lessBusyHours = [9, 10, 16, 19];
    let price = 0;

    price = (startcounter + parseFloat(distanceClient) * 1.1).toFixed(3);

    return price;
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, paddingTop: StatusBar.currentHeight }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      {currentStep !== "confirm" &&
        currentStep !== "finished" &&
        currentStep !== "search" &&
        searching === false && (
          <View
            style={[
              tw`absolute top-15 bg-transparent left-4 z-50 flex flex-row px-3`,
            ]}
          >
            <TouchableOpacity
              onPress={() => navigation.navigate("MainDrawer")}
              style={tw`bg-gray-50 p-3 mt-1 w-12 h-12 rounded-full shadow-lg mr-3`}
            >
              <Entypo name="menu" size={25} />
            </TouchableOpacity>
          </View>
        )}

      {currentStep == "home" && (
        <HomeMap
          handleStep={setcurrentStep}
          currentLocation={currentLocation}
          currentLocationActive={currentLocationActive}
        />
      )}
      {currentStep == "search" && (
        <SearchPage
          handleback={() => {
            setcurrentStep("home");
            dispatch(setOrigin(null));
            dispatch(setDestination(null));
            setdestinationText("");
            setoriginText("");
          }}
          handledestination={setdestinationText}
          destinationText={destinationText}
          originText={originText}
          handleOrigin={setoriginText}
          handleSearch={handleSearch}
          searching={searching}
        />
      )}
      {currentStep == "confirm" && (
        <>
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
            style={tw`w-screen h-[${mapHeight}]`}
            zoomEnabled={true}
          >
            {origin && destination && (
              <MapViewDirections
                origin={`${origin.location.lat},${origin.location.lng}`}
                destination={`${destination.location.lat},${destination.location.lng}`}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={3}
                strokeColor="#F74C00"
                lineDashPattern={[0]}
              />
            )}
            {origin && driverLocation && (
              <MapViewDirections
                origin={`${origin.location.lat},${origin.location.lng}`}
                destination={`${driverLocation.location.lat},${driverLocation.location.lng}`}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={5}
                strokeColor="#F74C00"
                lineDashPattern={[0]}
              />
            )}
            {!origin && driverLocation && (
              <MapViewDirections
                origin={`${driverLocation.location.lat},${driverLocation.location.lng}`}
                destination={`${destination.location.lat},${destination.location.lng}`}
                apikey={GOOGLE_MAPS_API_KEY}
                strokeWidth={5}
                strokeColor="red"
                lineDashPattern={[0]}
              />
            )}
            {!origin && !destination && (
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
                {/* <EvilIcons size={50} name="location" color="#8B8000" /> */}
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
          {substep === "search" && (
            <SearchRide
              onClick={() => {
                handleSearchForDriver(true);
              }}
            />
          )}
          {substep === "confirm" && (
            <ConfirmRide
              rideInfo={requestDriverInfo}
              onCancel={() => {
                handleConfirmCancelRequest(false);
              }}
              onConfirm={() => {
                handleConfirmCancelRequest(true);
                //setsubstep("waiting");
              }}
            />
          )}
          {substep === "waiting" && (
            <WaitingRide
              ride={currentRide}
              onCall={() => setsubstep("onGoing")}
            />
          )}
          {substep === "onGoing" && (
            <OngoingRide
              ride={currentRide}
              onNext={() => {
                setcurrentStep("finished");
                setsubstep("search");
              }}
            />
          )}
        </>
      )}
      {currentStep == "finished" && (
        <FinishedPage
          ride={currentRide}
          OnFinish={() => {
            setdestinationText("");
            setoriginText("");
            setcurrentStep("home");
            setsubstep("search");
            setcurrentRide(null);
          }}
        />
      )}
    </KeyboardAvoidingView>
  );
};

export default MapHomeScreen;
