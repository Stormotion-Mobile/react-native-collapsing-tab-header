import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import React, { FC, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  StyleProp,
  Text,
  View,
  ViewProps,
  ViewStyle,
} from "react-native";
import Animated, {
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import TabBar from "../components/TabBar";
import useScrollSync from "../hooks/useScrollSync";
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

  const firstListScrollValue = useSharedValue(0);

  const firstListScrollHandler = useAnimatedScrollHandler(
    (event) => (firstListScrollValue.value = event.contentOffset.y)
  );

  const secondListScrollValue = useSharedValue(0);

  const secondListScrollHandler = useAnimatedScrollHandler(
    (event) => (secondListScrollValue.value = event.contentOffset.y)
  );

  const scrollPairs: ScrollPair[] = [
    { list: firstListRef, position: firstListScrollValue },
    { list: secondListRef, position: secondListScrollValue },
  ];

  const { sync } = useScrollSync(scrollPairs, headerHeight);

  const сurrentScrollValue = useDerivedValue(
    () =>
      tabIndex === 0 ? firstListScrollValue.value : secondListScrollValue.value,
    [tabIndex]
  );

  const translateY = useDerivedValue(
    () => -Math.min(сurrentScrollValue.value, headerHeight)
  );

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const contentContainerStyle: StyleProp<ViewStyle> = {
    paddingTop: rendered ? headerHeight + TAB_BAR : 0,
  };

  const sharedProps: Partial<FlatListProps<Actor>> = {
    contentContainerStyle,
    onMomentumScrollEnd: sync,
    onScrollEndDrag: sync,
    scrollEventThrottle: 16,
  };

  const renderFirstList = () => (
    <Actors
      ref={firstListRef}
      onScroll={firstListScrollHandler}
      {...sharedProps}
    />
  );

  const renderSecondList = () => (
    <Actors
      ref={secondListRef}
      onScroll={secondListScrollHandler}
      {...sharedProps}
    />
  );

  const renderTabBar = (props: MaterialTopTabBarProps) => (
    <Animated.View
      style={[
        rendered
          ? {
              position: "absolute",
              top: headerHeight,
              left: 0,
              right: 0,
              zIndex: 1,
            }
          : undefined,
        tabBarAnimatedStyle,
      ]}
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
        style={[
          rendered
            ? {
                top: 0,
                left: 0,
                right: 0,
                backgroundColor: "blue",
                position: "absolute",
                zIndex: 1,
              }
            : { backgroundColor: "blue" },
          headerAnimatedStyle,
        ]}
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
