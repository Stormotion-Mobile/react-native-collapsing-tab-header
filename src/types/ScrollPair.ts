import { RefObject } from "react";
import { FlatList } from "react-native";

export type ScrollPair = {
  list: RefObject<FlatList>;
  position: RefObject<number>;
};
