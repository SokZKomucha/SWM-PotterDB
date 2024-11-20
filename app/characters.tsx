import Pagination from "@/components/Pagination";
import { StoredCharacterContext } from "@/contexts/StoredCharacterContext";
import { useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { NativeSyntheticEvent, Text, TextInputFocusEventData, View } from "react-native";

const elementsPerPage = 25;

export default function Characters() {
  const navigation = useNavigation();
  const characters = useContext(StoredCharacterContext);
  const [currentPage, setCurrentPage] = useState(1);
  // const [searchFilter, setSearchFilter] = useState("");

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerSearchBarOptions: {
  //       // onChangeText: (e: NativeSyntheticEvent<TextInputFocusEventData>) => setFilter(e.nativeEvent.text)
  //     }
  //   })
  // }, []);
  
  return (
    <View>
      <Pagination pageNumber={currentPage} setPageNumber={setCurrentPage} pageCount={Math.ceil(characters.length / elementsPerPage)}></Pagination>
    </View>
  );
}