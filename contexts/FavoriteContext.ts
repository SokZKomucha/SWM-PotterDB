import Character from "@/types/Character";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

// Store only item's id
export interface Favorites {
  characters: string[]
  books: string[]
  movies: string[]
}

export interface FavoriteContext {
  favorites: Favorites
  setFavorites: Dispatch<SetStateAction<Favorites>>
}

export const favoriteContext = createContext<FavoriteContext>({} as FavoriteContext);