import { FlatListProps } from "react-native";
import { ScrollPair } from "../types/ScrollPair";

const useScrollSync = (scrollPairs: ScrollPair[]) => {
  const sync: NonNullable<FlatListProps<any>["onMomentumScrollEnd"]> = (
    event
  ) => {
    const { y } = event.nativeEvent.contentOffset;

    for (const { list, position } of scrollPairs) {
      list.current?.scrollToOffset({ offset: y, animated: false });
    }
  };

  return { sync };
};

export default useScrollSync;
