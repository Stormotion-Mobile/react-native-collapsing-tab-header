import {
  createMaterialTopTabNavigator,

  MaterialTopTabBarProps
} from "@react-navigation/material-top-tabs";
import React, { FC, useRef, useState } from "react";
import { Animated, FlatList, FlatListProps, StyleProp, Text, View, ViewProps, ViewStyle } from "react-native";
import TabBar from "../components/TabBar";
import useScrollSync from "../hooks/useScrollSync";
import useScrollValue from "../hooks/useScrollValue";
import { Actor } from "../types/Actor";
import { ScrollPair } from "../types/ScrollPair";
import Actors from "./Actors";

export const TAB_BAR = 48;

const Tab = createMaterialTopTabNavigator();

const Profile: FC = () => {
  const firstListRef = useRef<FlatList>(null);
  const secondListRef = useRef<FlatList>(null);

  const [headerHeight, setHeaderHeight] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);

  const rendered = headerHeight !== 0;

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

  const { sync } = useScrollSync(scrollPairs, headerHeight);

  const currentScrollValue = Animated.add(
    Animated.multiply(firstListScrollValue, tabIndex === 0 ? 1 : 0),
    Animated.multiply(secondListScrollValue, tabIndex == 1 ? 1 : 0)
  );

  const translateY = Animated.multiply(-1, currentScrollValue).interpolate({
    inputRange: [-headerHeight, 0],
    outputRange: [-headerHeight, 0],
    extrapolateLeft: "clamp",
  });

  const contentContainerStyle: StyleProp<ViewStyle> = {
    paddingTop: rendered ? headerHeight + TAB_BAR : 0,
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
      style={
        rendered
          ? {
              position: "absolute",
              top: headerHeight,
              left: 0,
              right: 0,
              zIndex: 1,
              transform: [{ translateY }],
            }
          : undefined
      }
    >
      <TabBar onIndexChange={setTabIndex} {...props} />
    </Animated.View>
  );

  const handleHeaderLayout: NonNullable<ViewProps["onLayout"]> = (event) =>
    setHeaderHeight(event.nativeEvent.layout.height);

  return (
    <View style={{ flex: 1 }}>
      <Animated.View
        onLayout={handleHeaderLayout}
        style={
          rendered
            ? {
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "blue",
                position: "absolute",
                transform: [{ translateY }],
                zIndex: 1,
              }
            : { backgroundColor: "blue" }
        }
      >
        <Text style={{ fontSize: 32 }}>
          HEY HELLO HEY HELLOHEY HELLOHEY HELLOHEY HELLOHEY HELLOHEY HELLOHEY
          HELLOHEY HELLOHEY HELLOHEY HELLOHEY HELLOHEY HELLOHEY HELLOHEY
          HELLOHEY HELLO
        </Text>
      </Animated.View>
      <Tab.Navigator tabBar={renderTabBar}>
        <Tab.Screen name="Actors 1">{renderFirstList}</Tab.Screen>
        <Tab.Screen name="Actors 2">{renderSecondList}</Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

export default Profile;
