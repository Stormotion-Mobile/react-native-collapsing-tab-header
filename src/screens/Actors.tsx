import React, { FC, memo, useCallback } from "react";
import {
  FlatList,
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
];

const Actors: FC = () => {
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<Actor>>(
    ({ item }) => <ActorItem actor={item} />,
    []
  );

  return (
    <FlatList
      style={styles.container}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default memo(Actors);
