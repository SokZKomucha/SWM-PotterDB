import characters from "@/assets/data/characters.json";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, ScrollView, TextInputFocusEventData, View } from "react-native";

const elementsPerPage = 25;

export default function Characters() {
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");

  const setCurrentPageWrapper = (newPageNumber: React.SetStateAction<number>) => {
    setCurrentPage(newPageNumber);
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }
  
  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (e: NativeSyntheticEvent<TextInputFocusEventData>) => setSearchFilter(e.nativeEvent.text)
      }
    })
  }, []);

  return (
    <ScrollView ref={scrollRef} contentContainerStyle={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingBlock: 25,
      paddingInline: 25,
      gap: 15,
      backgroundColor: "white"
    }}>

      <View style={{ alignSelf: "flex-start", marginBottom: 10 }}>
        <Pagination pageNumber={currentPage} setPageNumber={setCurrentPageWrapper} pageCount={Math.ceil(characters.length / elementsPerPage)}></Pagination>
      </View>

      {
        characters
          .filter((e, i) => i >= (currentPage - 1) * elementsPerPage && i < currentPage * elementsPerPage)
          .map((e, i) => (
            <Card
              key={i}
              title={e.name}
              linkTitle="Details"
              linkUrl={`https://api.potterdb.com/v1/characters/${e.id}`}
            ></Card>
          ))
      }

      <View style={{ alignSelf: "flex-start", marginTop: 10 }}>
        <Pagination pageNumber={currentPage} setPageNumber={setCurrentPageWrapper} pageCount={Math.ceil(characters.length / elementsPerPage)}></Pagination>
      </View>

    </ScrollView>
  );

  // TODO
  // - Do anything else in readme 
  // - Redirects to actual characters' pages
  // - Scrape character image URLs, put in json
  // - search
}