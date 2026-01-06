import styles from "@/src/utils/styles";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

import setup from '@/src/assets/animations/setup.json';
import Lottie from "lottie-react";

interface WelcomeToAppScreenProps {
  onNext: () => void;
}

export default function WelcomeToAppScreen({ onNext } : WelcomeToAppScreenProps){

  const [ t ] = useTranslation('translation', { keyPrefix: 'views.welcomeUser' });
  const header = t('header')
  const description = t('description')
  const primaryTextButton = t('primaryButtonText')

  return(
    <View
      style={styles.container}
    >
      <Text variant="headlineLarge">{header.toUpperCase()}</Text>
      <Lottie animationData={setup} />
      <Text variant="bodyMedium">{description}</Text>
      <Button mode="elevated" onPress={onNext}>{primaryTextButton}</Button>
    </View>
  );
}