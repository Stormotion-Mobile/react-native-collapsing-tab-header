import React, { FC, memo, useMemo } from "react";
import { StyleSheet, Text, View, ViewProps } from "react-native";

type Props = Pick<ViewProps, "style"> & { name: string };

const HeaderOverlay: FC<Props> = ({ style, name }) => {
  const containerStyle = useMemo(() => [styles.container, style], [style]);

  return (
    <View style={containerStyle}>
      <Text style={styles.title}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  title: {
    fontSize: 24,
  },
});

export default memo(HeaderOverlay);
