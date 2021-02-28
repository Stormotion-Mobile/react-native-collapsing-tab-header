import React, { forwardRef, memo, useCallback } from "react";
import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
} from "react-native";
import Animated from "react-native-reanimated";
import ConnectionItem from "./ConnectionItem";
import { Connection } from "../types/Connection";

export const AnimatedFlatList: typeof FlatList = Animated.createAnimatedComponent(
  FlatList
);

type Props = Omit<FlatListProps<Connection>, "renderItem">;

const ConnectionList = forwardRef<FlatList, Props>((props, ref) => {
  const keyExtractor = useCallback((_, index) => index.toString(), []);

  const renderItem = useCallback<ListRenderItem<Connection>>(
    ({ item }) => <ConnectionItem connection={item} />,
    []
  );

  return (
    <AnimatedFlatList
      ref={ref}
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      {...props}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
});

export default memo(ConnectionList);
