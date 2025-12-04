import { LanguageIso } from "@/interfaces/language";
import styles from "@/src/utils/styles";
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function AddLanguagePairScreen({
  primaryLang,
  setPrimaryLang,
  taughtLang,
  setTaughtLang,
  onPress
}: {
  primaryLang: LanguageIso | null
  setPrimaryLang: Dispatch<SetStateAction<LanguageIso | null>>
  taughtLang: LanguageIso | null
  setTaughtLang: Dispatch<SetStateAction<LanguageIso | null>>
  onPress?: () => void
}){
  
  const [ t ] = useTranslation(
    'translation', 
    { keyPrefix: 'views.addLanguagePair' }
  );

  return(
    <View
      style={styles.container}
    >
      <Text variant="headlineLarge">{t('header').toUpperCase()}</Text>
      <Text variant="bodyMedium">{t('description')}</Text>
      <Button 
        mode="elevated" 
        disabled={!(primaryLang && taughtLang)}
        onPress={onPress}
      >
        {t('primaryButtonText')}
      </Button>
      <Text variant="bodySmall">t('info')</Text>
    </View>
  );
}