import Card from "@/components/Card";
import { favoriteContext } from "@/contexts/FavoriteContext";
import { Books as TBooks } from "@/types/Book"; // boże
import { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";

export default function Books() {
  const [books, setBooks] = useState<TBooks | null>(null);
  const favorites = useContext(favoriteContext);

  useEffect(() => {
    fetch(`https://api.potterdb.com/v1/books`)
      .then(r => r.json())
      .then(r => setBooks(r))
      .catch(_ => Alert.alert("Error", "An error occured trying to fetch data. Try again later."));
  }, [])

  return (
    // No need for search or pagination, ther're only 7 books
    <ScrollView contentContainerStyle={{
      minHeight: "100%",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 15,
      paddingBlock: 25,
      paddingInline: 25,
      backgroundColor: "white"
    }}>

      {books === null ? <Text>Loading, please wait</Text> : (
        <>
          {
            books.data?.map((e, i) => (
              <Card
                key={e.id}
                title={e.attributes?.title!} // sam już nie wiem
                linkTitle="Details"
                linkUrl="/bookDetails"
                linkParams={{ id: e.id, name: e.attributes?.title }}
                imageUrl={e.attributes?.cover ?? "http://via.placeholder.com/200x200"}
                favoritable={true}
                initialFavoriteValue={!!favorites.favorites.books.find(f => f.id === e.id)}
                setFavorite={() => {
                  // pomocy
                  if (!!favorites.favorites.books.find(f => f.id === e.id)) {
                    favorites.setFavorites(prev => ({
                      ...prev,
                      books: prev.books.filter(f => f.id !== e.id)
                    }));
                  } else {
                    favorites.setFavorites(prev => ({
                      ...prev,
                      books: [...prev.books, { id: e.id, name: e.attributes?.title ?? "" }]
                    }));
                  }
                }}
              ></Card>
            ))
          }
        </>
      )}

    </ScrollView>
  )
}