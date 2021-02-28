import React, { FC, memo, useMemo } from "react";
import {
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
  ViewProps,
} from "react-native";

export const PHOTO_SIZE = 120;

type Props = Pick<ViewProps, "style"> & {
  photo: string;
  name: string;
  bio: string;
};

const Header: FC<Props> = ({ style, name, photo, bio }) => {
  const containerStyle = useMemo(() => [styles.container, style], []);

  const photoSource = useMemo<ImageProps["source"]>(() => ({ uri: photo }), []);

  return (
    <View style={containerStyle}>
      <Image style={styles.photo} source={photoSource} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: { marginLeft: 24, justifyContent: "center", flex: 1 },
  name: { fontSize: 24, fontWeight: "700" },
  bio: { fontSize: 15, marginTop: 4 },
  photo: {
    height: PHOTO_SIZE,
    width: PHOTO_SIZE,
    borderRadius: PHOTO_SIZE / 2,
  },
  container: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 24,
  },
});

export default memo(Header);
