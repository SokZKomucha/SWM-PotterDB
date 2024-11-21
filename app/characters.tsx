import characters from "@/assets/data/characters.json";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, ScrollView, TextInputFocusEventData, View } from "react-native";
// import { useHeaderHeight } from "@react-navigation/elements"

const elementsPerPage = 25;

export default function Characters() {
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  // const headerHeight = useHeaderHeight();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchOpened, setSearchOpened] = useState(false);

  const setCurrentPageWrapper = (newPageNumber: React.SetStateAction<number>) => {
    setCurrentPage(newPageNumber);
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }

  useEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (e: NativeSyntheticEvent<TextInputFocusEventData>) => setSearchFilter(e.nativeEvent.text),
        onClose: () => setSearchOpened(false),
        onOpen: () => setSearchOpened(true)
      }
    })
  }, []);

  return (
    <View style={{ position: "relative" }}>
      

      
      { searchOpened &&
        <View style={{
          position: "absolute",
          width: "100%",
          height: 100, // to be removed, instead get height based on children count
          zIndex: 100,
          backgroundColor: "white",
          boxShadow: "0 0 6px -2px rgba(0, 0, 0, 0.25)"
        }}></View>
      }
      
      
      
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
    </View>
  );

  // TODO
  // - Do anything else in readme 
  // - Redirects to actual characters' pages
  // - Scrape character image URLs, put in json
  // - search
}