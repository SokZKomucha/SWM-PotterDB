import { Pressable, Text, View } from "react-native";

type PaginationProps = {
  pageCount: number
  pageNumber: number
  setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

export default function Pagination(props: PaginationProps) {
  return (
    <View>
      <Pressable onPress={() => props.pageNumber > 1 && props.setPageNumber(prev => prev - 1)}>
        <Text style={{ fontSize: 40 }}>&lt;</Text>
      </Pressable>
      <Text style={{ fontSize: 40 }}>{props.pageNumber}/{props.pageCount}</Text>
      <Pressable onPress={() => props.pageNumber < props.pageCount && props.setPageNumber(prev => prev + 1)}>
        <Text style={{ fontSize: 40 }}>&gt;</Text>
      </Pressable>
    </View>

    // To be implemented
  )
}