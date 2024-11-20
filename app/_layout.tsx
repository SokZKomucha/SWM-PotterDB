import storedCharacters from "@/assets/data/characters.json";
import { StoredCharacterContext } from "@/contexts/StoredCharacterContext";
import StoredCharacter from "@/types/StoredCharacter";
import { Stack } from "expo-router";
import { useEffect, useRef } from "react";

export default function RootLayout() {
  const characterRef = useRef<StoredCharacter[]>([]);

  useEffect(() => {
    characterRef.current = storedCharacters;
  }, [characterRef]);

  return (
    <StoredCharacterContext.Provider value={characterRef.current}>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="characters" options={{ headerTitle: "Characters" }} />
      </Stack>
    </StoredCharacterContext.Provider>
  );
}
