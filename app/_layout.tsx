import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerSearchBarOptions: { onSearchButtonPress: (e) => console.log(e.nativeEvent.text) } }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
