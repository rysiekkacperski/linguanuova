import { Icon, Label, NativeTabs } from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs>
      <NativeTabs.Trigger name="home">
        <Icon sf="house.fill" drawable="custom_android_drawable" />
        <Label>Home</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="card">
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Cards</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="card">
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Exercise</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings" hidden>
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Exercise</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}