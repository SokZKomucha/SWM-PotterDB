import { PropsWithChildren, useEffect, useState } from "react";
import { Pressable, Text, View, ViewStyle } from "react-native";

type CollapsibleProps = {
  children?: React.ReactNode | undefined
  style?: ViewStyle
  title: string
}

export default function Collapsible(props: CollapsibleProps) {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => console.log(expanded), [expanded]);

  return (
    // <View style={{ width: 100, height: 300 }}>
    //   <Text>{`${expanded}`}</Text>
    //   <Pressable style={{ width: 50, height: 50, backgroundColor: "red" }} onPress={() => setExpanded(p => !p)}></Pressable>
    //   {expanded && props.children}
    // </View>
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
          <Text style={{ fontSize: 20 }}>&gt;</Text>
        </View>
      </Pressable>

      {expanded && props.children}

    </View>
  )
}