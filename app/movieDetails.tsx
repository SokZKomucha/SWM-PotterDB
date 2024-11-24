import { favoriteContext } from "@/contexts/FavoriteContext";
import { Movie } from "@/types/Movie";
import { useFonts } from "expo-font";
import { Link, useLocalSearchParams, useNavigation } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, useColorScheme, View } from "react-native";

export default function MovieDetails() {
  const navigation = useNavigation();
  const favorites = useContext(favoriteContext);
  const { id, name: title } = useLocalSearchParams<{ id: string, name: string }>();
  const [movieData, setMovieData] = useState<Movie | null>(null);

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

    fetch(`https://api.potterdb.com/v1/movies/${id}`)
      .then(r => r.json())
      .then(r => setMovieData(r))
      .catch(_ => Alert.alert("Error", "An error occured trying to fetch data. Try again later."))
  }, []);

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
        uri: movieData?.data?.attributes?.poster ?? "http://via.placeholder.com/200x200"
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
          {movieData?.data?.attributes?.title}
        </Text>

        <View style={{
          marginBottom: 10
        }}>
          <Pressable onPress={() => {
            if (!!favorites.favorites.movies.find(e => e.id === id)) {
              favorites.setFavorites(prev => ({
                ...prev,
                movies: prev.movies.filter(e => e.id !== id)
              }));
            } else {
              favorites.setFavorites(prev => ({
                ...prev,
                movies: [...prev.movies, { id, name: title }]
              }));
            }
          }}>
            <Text style={{
              textDecorationLine: "underline"
            }}>{!!favorites.favorites.movies.find(e => e.id === id) ? "Remove from favorites" : "Add to favorites"}</Text>
          </Pressable>
          {movieData?.data?.attributes?.wiki && <Link style={{
            textDecorationLine: "underline"
          }} href={movieData?.data?.attributes?.wiki as any}>Wiki link</Link>}
        </View>


        <Text style={{
          fontSize: 18,
          fontFamily: "Host-Grotesk"
        }}>General:</Text>

        <View>
          <Text style={{ fontWeight: "bold" }}>Release date:</Text>
          <Text>{movieData?.data?.attributes?.release_date ?? " Unknown"}</Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Running time:</Text>
          <Text>{movieData?.data?.attributes?.running_time ?? "Unknown"}</Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Budget:</Text>
          <Text>{movieData?.data?.attributes?.budget ?? "Unknown"}</Text>
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Box office:</Text>
          <Text>{movieData?.data?.attributes?.box_office ?? "Unknown"}</Text>
        </View>

        <View style={{ marginBottom: 45 }}>
          <Text style={{ fontWeight: "bold" }}>Summary:</Text>
          <Text>{movieData?.data?.attributes?.summary ?? "Unknown"}</Text>
        </View>

        <Text style={{
          fontSize: 18,
          fontFamily: "Host-Grotesk"
        }}>Technical:</Text>

        <View>
          <Text style={{ fontWeight: "bold" }}>Cinematographers:</Text>
          {movieData?.data?.attributes?.cinematographers.length === 0 ? <Text>None</Text> : (
            movieData?.data?.attributes?.cinematographers.map((e, i) => (
              <Text key={i}>{e}</Text>
            ))
          )}
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Directors:</Text>
          {movieData?.data?.attributes?.directors.length === 0 ? <Text>None</Text> : (
            movieData?.data?.attributes?.directors.map((e, i) => (
              <Text key={i}>{e}</Text>
            ))
          )}
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Distributors:</Text>
          {movieData?.data?.attributes?.distributors.length === 0 ? <Text>None</Text> : (
            movieData?.data?.attributes?.distributors.map((e, i) => (
              <Text key={i}>{e}</Text>
            ))
          )}
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Editors:</Text>
          {movieData?.data?.attributes?.editors.length === 0 ? <Text>None</Text> : (
            movieData?.data?.attributes?.editors.map((e, i) => (
              <Text key={i}>{e}</Text>
            ))
          )}
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Music composers:</Text>
          {movieData?.data?.attributes?.music_composers.length === 0 ? <Text>None</Text> : (
            movieData?.data?.attributes?.music_composers.map((e, i) => (
              <Text key={i}>{e}</Text>
            ))
          )}
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Producers:</Text>
          {movieData?.data?.attributes?.producers.length === 0 ? <Text>None</Text> : (
            movieData?.data?.attributes?.producers.map((e, i) => (
              <Text key={i}>{e}</Text>
            ))
          )}
        </View>

        <View>
          <Text style={{ fontWeight: "bold" }}>Screenwriters:</Text>
          {movieData?.data?.attributes?.screenwriters.length === 0 ? <Text>None</Text> : (
            movieData?.data?.attributes?.screenwriters.map((e, i) => (
              <Text key={i}>{e}</Text>
            ))
          )}
        </View>



      </View>
    </ScrollView>
  )
}