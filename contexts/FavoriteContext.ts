import { createContext, Dispatch, SetStateAction } from "react";

type IdNamePair = {
  id: string,
  name: string
}

// Store only item's id and name
export interface Favorites {
  characters: IdNamePair[]
  books: IdNamePair[]
  movies: IdNamePair[]
  chapters: { id: `${string}/chapters/${string}`, name: `Ch${number},${string}` }[]
}

export interface FavoriteContext {
  favorites: Favorites
  setFavorites: Dispatch<SetStateAction<Favorites>>
}

export const favoriteContext = createContext<FavoriteContext>({} as FavoriteContext);