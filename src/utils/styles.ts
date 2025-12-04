import { StyleSheet, ViewStyle } from "react-native";

const container: ViewStyle = {
  flex: 1,
  justifyContent: "center",
  alignItems: 'center',
  flexDirection: "column",
  gap: 2,
  padding: 2
}

const shadowViewStyle: ViewStyle = {
  boxShadow: [{
    offsetX: 10,
    offsetY: -3,
    blurRadius: '15px',
    spreadDistance: '10px',
    inset: true,
  }],
} 

const horizontalPadding: ViewStyle = {
  paddingHorizontal: 2
}

const buttonWithContentStyle: ViewStyle = {
  flexDirection: "row",
  justifyContent: "space-between",
  position: 'relative',
}

const dashedBorderViewStyle: ViewStyle = {
  borderStyle: "dashed",
  borderWidth: 2,
}

const solidBorderViewStyle: ViewStyle = {
  borderStyle: "solid",
  borderWidth: 2,
}

const roundedViewStyle: ViewStyle = {
  borderRadius: 2,
}

const styles = StyleSheet.create({
  container,
  buttonWithContentStyle,
  solidBorderViewStyle,
  dashedBorderViewStyle,
  roundedViewStyle,
  shadowViewStyle
});


export default styles;