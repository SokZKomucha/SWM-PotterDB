import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
      <Stack.Screen name="characters" options={{ headerTitle: "Characters" }} />
    </Stack>
  );
}
