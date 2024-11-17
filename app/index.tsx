import { useRef, useState } from "react";
import { Text, View } from "react-native";

export default function Index() {
  const touchStartTimestamp = useRef(0);
  const [displayedTime, setDisplayedTime] = useState<string | null>(null);
  
  const handleTouchEnd = () => {
    const touchTime = new Date().getTime() - touchStartTimestamp.current;
    setDisplayedTime(touchTime.toString());
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", }}>
      <View
        
        onTouchStart={() => touchStartTimestamp.current = new Date().getTime()}
        onTouchEnd={handleTouchEnd}
        style={{ width: 100, height: 100, backgroundColor: "red" }}
      ></View>
      <Text>{displayedTime}</Text>
    </View>
  );
}
