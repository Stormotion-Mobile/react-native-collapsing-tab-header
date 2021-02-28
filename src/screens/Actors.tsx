import React, { FC, forwardRef, memo, useCallback } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import ActorItem from "../components/ActorItem";
import { Actor } from "../types/Actor";

export const AnimatedFlatList: typeof FlatList = Animated.createAnimatedComponent(
  FlatList
);

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

type Props = Omit<FlatListProps<Actor>, "renderItem" | "data">;

const Actors = forwardRef<FlatList, Props>((props, ref) => {
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<Actor>>(
    ({ item }) => <ActorItem actor={item} />,
    []
  );

  return (
    <AnimatedFlatList
      ref={ref}
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(Actors);
