import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import React, { FC, useRef, useState } from "react";
import { FlatList, FlatListProps } from "react-native";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import TabBar from "../components/TabBar";
import useScrollSync from "../hooks/useScrollSync";
import useScrollValue from "../hooks/useScrollValue";
import { Actor } from "../types/Actor";
import { ScrollPair } from "../types/ScrollPair";
import Actors from "./Actors";

export const HEADER_HEIGHT = 150;
export const TAB_BAR = 48;

const Tab = createMaterialTopTabNavigator();

const Profile: FC = () => {
  const firstListRef = useRef<FlatList>(null);
  const secondListRef = useRef<FlatList>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const [
    firstListScrollValue,
    firstListPosition,
    handleFirstListScroll,
  ] = useScrollValue(0);
  const [
    secondListScrollValue,
    secondListPosition,
    handleSecondListScroll,
  ] = useScrollValue(0);

  const scrollPairs: ScrollPair[] = [
    { list: firstListRef, position: firstListPosition },
    { list: secondListRef, position: secondListPosition },
  ];

  const { sync } = useScrollSync(scrollPairs);

  const currentScrollValue = Animated.add(
    Animated.multiply(firstListScrollValue, tabIndex === 0 ? 1 : 0),
    Animated.multiply(secondListScrollValue, tabIndex == 1 ? 1 : 0)
  );

  const translateY = Animated.multiply(-1, currentScrollValue).interpolate({
    inputRange: [-HEADER_HEIGHT, 0],
    outputRange: [-HEADER_HEIGHT, 0],
    extrapolateLeft: "clamp",
  });

  const contentContainerStyle: StyleProp<ViewStyle> = {
    paddingTop: HEADER_HEIGHT + TAB_BAR,
  };

  const sharedProps: Partial<FlatListProps<Actor>> = {
    contentContainerStyle,
    onMomentumScrollEnd: sync,
    onScrollEndDrag: sync,
  };

  const renderFirstList = () => (
    <Actors
      ref={firstListRef}
      onScroll={handleFirstListScroll}
      {...sharedProps}
    />
  );

  const renderSecondList = () => (
    <Actors
      ref={secondListRef}
      onScroll={handleSecondListScroll}
      {...sharedProps}
    />
  );

  const renderTabBar = (props: MaterialTopTabBarProps) => (
    <Animated.View
      style={{
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 1,
        transform: [{ translateY }],
      }}
    >
      <TabBar onIndexChange={setTabIndex} {...props} />
    </Animated.View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator tabBar={renderTabBar}>
        <Tab.Screen name="Actors 1">{renderFirstList}</Tab.Screen>
        <Tab.Screen name="Actors 2">{renderSecondList}</Tab.Screen>
      </Tab.Navigator>
      <Animated.View
        style={{
          top: 0,
          left: 0,
          right: 0,
          backgroundColor: "blue",
          position: "absolute",
          height: HEADER_HEIGHT,
          transform: [{ translateY }],
        }}
      />
    </View>
  );
};

export default Profile;
