import Card from "@/components/Card";
import { useFonts } from "expo-font";
import { ScrollView, Text } from "react-native";

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
      gap: 15,
      paddingBlock: 50,
      paddingInline: 25,
      backgroundColor: "white"
    }}>

      <Text style={{
        alignSelf: "flex-start",
        fontSize: 28,
        fontFamily: "Host-Grotesk-Medium",
        color: "rgb(141, 68, 242)"
      }}>Hello, User! </Text>

      <Text style={{
        alignSelf: "flex-start",
        marginBottom: 25,
        fontSize: 14,
        fontFamily: "Host-Grotesk-Regular",
        fontWeight: 100
      }}>Welcome to my PotterDB API wrapper. Choose any of the following to begin: </Text>

      <Card title="Characters" description="Get to know better all characters appearing in Harry Potter franchise." linkTitle="Characters" linkUrl="/characters" imageUrl="https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/818za6qjgzl_ac_uf8941000_ql80_fmwebp_0.png"></Card>
      <Card title="Books" description="Learn more about specific title, or its chapters." linkTitle="Books" linkUrl="/books" imageUrl="https://m.media-amazon.com/images/I/7167GDebbRL._AC_UF1000,1000_QL80_.jpg"></Card>
      <Card title="Movies" description="Complete list of all Harry Potter movies." linkTitle="Movies" linkUrl="/movies" imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpbF3y9Uz7AJHbXvP-uE33Pd2RYOWTkw1rJw&s"></Card>
      <Card title="Favorites" description="Collection of characters, books and movies you saved, or just love." linkTitle="Favorites" linkUrl="/favorites" imageUrl="https://img.freepik.com/premium-photo/black-guy-sunglasses-carrying-huge-big-red-heart-cartoon-afro-american-guy-holding-big-valentine_820340-41092.jpg"></Card>
    </ScrollView>
  );
}
