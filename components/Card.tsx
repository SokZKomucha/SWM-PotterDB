import { useFonts } from "expo-font";
import { useRouter } from "expo-router";
import { Button, Image, Pressable, StyleProp, Text, View, ViewStyle } from "react-native";
import FavoriteButton from "./FavoriteButton";

type CardProps = {
  title: string
  description?: string,
  linkTitle?: string,
  linkUrl?: string,
  linkParams?: any,

  image?: any,
  imageUrl?: string,

  favoritable?: true
  initialFavoriteValue?: boolean
  setFavorite?: () => any
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
      <Image source={{ uri: props.imageUrl }} style={{ height: 250, objectFit: "cover" }}></Image>
      <View style={{
        display: "flex",
        flexDirection: "column",
        padding: 15,
        gap: 5
      }}>

        <Text style={{
          fontSize: props.title.length > 22 ? 18 : 24,
          fontFamily: "Host-Grotesk"
        }}>{props.title}</Text>
        {props.description && <Text>{props.description}</Text>}

        {(props.favoritable || props.linkTitle) && (
          <View style={{
            height: 40,
            marginTop: 10,
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between"
          }}>

            {props.linkTitle && (
              <View style={{ flexBasis: 140 }}>
                <Button
                  color="rgb(141, 68, 242)"
                  title={props.linkTitle}
                  onPress={() => router.push({ pathname: props.linkUrl as any, params: props.linkParams })}>
                </Button>
              </View>
            )}

            {props.favoritable && (
              <View style={{ position: "absolute", right: 0 }}>
                <FavoriteButton 
                  initialValue={props.initialFavoriteValue ?? false} 
                  onClick={props.setFavorite ?? (() => null)} // Fallback?  
                ></FavoriteButton>
              </View>
            )}

          </View>
        )
        }

      </View>
    </View>
  )
}