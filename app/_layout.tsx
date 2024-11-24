import { favoriteContext, Favorites } from "@/contexts/FavoriteContext";
import { Characters } from "@/types/Character";
import StoredCharacter from "@/types/StoredCharacter";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack } from "expo-router";
import { useEffect, useState } from "react";
import charactersJson from "@/assets/data/characters-all.json";
import { storedCharactersContext } from "@/contexts/StoredCharactersContext"


export default function RootLayout() {
  
  const [storedCharacters, setStoredCharacters] = useState<StoredCharacter[]>([]);
  const [favorites, setFavorites] = useState<Favorites>({
    characters: [],
    books: [],
    movies: [],
    chapters: []
  });

  const fetchCharacters = async () => {

    setStoredCharacters(charactersJson);

    // I'd have gladly used the following, but unfortunately, AsyncStorage chokes when
    // you have to either save/read equivalent of about 2000 characters. And there
    // are 4962 of them in total...
    // Some compromises had to be made.

    // That said, it IS possible to load them from API, but that unfortunately
    // happens every time the application is opened. To do so, comment line 22 and
    // uncomment following 15 lines:

    // const prefetch = await fetch("https://api.potterdb.com/v1/characters");
    // const characterPageCount = (await prefetch.json() as Characters).meta?.pagination?.last ?? 50;
    // let fetchedCharacterList: StoredCharacter[] = [];
    // for (let i = 1; i <= characterPageCount; i++) {
    //   const url = `https://api.potterdb.com/v1/characters?page[number]=${i}`;
    //   try {
    //     const request = await fetch(url);
    //     const response: Characters = await request.json();
    //     if (!response.data) continue;
    //     fetchedCharacterList.push(...response.data!)
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log(i);
    //   setStoredCharacters(fetchedCharacterList)
    // }



    // Below are my previous tries, with AsyncStorage
    // const alreadyStoredCharacters = await AsyncStorage.getItem("storedCharacters");
    // if (alreadyStoredCharacters) {
    //   console.log("From storage");
    //   setStoredCharacters(JSON.parse(alreadyStoredCharacters));
    //   return;
    // }
    // console.log("From API");
    // const prefetch = await fetch("https://api.potterdb.com/v1/characters");
    // const characterPageCount = 30; // (await prefetch.json() as Characters).meta?.pagination?.last ?? 50;
    // let fetchedCharacterList: StoredCharacter[] = [];
    // for (let i = 1; i <= characterPageCount; i++) {
    //   const url = `https://api.potterdb.com/v1/characters?page[number]=${i}`;
    //   try {
    //     const request = await fetch(url);
    //     const response: Characters = await request.json();
    //     if (!response.data) continue;
    //     fetchedCharacterList.push(...response.data!)
    //   } catch (error) {
    //     console.log(error);
    //   }
    //   console.log(fetchedCharacterList.length);
    // }
    // console.log(fetchedCharacterList.length);
    // setStoredCharacters(fetchedCharacterList);
    // await AsyncStorage.setItem("storedCharacters", JSON.stringify(fetchedCharacterList));
  };

  useEffect(() => {
    fetchCharacters();

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
    <storedCharactersContext.Provider value={{ characters: storedCharacters, setCharacters: setStoredCharacters }}>
      <favoriteContext.Provider value={{ favorites, setFavorites }}>
        <Stack>
          <Stack.Screen name="index" options={{ headerTitle: "Home" }} />
          <Stack.Screen name="characters" options={{ headerTitle: "Characters" }} />
          <Stack.Screen name="characterDetails" />
          <Stack.Screen name="favorites" options={{ headerTitle: "Favorites" }} />
          <Stack.Screen name="books" options={{ headerTitle: "Books" }} />
          <Stack.Screen name="bookDetails" />
          <Stack.Screen name="movies" options={{ headerTitle: "Movies" }} />
          <Stack.Screen name="movieDetails" />
          <Stack.Screen name="chapterDetails" />
        </Stack>
      </favoriteContext.Provider>
    </storedCharactersContext.Provider>
  );
}
