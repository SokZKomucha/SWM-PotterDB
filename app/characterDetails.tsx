import Character from "@/types/Character";
import { useFonts } from "expo-font";
import { useNavigation } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { useEffect, useState } from "react";
import { Alert, Image, ScrollView, Text } from "react-native";

export default function characterDetails() {
  const navigation = useNavigation();
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
      display: "flex",
      flexDirection: "column",
      padding: 25,
      gap: 25
    }}>

      <Image style={{
        height: 300,
        objectFit: "contain"
      }} source={{
        uri: characterData?.data?.attributes.image ?? "http://via.placeholder.com/200x200"
      }}></Image>

      <Text>
        Hejka! {id}
      </Text>
      
      <Text>
        {characterData === null ? "Loading" : characterData?.data?.attributes?.slug}
      </Text>

    </ScrollView>
  )
}