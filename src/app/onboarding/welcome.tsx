import WelcomeToAppScreen from '@/src/screens/WelcomeToAppScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function OnboardingWelcome() {
  const router = useRouter();

  return (
    <WelcomeToAppScreen
      onNext={() => router.push('/onboarding/add-description')}
    />
  );
}