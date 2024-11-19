import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Button, Image, Pressable, StyleProp, Text, View, ViewStyle } from "react-native";

type CardProps = {
  title: string
  description?: string,
  linkTitle?: string,
  linkUrl?: string,
}

export default function Card(props: CardProps) {
  const [loaded, error] = useFonts({
    "Host-Grotesk": require("@/assets/fonts/HostGrotesk-Medium.ttf")
  });

  const router = useRouter();

  return (
    <View style={{
      display: "flex",
      flexDirection: "column",
      width: "100%",
      padding: 0,
      overflow: "hidden",
      boxShadow: "0px 2px 6px -2px rgba(0, 0, 0, 0.25)",
      borderRadius: 10,
    }}>
      <Image source={{ uri: "http://via.placeholder.com/200x200" }} style={{ height: 250 }}></Image>
      <View style={{
        display: "flex",
        flexDirection: "column",
        padding: 15,
        gap: 5
      }}>
        <Text style={{ fontSize: 24, fontFamily: "Host-Grotesk" }}>{props.title}</Text>
        {props.description && <Text>{props.description}</Text>}
        {props.linkTitle && (
          <View style={{
            width: 120,
            height: 40,
            marginTop: 10
          }}>
            <Button color="rgb(141, 68, 242)" title={props.linkTitle} onPress={() => router.push(props.linkUrl as any)}></Button>
          </View>
        )}
      </View>

    </View>
  )
}