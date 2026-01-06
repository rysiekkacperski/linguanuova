import UserDescriptionScreen from '@/src/screens/UserDescriptionScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function OnboardingAddDescription() {
  const router = useRouter();
  
  const onSkipAndOnSuccess = () => router.push('/onboarding/add-hobbies')

  return (
    <UserDescriptionScreen
      onSuccess={onSkipAndOnSuccess}
      onSkip={onSkipAndOnSuccess}
    />
  );
}