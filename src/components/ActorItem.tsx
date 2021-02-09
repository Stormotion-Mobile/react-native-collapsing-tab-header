import React, { FC, memo, useMemo } from "react";
import { Image, StyleSheet, Text, View, ViewProps } from "react-native";
import { Actor } from "../types/Actor";

type Props = Pick<ViewProps, "style"> & {
  actor: Actor;
};

const ActorItem: FC<Props> = ({ style, actor }) => {
  const { photo, name } = actor;

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
  image: { height: 40, width: 40, borderRadius: 20 },
  name: {
    marginLeft: 8,
    fontSize: 15,
    fontWeight: "500",
  },
});

export default memo(ActorItem);
