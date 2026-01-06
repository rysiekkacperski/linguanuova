import UserHobbiesScreen from '@/src/screens/UserHobbiesScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function OnboardingAddHobbies() {
  const router = useRouter();
  
  const onSkipAndOnSuccess = () => router.push('/onboarding/noLanguagePair')

  return (
    <UserHobbiesScreen
      onSuccess={onSkipAndOnSuccess}
      onSkip={onSkipAndOnSuccess}
    />
  );
}