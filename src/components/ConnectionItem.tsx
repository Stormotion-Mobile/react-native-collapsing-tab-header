import React, { FC, memo, useMemo } from "react";
import { Image, StyleSheet, Text, View, ViewProps } from "react-native";
import { Connection } from "../types/Connection";

export const PHOTO_SIZE = 40;

type Props = Pick<ViewProps, "style"> & {
  connection: Connection;
};

const ConnectionItem: FC<Props> = ({ style, connection }) => {
  const { photo, name } = connection;

  const mergedStyle = useMemo(() => [styles.container, style], [style]);

  return (
    <View style={mergedStyle}>
      <Image style={styles.image} source={{ uri: photo }} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: "center", flexDirection: "row", padding: 16 },
  image: {
    height: PHOTO_SIZE,
    width: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
  },
  name: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default memo(ConnectionItem);
