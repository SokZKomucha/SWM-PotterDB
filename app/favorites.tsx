import Collapsible from "@/components/Collapsible";
import { favoriteContext } from "@/contexts/FavoriteContext";
import { Link } from "expo-router";
import { useContext } from "react";
import { ScrollView, Text, View } from "react-native";

export default function Favorites() {
  const favorites = useContext(favoriteContext);

  return (
    <ScrollView contentContainerStyle={{
      minHeight: "100%",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
      paddingBlock: 25,
      paddingInline: 25,
      backgroundColor: "white"
    }}>

      {favorites.favorites.books.length === 0 &&
        favorites.favorites.characters.length === 0 &&
        favorites.favorites.movies.length === 0 &&
        favorites.favorites.chapters.length === 0 &&
        <Text>Nothing to see here yet...</Text>
      }

      {favorites.favorites.characters.length > 0 &&
        <Collapsible title="Characters">
          {
            favorites.favorites.characters.map((e, i) => (
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
                  pathname: "/characterDetails",
                  params: e
                }}>{e.name.slice(0, 35) + (e.name.length > 35 ? "..." : "")}</Link>
              </View>
            ))
          }
        </Collapsible>
      }



      {favorites.favorites.books.length > 0 &&
        <Collapsible title="Books">
          {
            favorites.favorites.books.map((e, i) => (
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
                  pathname: "/bookDetails",
                  params: e
                }}>{e.name.slice(0, 35) + (e.name.length > 35 ? "..." : "")}</Link>
              </View>
            ))
          }
        </Collapsible>
      }



      {favorites.favorites.chapters.length > 0 &&
        <Collapsible title="Chapters">
          {
            favorites.favorites.chapters.map((e, i) => (
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
                  params: e
                }}>{e.name.slice(0, 35) + (e.name.length > 35 ? "..." : "")}</Link>
              </View>
            ))
          }
        </Collapsible>
      }


      {favorites.favorites.movies.length > 0 &&
        <Collapsible title="Movies">
          {
            favorites.favorites.movies.map((e, i) => (
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
                  pathname: "/movieDetails",
                  params: e
                }}>{e.name.slice(0, 35) + (e.name.length > 35 ? "..." : "")}</Link>
              </View>
            ))
          }
        </Collapsible>
      }


    </ScrollView>
  )
}