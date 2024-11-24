import { NativeSyntheticEvent, Pressable, Text, TextInput, TextInputChangeEventData, View } from "react-native";

type PaginationProps = {
  pageCount: number
  pageNumber: number
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination(props: PaginationProps) {

  const handleInput = (e: NativeSyntheticEvent<TextInputChangeEventData>) => {
    const pageNumber = parseInt(e.nativeEvent.text);

    if (Number.isNaN(pageNumber)) return;
    if (pageNumber < 1 || pageNumber > props.pageCount) return;

    props.setPageNumber(pageNumber);
  }


  return (
    <View style={{
      display: "flex",
      flexDirection: "row",
      gap: 10
    }}>

      <Pressable onPress={() => props.pageNumber > 1 && props.setPageNumber(prev => prev - 1)} style={{
        width: 30,
        height: 30,
        backgroundColor: props.pageNumber > 1 ? "rgb(222, 222, 222)" : "rgb(245, 245, 245)",
        borderRadius: 5
      }}>
        <View style={{
          width: 30,
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 20,
            color: props.pageNumber > 1 ? "rgb(0, 0, 0)" : "rgb(213, 213, 213)"
          }}>&lt;</Text>
        </View>
      </Pressable>

      <View style={{
        height: 30,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 5
      }}>
        <TextInput defaultValue={props.pageNumber.toString()} onChange={(e) => handleInput(e)} style={{
          width: 45,
          height: 30,
          padding: 0,
          textAlign: "center",
          borderWidth: 1,
          borderColor: "rgb(213, 213, 213)",
          borderRadius: 5
        }}></TextInput>
        <Text style={{
          padding: 0,
          textAlign: "center"
        }}>/ {props.pageCount}</Text>
      </View>

      <Pressable onPress={() => props.pageNumber < props.pageCount && props.setPageNumber(prev => prev + 1)} style={{
        width: 30,
        height: 30,
        backgroundColor: props.pageNumber < props.pageCount ? "rgb(222, 222, 222)" : "rgb(245, 245, 245)",
        borderRadius: 5
      }}>
        <View style={{
          width: 30,
          height: 30,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}>
          <Text style={{
            fontSize: 20,
            color: props.pageNumber < props.pageCount ? "rgb(0, 0, 0)" : "rgb(213, 213, 213)"
          }}>&gt;</Text>
        </View>
      </Pressable>

    </View>
  )
}