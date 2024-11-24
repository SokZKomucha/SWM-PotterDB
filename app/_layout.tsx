import { Stack } from "expo-router";
import { favoriteContext, Favorites } from "@/contexts/FavoriteContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RootLayout() {

  const [favorites, setFavorites] = useState<Favorites>({
    characters: [],
    books: [],
    movies: [],
    chapters: []
  });

  useEffect(() => {
    AsyncStorage.getItem("favorites").then(e => {
      if (e) {
        setFavorites(JSON.parse(e));
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  return (
    <favoriteContext.Provider value={{ favorites, setFavorites }}>
      <Stack>
        <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
        <Stack.Screen name="characters" options={{ headerTitle: "Characters" }} />
        <Stack.Screen name="characterDetails" />
        <Stack.Screen name="favorites" options={{ headerTitle: "Favorites" }} />
        <Stack.Screen name="books" options={{ headerTitle: "Books" }} />
        <Stack.Screen name="bookDetails"/>
        <Stack.Screen name="movies" options={{ headerTitle: "Movies" }} />
        <Stack.Screen name="movieDetails"/>
        <Stack.Screen name="chapterDetails" />
      </Stack>
    </favoriteContext.Provider>
  );
}
