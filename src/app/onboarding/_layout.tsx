import { Stack } from 'expo-router';
import React from 'react';

export default function OnboardingLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="welcome" />
      <Stack.Screen name="add-description" />
      <Stack.Screen name="add-hobbies" />
      <Stack.Screen name="no-language-pair" />
      <Stack.Screen name="add-first-language-pair" />
    </Stack>
  );
}