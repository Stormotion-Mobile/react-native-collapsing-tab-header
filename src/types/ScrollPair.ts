import { RefObject } from "react";
import { FlatList } from "react-native";
import Animated from "react-native-reanimated";

export type ScrollPair = {
  list: RefObject<FlatList>;
  position: Animated.SharedValue<number>;
};
