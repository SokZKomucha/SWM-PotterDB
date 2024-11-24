import { favoriteContext } from "@/contexts/FavoriteContext";
import Chapter from "@/types/Chapter";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { title } from "process";
import { useContext, useEffect, useState } from "react";
import { Alert, Pressable, ScrollView, Text, View } from "react-native";

export default function ChapterDetails() {
  const navigation = useNavigation();
  const favorites = useContext(favoriteContext);
  const { id, name } = useLocalSearchParams<{ id: `${string}/chapters/${string}`, name: `Ch${number},${string}` }>();
  const [chapterData, setChapterData] = useState<Chapter | null>(null);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name,
      headerTitleStyle: { fontSize: 14 }
    });

    fetch(`https://api.potterdb.com/v1/books/${id}`)
      .then(r => r.json())
      .then(r => setChapterData(r))
      .catch(_ => Alert.alert("Error", "An error occured trying to fetch data. Try again later."))
  }, []);

  return (
    <ScrollView contentContainerStyle={{
      minHeight: "100%",
      display: "flex",
      padding: 25,
      gap: 25,
      backgroundColor: "white"
    }}>

      <View>
        <Text style={{ fontWeight: "bold" }}>Title:</Text>
        <Text>{chapterData?.data?.attributes?.title}</Text>
      </View>

      <View>
        <Text style={{ fontWeight: "bold" }}>Summary:</Text>
        <Text>{chapterData?.data?.attributes?.summary ?? "Not provided"}</Text>
      </View>

      <View>
        <Link style={{
          textDecorationLine: "underline"
        }} href={{
          pathname: `/bookDetails`,
          params: { id: id.split("/")[0], name: name.split(",")[1].trim() }
        }}>Book</Link>
        <Pressable onPress={() => {
          // Remove or add
          if (!!favorites.favorites.chapters.find(e => e.id === id)) {
            favorites.setFavorites(prev => ({
              ...prev,
              chapters: prev.chapters.filter(e => e.id !== id)
            }));
          } else {
            favorites.setFavorites(prev => ({
              ...prev,
              chapters: [...prev.chapters, { id, name }]
            }));
          }
        }}>
          <Text style={{
            textDecorationLine: "underline"
          }}>{!!favorites.favorites.chapters.find(e => e.id === id) ? "Remove from favorites" : "Add to favorites"}</Text>
        </Pressable>
      </View>

    </ScrollView>
  )
}