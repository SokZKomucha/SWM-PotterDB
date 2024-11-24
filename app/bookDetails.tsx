import Collapsible from "@/components/Collapsible";
import { favoriteContext } from "@/contexts/FavoriteContext";
import { Book } from "@/types/Book";
import { useFonts } from "expo-font";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

export default function BookDetails() {
  const navigation = useNavigation();
  const favorites = useContext(favoriteContext);
  const { id, name: title } = useLocalSearchParams<{ id: string, name: string }>();
  const [bookData, setBookData] = useState<Book | null>(null);

  const [loaded, error] = useFonts({
    "Host-Grotesk-Bold": require("@/assets/fonts/HostGrotesk-Bold.ttf"),
    "Host-Grotesk-Medium": require("@/assets/fonts/HostGrotesk-Medium.ttf"),
    "Host-Grotesk-Regular": require("@/assets/fonts/HostGrotesk-Regular.ttf"),
    "Host-Grotesk-Light": require("@/assets/fonts/HostGrotesk-Light.ttf"),
  });


  useEffect(() => {
    navigation.setOptions({
      headerTitle: title
    });

    fetch(`https://api.potterdb.com/v1/books/${id}`)
      .then(r => r.json())
      .then(r => setBookData(r))
      .catch(_ => Alert.alert("Error", "An error occured trying to fetch data. Try again later."))
  }, [])

  return (
    <ScrollView contentContainerStyle={{
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      padding: 25,
      gap: 25,
      backgroundColor: "white"
    }}>

      <Image style={{
        height: 300,
        objectFit: "contain"
      }} source={{
        uri: bookData?.data?.attributes?.cover ?? "http://via.placeholder.com/200x200"
      }}></Image>



      <View style={{
        display: "flex",
        gap: 15
      }}>

        <Text style={{
          fontSize: title.length > 22 ? 18 : 24,
          fontFamily: "Host-Grotesk",
          marginBottom: -15
        }}>
          {bookData?.data?.attributes?.title}
        </Text>

        <View style={{
          marginBottom: 10
        }}>
          <Pressable onPress={() => {
            // Remove or add
            if (!!favorites.favorites.books.find(e => e.id === id)) {
              favorites.setFavorites(prev => ({
                ...prev,
                books: prev.books.filter(e => e.id !== id)
              }));
            } else {
              favorites.setFavorites(prev => ({
                ...prev,
                books: [...prev.books, { id, name: title }]
              }));
            }
          }}>
            <Text style={{
              textDecorationLine: "underline"
            }}>{!!favorites.favorites.books.find(e => e.id === id) ? "Remove from favorites" : "Add to favorites"}</Text>
          </Pressable>
          {bookData?.data?.attributes?.wiki && <Link style={{
            textDecorationLine: "underline"
          }} href={bookData?.data?.attributes?.wiki as any}>Wiki link</Link>}
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Author:</Text>
          <Text>{bookData?.data?.attributes?.author}</Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Release date:</Text>
          <Text>{bookData?.data?.attributes?.release_date}</Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Dedication:</Text>
          <Text>{bookData?.data?.attributes?.dedication ?? "None"}</Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Page count:</Text>
          <Text>{bookData?.data?.attributes?.pages}</Text>
        </View>

        <View style={{ marginTop: 10 }}>
          <Collapsible title="Chapter list">
            {
              bookData?.data?.relationships?.chapters?.data?.map((e, i) => (
                
                <View key={e.id} style={{
                  height: 35,
                  display: "flex",
                  justifyContent: "center",
                  paddingInline: 10,
                  backgroundColor: i % 2 === 0 ? "rgb(230, 230, 230)" : "rgb(240, 240, 240)"
                }}>
                  <Link style={{
                    textDecorationLine: "underline"
                  }} href={{
                    pathname: "/chapterDetails",
                    params: { id: `${id}/chapters/${e.id}`, name: `Ch${i + 1}, ${title}` }
                  }}>Chapter {i + 1}</Link>
                </View>
              ))
            }
          </Collapsible>
        </View>

      </View>


    </ScrollView>
  )
}