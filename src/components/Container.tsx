import { PropsWithChildren } from 'react';
import { View, ViewProps } from "react-native";

function CustomView({ 
  children, 
  ...props 
} : PropsWithChildren<ViewProps>){
  return(
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
        flexDirection: "column",
        gap: 2,
        padding: 2
      }}
      {...props}
    >
      {children}
    </View>
  );
}