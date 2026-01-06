import NoLanguagePairScreen from '@/src/screens/NoLanguagePairScreen';
import { useRouter } from 'expo-router';
import React from 'react';

export default function OnboardingNoLanguagePair() {
  const router = useRouter();

  return (
    <NoLanguagePairScreen
      onNext={() => router.push('/onboarding/add-first-language-pair')}
    />
  );
}