import StoredCharacter from "@/types/StoredCharacter";
import { createContext, Dispatch, SetStateAction } from "react";

export interface StoredCharactersContext {
  characters: StoredCharacter[],
  setCharacters: Dispatch<SetStateAction<StoredCharacter[]>>
}

export const storedCharactersContext = createContext<StoredCharactersContext>({} as StoredCharactersContext);