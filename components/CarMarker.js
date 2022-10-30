// import React, { useEffect, useRef, useState } from "react";
// import {
//   Animated,
//   AnimatedRegion,
//   Marker,
//   MarkerAnimated,
// } from "react-native-maps";
// const LATITUDE_DELTA = 0.05;
// const LONGITUDE_DELTA = 0.05;
// //import { Icon } from "react-native-elements";

// export default function CarMarker(props) {
//   const [marker, setMarker] = useState(null);
//   const [coordinate, setCoordinate] = useState(
//     new AnimatedRegion({
//       latitude: props.lat,
//       longitude: props.lng,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     })
//   );

//   useEffect(() => {
//     animateMarker();
//   }, [props]);

//   const animateMarker = () => {
//     const newCoordinate = {
//       latitude: props.lat,
//       longitude: props.lng,
//       latitudeDelta: LATITUDE_DELTA,
//       longitudeDelta: LONGITUDE_DELTA,
//     };

//     if (Platform.OS === "android") {
//       if (marker) {
//         marker.animateMarkerToCoordinate(newCoordinate, 15000);
//       }
//     } else {
//       coordinate.timing(newCoordinate).start();
//     }
//   };

//   return (
//     <MarkerAnimated
//       ref={(marker) => {
//         setMarker(marker);
//       }}
//       coordinate={coordinate}
//       anchor={{ x: 0.5, y: 0.5 }}
//     >
//       <Icon size={50} name="location" type="evilicon" color="#8B8000" />
//     </MarkerAnimated>
//   );
// }
