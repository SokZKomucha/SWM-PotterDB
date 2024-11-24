import { createContext, Dispatch, SetStateAction } from "react";

type IdNamePair = {
  id: string,
  name: string
}

// Store only item's id and name. A bit different for
// chapters, since requests needs to be made to
// access actual name (title). Chapter's name is derieved 
// from it's index and name of parent book
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