import characters from "@/assets/data/characters.json";
import { useEffect, useRef, useState } from "react";
import { NativeSyntheticEvent, Text, TextInput, TextInputChangeEventData, View } from "react-native";

export default function Index() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <Text>Hello, World! This is index.tsx</Text>
    </View>
  );
}
