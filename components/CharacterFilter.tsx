import { useContext, useEffect, useRef, useState } from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Picker } from "@react-native-picker/picker"
import { storedCharactersContext } from "@/contexts/StoredCharactersContext";

export interface ChosenOptions {
  house: string,
  patronus: string,
  gender: string,
  species: string,
  favorite: string
}

type CharacterFilterProps = {
  onChange: (options: ChosenOptions) => any
}

export default function CharacterFilter(props: CharacterFilterProps) {
  const [expanded, setExpanded] = useState(false);
  const characters = useContext(storedCharactersContext);

  // I'm sorry
  const houseOptionsRef = useRef<(string)[] | null>(null);
  const patronusOptionsRef = useRef<(string)[] | null>(null);
  const genderOptionsRef = useRef<(string)[] | null>(null);
  const SpeciesOptionsRef = useRef<(string)[] | null>(null);
  const [selectedHouse, setSelectedHouse] = useState("any");
  const [selectedPatronus, setSelectedPatronus] = useState("any");
  const [selectedGender, setSelectedGender] = useState("any");
  const [selectedSpecies, setSelectedSpecies] = useState("any");
  const [selectedFavorite, setSelectedFavorite] = useState("any");

  // On any selection change
  useEffect(() => {
    const options: ChosenOptions = {
      house: selectedHouse,
      patronus: selectedPatronus,
      gender: selectedGender,
      species: selectedSpecies,
      favorite: selectedFavorite
    }

    props.onChange(options);
  }, [selectedHouse, selectedPatronus, selectedGender, selectedSpecies, selectedFavorite]);

  useEffect(() => {
    const set = new Set<string | null | undefined>();
    characters.characters.forEach(c => set.add(c.attributes?.house?.toLowerCase()));
    houseOptionsRef.current = ["any", ...Array.from(set).filter(e => e !== undefined && e !== null).sort()]
  }, [houseOptionsRef]);

  useEffect(() => {
    const set = new Set<string | null | undefined>();
    characters.characters.forEach(c => set.add(c.attributes?.patronus?.toLowerCase()));
    patronusOptionsRef.current = ["any", ...Array.from(set).filter(e => e !== undefined && e !== null).sort()]
  }, [patronusOptionsRef]);

  useEffect(() => {
    const set = new Set<string | null | undefined>();
    characters.characters.forEach(c => set.add(c.attributes?.gender?.toLowerCase()));
    genderOptionsRef.current = ["any", ...Array.from(set).filter(e => e !== undefined && e !== null).sort()]
  }, [genderOptionsRef]);

  useEffect(() => {
    const set = new Set<string | null | undefined>();
    characters.characters.forEach(c => set.add(c.attributes?.species?.toLowerCase()));
    SpeciesOptionsRef.current = ["any", ...Array.from(set).filter(e => e !== undefined && e !== null).sort()]
  }, [SpeciesOptionsRef]);

  return (
    <View style={{
      width: 30,
      height: 30,
      position: "relative"
    }}>
      <Pressable style={{
        width: 30,
        height: 30,
        position: "absolute",
        backgroundColor: "rgb(230, 230, 230)",
        borderRadius: 5,
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }} onPress={() => setExpanded(p => !p)}>
        <Image style={{
          width: 20,
          height: 20

        }} source={require("@/assets/images/icon-filter.png")}></Image>
      </Pressable>

      {expanded && (
        <View style={{
          width: 240,
          position: "absolute",
          left: -210,
          top: 30,
          zIndex: 90,
          backgroundColor: "rgb(245, 245, 245)",
          boxShadow: "0 0 6px -2px rgba(0, 0, 0, 0.25)",
          borderRadius: 5
        }}>

          <View style={{
            display: "flex",
            flexDirection: "row"
          }}>
            <View style={{
              flexBasis: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{ fontSize: 15 }}>House:</Text>
            </View>
            <Picker selectedValue={selectedHouse} onValueChange={(e: string) => setSelectedHouse(e)} style={{
              fontSize: 10,
              padding: 0,
              flexBasis: 150,
            }}>
              {
                houseOptionsRef.current?.map((e, i) => (
                  <Picker.Item key={e} label={e} value={e}></Picker.Item>
                ))
              }
            </Picker>
          </View>

          <View style={{
            display: "flex",
            flexDirection: "row"
          }}>
            <View style={{
              flexBasis: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{ fontSize: 15 }}>Patronus:</Text>
            </View>
            <Picker selectedValue={selectedPatronus} onValueChange={(e: string) => setSelectedPatronus(e)} style={{
              fontSize: 10,
              padding: 0,
              flexBasis: 150,
            }}>
              {
                patronusOptionsRef.current?.map((e, i) => (
                  <Picker.Item key={e} label={e} value={e}></Picker.Item>
                ))
              }
            </Picker>
          </View>

          <View style={{
            display: "flex",
            flexDirection: "row"
          }}>
            <View style={{
              flexBasis: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{ fontSize: 15 }}>Gender:</Text>
            </View>
            <Picker selectedValue={selectedGender} onValueChange={(e: string) => setSelectedGender(e)} style={{
              fontSize: 10,
              padding: 0,
              flexBasis: 150,
            }}>
              {
                genderOptionsRef.current?.map((e, i) => (
                  <Picker.Item key={e} label={e} value={e}></Picker.Item>
                ))
              }
            </Picker>
          </View>

          <View style={{
            display: "flex",
            flexDirection: "row"
          }}>
            <View style={{
              flexBasis: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{ fontSize: 15 }}>Species:</Text>
            </View>
            <Picker selectedValue={selectedSpecies} onValueChange={(e: string) => setSelectedSpecies(e)} style={{
              fontSize: 10,
              padding: 0,
              flexBasis: 150,
            }}>
              {
                SpeciesOptionsRef.current?.map((e, i) => (
                  <Picker.Item key={e} label={e} value={e}></Picker.Item>
                ))
              }
            </Picker>
          </View>

          <View style={{
            display: "flex",
            flexDirection: "row"
          }}>
            <View style={{
              flexBasis: 90,
              display: "flex",
              justifyContent: "center",
              alignItems: "center"
            }}>
              <Text style={{ fontSize: 15 }}>Favorite:</Text>
            </View>
            <Picker selectedValue={selectedFavorite} onValueChange={(e: string) => setSelectedFavorite(e)} style={{
              fontSize: 10,
              padding: 0,
              flexBasis: 150,
            }}>
              <Picker.Item label="any" value="any"></Picker.Item>
              <Picker.Item label="yes" value="yes"></Picker.Item>
              <Picker.Item label="no" value="no"></Picker.Item>
            </Picker>
          </View>

        </View>
      )}
    </View>
  )
}