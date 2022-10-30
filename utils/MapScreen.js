// import {
//   StyleSheet,
//   View,
//   SafeAreaView,
//   StatusBar,
//   TouchableOpacity,
//   KeyboardAvoidingView,
//   Platform,
// } from "react-native";
// import { Icon } from "react-native-elements";
// import { useNavigation } from "@react-navigation/native";
// import React from "react";
// import tw from "twrnc";
// import Map from "../components/Map";
// import MapScreenNavigation from "../components/MapScreenNavigation";

// const MapScreen = () => {
//   const h = StatusBar.currentHeight;
//   const navigation = useNavigation();

//   return (
//     <KeyboardAvoidingView style={{ flex: 1 }} behavior={"height"}>
//       <View>
//         <TouchableOpacity
//           onPress={() => navigation.navigate("HomeScreen")}
//           style={tw`bg-gray-50 absolute top-8 left-4 z-50 p-3 rounded-full shadow-lg`}
//         >
//           <Icon name="menu" />
//         </TouchableOpacity>
//         <View style={tw`h-1/2`}>
//           <Map />
//         </View>
//         <View style={tw`h-1/2`}>
//           <MapScreenNavigation />
//         </View>
//       </View>
//     </KeyboardAvoidingView>
//   );
// };

// export default MapScreen;

// const styles = StyleSheet.create({});
