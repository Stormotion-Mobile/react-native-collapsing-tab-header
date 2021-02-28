import { FlatListProps } from "react-native";
import { ScrollPair } from "../types/ScrollPair";

const useScrollSync = (scrollPairs: ScrollPair[], headerHeight: number) => {
  const sync: NonNullable<FlatListProps<any>["onMomentumScrollEnd"]> = (
    event
  ) => {
    const { y } = event.nativeEvent.contentOffset;

    for (const { list, position } of scrollPairs) {
      const scrollPosition = position.value ?? 0;

      if (scrollPosition > headerHeight && y > headerHeight) {
        continue;
      }

      list.current?.scrollToOffset({
        offset: Math.min(y, headerHeight),
        animated: false,
      });
    }
  };

  return { sync };
};

export default useScrollSync;
