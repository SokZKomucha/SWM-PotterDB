import { useState } from "react";
import { Image, Pressable, Text, View, ViewStyle } from "react-native";

type CollapsibleProps = {
  children?: React.ReactNode | undefined
  style?: ViewStyle
  title: string
}

export default function Collapsible(props: CollapsibleProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={{
      width: "100%",
      borderRadius: 5,
      overflow: "hidden",
      boxShadow: "0 0 6px -3px rgba(0, 0, 0, 0.25)"
    }}>

      {/* Header */}
      <Pressable onPress={() => setExpanded(p => !p)} style={{
        height: 40,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "rgb(215, 215, 215)",
      }}>
        <View style={{
          display: "flex",
          justifyContent: "center",
          paddingInline: 10,
        }}>
          <Text>{props.title}</Text>
        </View>
        <View style={{
          width: 40,
          height: 40,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          transform: expanded ? "rotate(90deg)" : "rotate(0deg)"
        }}>
          <Image source={require("@/assets/images/arrow-right.png")}>
          </Image>
        </View>
      </Pressable>

      {expanded && props.children}

    </View>
  )
}