import styles from "@/src/utils/styles"
import { ViewStyle } from "react-native"
import { Avatar } from "react-native-paper"

export function FlagAvatar({
  flagUrl,
  size=36,
  style
} : {
  flagUrl?: string
  size?: number
  style?: ViewStyle
}){

  return(flagUrl ?
    <Avatar.Image size={size} style={[style]} source={require(flagUrl)} />
  : <Avatar.Icon size={size} style={[styles.dashedBorderViewStyle, style]} icon="help" />
  )
}