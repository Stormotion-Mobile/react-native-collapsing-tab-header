import { FlatListProps } from "react-native";
import { HeaderConfig } from "../types/HeaderConfig";
import { ScrollPair } from "../types/ScrollPair";

const useScrollSync = (scrollPairs: ScrollPair[], headerHeight: number) => {
  const sync: NonNullable<FlatListProps<any>["onMomentumScrollEnd"]> = (
    event
  ) => {
    const { y } = event.nativeEvent.contentOffset;

    for (const { list, position } of scrollPairs) {
      const scrollPosition = position.current ?? 0;

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
