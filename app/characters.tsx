// import characters from "@/assets/data/characters.json";
import Card from "@/components/Card";
import CharacterFilter, { ChosenOptions } from "@/components/CharacterFilter";
import Pagination from "@/components/Pagination";
import { favoriteContext } from "@/contexts/FavoriteContext";
import { storedCharactersContext } from "@/contexts/StoredCharactersContext";
import StoredCharacter from "@/types/StoredCharacter";
import { Link, useNavigation } from "expo-router";
import { useContext, useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, ScrollView, Text, TextInputFocusEventData, View } from "react-native";

const elementsPerPage = 25;

export default function Characters() {
  const scrollRef = useRef<ScrollView>(null);
  const navigation = useNavigation();
  const favorites = useContext(favoriteContext);
  const characters = useContext(storedCharactersContext)

  const [currentPage, setCurrentPage] = useState(1);
  const [searchFilter, setSearchFilter] = useState("");
  const [searchOpened, setSearchOpened] = useState(false);
  const [searchedCharacters, setSearchedCharacters] = useState<StoredCharacter[]>([]);
  const [filteredCharacters, setFilteredCharacters] = useState<StoredCharacter[]>(characters.characters);

  const setCurrentPageWrapper = (newPageNumber: React.SetStateAction<number>) => {
    setCurrentPage(newPageNumber);
    scrollRef.current?.scrollTo({ x: 0, y: 0, animated: true });
  }

  const onFilterChange = (options: ChosenOptions) => {
    console.log(options)
    const filtered = characters.characters
    .filter(e => (
        (options.house === "any" ? true : e.attributes?.house?.toLocaleLowerCase() === options.house) &&
        (options.patronus === "any" ? true : e.attributes?.patronus?.toLocaleLowerCase() === options.patronus) &&
        (options.gender === "any" ? true : e.attributes?.gender?.toLocaleLowerCase() === options.gender) &&
        (options.species === "any" ? true : e.attributes?.species?.toLocaleLowerCase() === options.species) &&
        (options.favorite === "any" ? true : (
          options.favorite === "yes" ? !!favorites.favorites.characters.find(f => f.id === e.id) === true : !!!favorites.favorites.characters.find(f => f.id === e.id === true
        )))
      ));

    setCurrentPage(1);
    setFilteredCharacters(filtered)
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
    const filtered = characters.characters.filter(e => e.attributes?.name?.toLocaleLowerCase().includes(searchFilter.toLocaleLowerCase()));
    setSearchedCharacters(filtered);
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
            searchedCharacters.length >= 1 ?
              searchedCharacters
                .filter((e, i) => i < 5) // get first 5
                .map((e, i) => (
                  <Link key={i} style={{
                    borderBottomWidth: 1,
                    borderBottomColor: i < Math.min(4, searchedCharacters.length - 1) ? "rgba(0, 0, 0, 0.25)" : "transparent", // Hell yeah
                    padding: 5
                  }} href={{
                    pathname: "/characterDetails",
                    params: { id: e.id, name: e.attributes!.name ?? "" }
                  }}>
                    {e.attributes!.name!}
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
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 15,
        paddingBlock: 25,
        paddingInline: 25,
        backgroundColor: "white"
      }}>

        <View style={{
          alignSelf: "flex-start",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginBottom: 10
        }}>
          <Pagination pageNumber={currentPage} setPageNumber={setCurrentPageWrapper} pageCount={Math.ceil(filteredCharacters.length / elementsPerPage)}></Pagination>
          <CharacterFilter onChange={onFilterChange}></CharacterFilter>
        </View>

        {filteredCharacters.length === 0 ? <Text>No character is matching chosen criteria</Text> : 
          filteredCharacters
            .filter((e, i) => i >= (currentPage - 1) * elementsPerPage && i < currentPage * elementsPerPage)
            .map((e, i) => (
              <Card
                key={e.id}
                title={e.attributes!.name!}
                linkTitle="Details"
                linkUrl="/characterDetails"
                linkParams={{ id: e.id, name: e.attributes!.name ?? "" }}
                imageUrl={e.attributes?.image || "http://via.placeholder.com/200x200"}
                favoritable={true}
                initialFavoriteValue={!!favorites.favorites.characters.find(f => f.id === e.id)}
                setFavorite={() => {
                  // Remove or add
                  if (!!favorites.favorites.characters.find(f => f.id === e.id)) {
                    favorites.setFavorites(prev => ({
                      ...prev,
                      characters: prev.characters.filter(f => f.id !== e.id)
                    }));
                  } else {
                    favorites.setFavorites(prev => ({
                      ...prev,
                      characters: [...prev.characters, { id: e.id, name: e.attributes!.name! }]
                    }));
                  }
                }}
              // I love React
              ></Card>
            ))
        }

        {filteredCharacters.length >= 2 && (
          <View style={{ alignSelf: "flex-start", marginTop: 10 }}>
            <Pagination pageNumber={currentPage} setPageNumber={setCurrentPageWrapper} pageCount={Math.ceil(filteredCharacters.length / elementsPerPage)}></Pagination>
          </View>
        )}

      </ScrollView>
    </View>
  );
}

// TODO - All
// - favorites -> custom checkbox & implementation
// - books -> book details, with chapter list (and possibly chapter details - summary)
// - movies -> movie details