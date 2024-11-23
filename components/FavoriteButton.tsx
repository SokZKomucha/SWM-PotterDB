import { useEffect, useMemo, useState } from "react";
import { Image, Pressable, View } from "react-native";

type FavoriteButtonProps = {
  width?: number,
  height?: number,
  initialValue: boolean,
  onClick: () => any
}

export default function FavoriteButton(props: FavoriteButtonProps) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => setEnabled(props.initialValue), []);

  const enabledImage = useMemo(() => require("@/assets/images/heart-solid.png"), []);
  const disabledImage = useMemo(() => require("@/assets/images/heart-outline.png"), [])

  return (
    <View style={{
      width: props.width ?? 40,
      height: props.height ?? 40,
      borderRadius: "50%",
      overflow: "hidden",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 4,
      borderColor: "rgb(141, 68, 242)",
      boxShadow: enabled ? "0 0 6px -1px rgb(168, 85, 232)" : undefined,
    }}>

      <Pressable onPress={() => { props.onClick(); setEnabled(p => !p) }}>
        <Image style={{
          marginTop: (props.width ?? 40) / 20,
          width: (props.width ?? 40) * 0.6,
          height: (props.width ?? 40) * 0.6
        }} source={enabled ? enabledImage : disabledImage}></Image>
      </Pressable>

    </View>
  )
}