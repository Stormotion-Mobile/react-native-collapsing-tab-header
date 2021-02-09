import React, { FC, memo, useCallback } from "react";
import {
  Animated,
  FlatList,
  FlatListProps,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import ActorItem from "../components/ActorItem";
import { Actor } from "../types/Actor";

const data: Actor[] = [
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Morgan Freeman",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Benedict Cumberbatch",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Jack Nicholson",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Christian Bale",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Keanu Reeves",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Morgan Freeman",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Benedict Cumberbatch",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Jack Nicholson",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Christian Bale",
  },
  {
    photo: "https://reactnative.dev/img/tiny_logo.png",
    name: "Keanu Reeves",
  },
];

const Actors: FC<Omit<FlatListProps<Actor>, "renderItem" | "data">> = (
  props
) => {
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<Actor>>(
    ({ item }) => <ActorItem actor={item} />,
    []
  );

  return (
    <Animated.FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(Actors);
