import Card from "@/components/Card";
import { ScrollView, Text, View } from "react-native";
import { useFonts } from "expo-font"


export default function Index() {
  const [loaded, error] = useFonts({
    "Host-Grotesk-Bold": require("@/assets/fonts/HostGrotesk-Bold.ttf"),
    "Host-Grotesk-Medium": require("@/assets/fonts/HostGrotesk-Medium.ttf"),
    "Host-Grotesk-Regular": require("@/assets/fonts/HostGrotesk-Regular.ttf"),
    "Host-Grotesk-Light": require("@/assets/fonts/HostGrotesk-Light.ttf"),
  });
  
  return (
    <ScrollView contentContainerStyle={{ 
      display: "flex", 
      flexDirection: "column",
      alignItems: "center",
      paddingBlock: 50,
      paddingInline: 25,
      backgroundImage: "linear-gradient(red, blue)",
      gap: 15,
      backgroundColor: "white"
    }}>

      <Text style={{
        alignSelf: "flex-start",
        fontSize: 28,
        fontFamily: "Host-Grotesk-Medium", 
        color: "rgb(141, 68, 242)"
      }}>Hello, User!</Text>

      <Text style={{
        alignSelf: "flex-start",
        marginBottom: 25,
        fontSize: 14,
        fontFamily: "Host-Grotesk-Regular",
        fontWeight: 100
      }}>Welcome to my PotterDB API wrapper. Choose any of the following to begin:</Text>

      <Card title="Characters" description="Lorem ipsum dolot sit amet pozdrawiam Mamę Michała." linkTitle="Go there" linkUrl="/"></Card>
      <Card title="Books" description="Lorem ipsum dolot sit amet pozdrawiam Mamę Michała."></Card>
      <Card title="Movies" description="Lorem ipsum dolot sit amet pozdrawiam Mamę Michała."></Card>
      <Card title="Favorites" description="Lorem ipsum dolot sit amet pozdrawiam Mamę Michała."></Card>
    </ScrollView>
  );
}
