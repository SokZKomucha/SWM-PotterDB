import characters from "@/assets/data/characters.json";
import Card from "@/components/Card";
import Pagination from "@/components/Pagination";
import { Link, useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, ScrollView, Text, TextInputFocusEventData, View } from "react-native";
// import { useHeaderHeight } from "@react-navigation/elements"

const elementsPerPage = 25;

export default function Characters() {
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  // const headerHeight = useHeaderHeight();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchOpened, setSearchOpened] = useState(false);
  const [filteredCharacters, setFilteredCharacters] = useState<typeof characters>([]);

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

  useEffect(() => {
    const filtered = characters.filter(e => e.name.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase()));
    setFilteredCharacters(filtered);
  }, [searchFilter]);

  return (
    <View style={{ position: "relative" }}>

      {searchOpened &&
        <View style={{
          position: "absolute",
          width: "100%",
          zIndex: 100,
          paddingInline: 25,
          paddingBlock: 10,
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          boxShadow: "0 0 6px -2px rgba(0, 0, 0, 0.25)"
        }}>
          {
            filteredCharacters.length >= 1 ?
            filteredCharacters
              .filter((e, i) => i < 5) // get first 5
              .map((e, i) => (
                <Link key={i} style={{
                  borderBottomWidth: 1,
                  borderBottomColor: i < Math.min(4, filteredCharacters.length - 1) ?  "rgba(0, 0, 0, 0.25)" : "transparent", // Hell yeah
                  padding: 5
                }} href={{
                  pathname: "/characterDetails",
                  params: e
                }}>
                  {e.name}
                </Link>
              )) : 
            <Text style={{
              fontStyle: "italic"
            }}>No results found</Text>
          }
        </View>
      }

      {searchOpened && // Dim background when search bar is opened
        <View style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 10,
          backgroundColor: "rgba(0, 0, 0, 0.65)",
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
                linkUrl="/characterDetails"
                linkParams={e}
                imageUrl={e.image ?? "http://via.placeholder.com/200x200"}
              ></Card>
            ))
        }

        <View style={{ alignSelf: "flex-start", marginTop: 10 }}>
          <Pagination pageNumber={currentPage} setPageNumber={setCurrentPageWrapper} pageCount={Math.ceil(characters.length / elementsPerPage)}></Pagination>
        </View>

      </ScrollView>
    </View>
  );
}

// TODO - All
// - favorites -> custom checkbox & implementation
// - books -> book details, with chapter list (and possibly chapter details - summary)
// - movies -> movie details