import { StyleSheet, Text, View } from "react-native";
import React from "react";

import Svg, { Path, Ellipse, G } from "react-native-svg";

const UserLocationSvg = () => {
  return (
    <Svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M7.5 9.63158C8.67724 9.63158 9.63158 8.67724 9.63158 7.5C9.63158 6.32276 8.67724 5.36842 7.5 5.36842C6.32276 5.36842 5.36842 6.32276 5.36842 7.5C5.36842 8.67724 6.32276 9.63158 7.5 9.63158ZM7.5 15C11.6421 15 15 11.6421 15 7.5C15 3.35786 11.6421 0 7.5 0C3.35786 0 0 3.35786 0 7.5C0 11.6421 3.35786 15 7.5 15Z"
        fill="#431879"
      />
    </Svg>
  );
};

export default UserLocationSvg;

const styles = StyleSheet.create({});
