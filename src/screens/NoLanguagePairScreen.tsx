import styles from "@/src/utils/styles";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import highFiveAniamtion from '@/src/assets/animations/high-five.json';
import Lottie from "lottie-react";

export default function NoLanguagePairScreen(){

  const [ t ] = useTranslation('translation', { keyPrefix: 'views.noLanguagePair' });
  const header = t('header')
  const description = t('description')
  const primaryTextButton = t('primaryButtonText')

  return(
    <View
      style={styles.container}
    >
      <Text variant="headlineLarge">{header.toUpperCase()}</Text>
      <Lottie animationData={highFiveAniamtion} />
      <Text variant="bodyMedium">{description}</Text>
      <Button mode="elevated">{primaryTextButton}</Button>
    </View>
  );
}