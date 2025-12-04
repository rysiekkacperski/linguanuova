import { Language } from '@/interfaces/language';
import { useEffect, useState } from 'react';
import { GestureResponderEvent, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Divider, Icon, Text, useTheme } from 'react-native-paper';
import styles from '../utils/styles';
import { FlagAvatar } from './Avatar';


export function LanguageButton({
  language=undefined,
  placeholder,
  selector=false,
  onPress,
  noIcon
}: {
  language?: Language | undefined
  placeholder?: string
  selector?: boolean
  onPress: (event: GestureResponderEvent) => void
  noIcon?: boolean
}){

  const defaultButtonStyles = [
    styles.buttonWithContentStyle, 
    styles.shadowViewStyle,
    styles.roundedViewStyle
  ]

  const themeColors = useTheme().colors

  const [text, setText] = useState<string>(placeholder ? placeholder : '' );
  const [flagUrl, setFlagUrl] = useState<string | undefined>(undefined);
  const [buttonStyle, setButtonStyle] = useState<ViewStyle[]>(defaultButtonStyles);

  useEffect(()=>{
    if(language?.label){
      setText(language.label);
    }else if(language){
      setText(language.iso);
    }

    if(language?.flagUrl){
      setFlagUrl(language.flagUrl)
      setButtonStyle([...defaultButtonStyles, styles.solidBorderViewStyle])
    }else{
      setButtonStyle([...defaultButtonStyles, styles.dashedBorderViewStyle])
    }
  }, [language]);

  return(
    <TouchableOpacity
      style={[
        ...buttonStyle,
        {
          backgroundColor: themeColors.background,
          borderColor: themeColors.outline,
        }
      ]}
      onPress={onPress}
    >
      <FlagAvatar 
        flagUrl={flagUrl} 
        style={{
          position: 'absolute',
          transform: [
            { translateX: '50%' }
          ]
        }}
      />
      <Text 
        variant='labelMedium' 
        style={{
          color: themeColors.outline
        }}
      >
        {text}
      </Text>
      {
        noIcon ? <></> :
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 1,
              padding: 2
            }}
          >
            <Divider leftInset />
            {
              selector ?
                <Icon source="select" color={themeColors.outline} size={20}/>
              : <Icon source="chevron-right" color={themeColors.outline} size={20}/>
            }
          </View>
      }
    </TouchableOpacity>
  );
  
}