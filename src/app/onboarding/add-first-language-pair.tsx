import AddLanguagePairScreen from '@/src/screens/AddLanguagePairScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function OnboardingAddFirstLanguagePair() {
  const router = useRouter();
  
  const onSkipAndOnSuccess = () => router.push('/')

  return (
    <AddLanguagePairScreen
      onSuccess={onSkipAndOnSuccess}
    />
  );
}