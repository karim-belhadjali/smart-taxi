import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

const horizontalScale = (size) => (width / guidelineBaseWidth) * size;
const verticalScale = (size) => (height / guidelineBaseHeight) * size;
const moderateScale = (parm, factor = 0.5) =>
  parm + (horizontalScale(parm) - parm) * factor;

export { horizontalScale, verticalScale, moderateScale };
