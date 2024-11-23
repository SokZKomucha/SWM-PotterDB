import { favoriteContext } from "@/contexts/FavoriteContext";
import Character from "@/types/Character";
import { useFonts } from "expo-font";
import { Link, useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useContext, useEffect, useState } from "react";
import { Alert, Image, Pressable, ScrollView, Text, View } from "react-native";

export default function characterDetails() {
  const navigation = useNavigation();
  const favorites = useContext(favoriteContext);
  const { id, name } = useLocalSearchParams<{ id: string, name: string }>();
  const [characterData, setCharacterData] = useState<Character | null>(null);


  const [loaded, error] = useFonts({
    "Host-Grotesk-Bold": require("@/assets/fonts/HostGrotesk-Bold.ttf"),
    "Host-Grotesk-Medium": require("@/assets/fonts/HostGrotesk-Medium.ttf"),
    "Host-Grotesk-Regular": require("@/assets/fonts/HostGrotesk-Regular.ttf"),
    "Host-Grotesk-Light": require("@/assets/fonts/HostGrotesk-Light.ttf"),
  });

  useEffect(() => {
    navigation.setOptions({
      headerTitle: name
    });

    fetch(`https://api.potterdb.com/v1/characters/${id}`)
      .then(r => r.json())
      .then(r => setCharacterData(r))
      .catch(_ => Alert.alert("Error", "An error occured trying to fetch data. Try again later."));
  }, []);

  return (
    <ScrollView contentContainerStyle={{
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      padding: 25,
      gap: 25,
      backgroundColor: "white",
    }}>

      <Image style={{
        height: 300,
        objectFit: "contain"
      }} source={{
        uri: characterData?.data?.attributes.image ?? "http://via.placeholder.com/200x200"
      }}></Image>

      {characterData === null ? <Text>Loading, please wait</Text> : (
        <View style={{
          display: "flex",
          gap: 15
        }}>

          <Text style={{
            marginBottom: -15,
            fontSize: name.length > 22 ? 18 : 24,
            fontFamily: "Host-Grotesk"
          }}>
            {characterData?.data?.attributes.name}
          </Text>

          <View style={{
            marginBottom: 10,
          }}>
            <Pressable onPress={() => {
              // Remove or add
              if (!!favorites.favorites.characters.find(e => e.id === id)) {
                favorites.setFavorites(prev => ({
                  ...prev,
                  characters: prev.characters.filter(e => e.id !== id)
                }));
              } else {
                favorites.setFavorites(prev => ({
                  ...prev,
                  characters: [...prev.characters, { id, name }]
                }))
              }
            }}>
              <Text>{!!favorites.favorites.characters.find(e => e.id === id) ? "Remove from favorites" : "Add to favorites"}</Text>
            </Pressable>
            {characterData.data?.attributes.wiki && <Link href={characterData.data.attributes.wiki as any}>Wiki link</Link>}
          </View>


          <Text style={{
            fontSize: 18,
            fontFamily: "Host-Grotesk"
          }}>General:</Text>

          <View>
            <Text style={{ fontWeight: "bold" }}>Nationality:</Text>
            <Text>{characterData.data?.attributes.nationality ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Born/Dead:</Text>
            <Text>{characterData.data?.attributes.born ?? "Unknown"} / {characterData.data?.attributes.died ?? "Unknown"}</Text>
          </View>

          <View style={{ marginBottom: 45 }}>
            <Text style={{ fontWeight: "bold" }}>Marital status:</Text>
            <Text>{characterData.data?.attributes.marital_status ?? "Unknown"}</Text>
          </View>



          <Text style={{
            fontSize: 18,
            fontFamily: "Host-Grotesk"
          }}>Appearance:</Text>

          <View>
            <Text style={{ fontWeight: "bold" }}>Species:</Text>
            <Text>{characterData.data?.attributes.species ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Gender:</Text>
            <Text>{characterData.data?.attributes.gender ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Skin color:</Text>
            <Text>{characterData.data?.attributes.skin_color ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Hair color:</Text>
            <Text>{characterData.data?.attributes.hair_color ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Eye color:</Text>
            <Text>{characterData.data?.attributes.eye_color ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Height:</Text>
            <Text>{characterData.data?.attributes.height ?? "Unknown"}</Text>
          </View>

          <View style={{ marginBottom: 45 }}>
            <Text style={{ fontWeight: "bold" }}>Weight:</Text>
            <Text>{characterData.data?.attributes.weight ?? "Unknown"}</Text>
          </View>



          <Text style={{
            fontSize: 18,
            fontFamily: "Host-Grotesk"
          }}>Harry Potter stuff:</Text>

          <View>
            <Text style={{ fontWeight: "bold" }}>House:</Text>
            <Text>{characterData.data?.attributes.house ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Boggart:</Text>
            <Text>{characterData.data?.attributes.boggart ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Patronus:</Text>
            <Text>{characterData.data?.attributes.patronus ?? "Unknown"}</Text>
          </View>

          <View>
            <Text style={{ fontWeight: "bold" }}>Wands:</Text>
            {characterData.data?.attributes.wands.length === 0 ? <Text>None</Text> : (
              characterData.data?.attributes.wands.map((e, i) => (
                <Text key={i}>{e}</Text>
              ))
            )}
          </View>

        </View>
      )}





    </ScrollView>
  )
}