import Card from "@/components/Card";
import { favoriteContext } from "@/contexts/FavoriteContext";
import { Movies as TMovies } from "@/types/Movie";
import { useContext, useEffect, useState } from "react";
import { Alert, ScrollView, Text } from "react-native";

export default function Movies() {
  const [movies, setMovies] = useState<TMovies | null>(null);
  const favorites = useContext(favoriteContext);

  useEffect(() => {
    fetch(`https://api.potterdb.com/v1/movies`)
      .then(r => r.json())
      .then(r => setMovies(r))
      .catch(_ => Alert.alert("Error", "An error occured trying to fetch data. Try again later."));
  }, []);

  return (
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

      {movies === null ? <Text>Loading, please wait</Text> : (
        <>
          {
            movies.data?.map((e, i) => (
              <Card
                key={e.id}
                title={e.attributes?.title!}
                linkTitle="Details"
                linkUrl="/movieDetails"
                linkParams={{ id: e.id, name: e.attributes?.title }}
                imageUrl={e.attributes?.poster ?? "http://via.placeholder.com/200x200"}
                favoritable={true}
                initialFavoriteValue={!!favorites.favorites.movies.find(f => f.id === e.id)}
                setFavorite={() => {
                  if (!!favorites.favorites.movies.find(f => f.id === e.id)) {
                    favorites.setFavorites(prev => ({
                      ...prev,
                      movies: prev.movies.filter(f => f.id !== e.id)
                    }));
                  } else {
                    favorites.setFavorites(prev => ({
                      ...prev,
                      movies: [...prev.movies, { id: e.id, name: e.attributes?.title ?? "" }]
                    }))
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