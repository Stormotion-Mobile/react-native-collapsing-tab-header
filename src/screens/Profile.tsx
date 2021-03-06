import {
  createMaterialTopTabNavigator,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import React, { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import {
  FlatList,
  FlatListProps,
  StyleProp,
  StyleSheet,
  View,
  ViewProps,
  ViewStyle,
  Text,
  useWindowDimensions,
} from "react-native";
import Animated, {
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
} from "react-native-reanimated";
import Header from "../components/Header";
import TabBar from "../components/TabBar";
import useScrollSync from "../hooks/useScrollSync";
import ConnectionList from "../components/ConnectionList";
import { Connection } from "../types/Connection";
import { ScrollPair } from "../types/ScrollPair";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FRIENDS, SUGGESTIONS } from "../mocks/connections";
import { HeaderConfig } from "../types/HeaderConfig";
import { Visibility } from "../types/Visibility";

const TAB_BAR_HEIGHT = 48;
const HEADER_HEIGHT = 48;

const OVERLAY_VISIBILITY_OFFSET = 32;

const Tab = createMaterialTopTabNavigator();

const Profile: FC = () => {
  const { top, bottom } = useSafeAreaInsets();

  const { height: screenHeight } = useWindowDimensions();

  const firstListRef = useRef<FlatList>(null);
  const secondListRef = useRef<FlatList>(null);

  const [tabIndex, setTabIndex] = useState(0);

  const [headerHeight, setHeaderHeight] = useState(0);

  const defaultHeaderHeight = top + HEADER_HEIGHT;

  const headerConfig = useMemo<HeaderConfig>(
    () => ({
      heightCollapsed: defaultHeaderHeight,
      heightExpanded: headerHeight,
    }),
    []
  );

  const { heightCollapsed, heightExpanded } = headerConfig;

  const headerDiff = heightExpanded - heightCollapsed;

  const rendered = headerHeight > 0;

  const handleHeaderLayout = useCallback<NonNullable<ViewProps["onLayout"]>>(
    (event) => setHeaderHeight(event.nativeEvent.layout.height),
    []
  );

  const firstListScrollValue = useSharedValue(0);

  const firstListScrollHandler = useAnimatedScrollHandler(
    (event) => (firstListScrollValue.value = event.contentOffset.y)
  );

  const secondListScrollValue = useSharedValue(0);

  const secondListScrollHandler = useAnimatedScrollHandler(
    (event) => (secondListScrollValue.value = event.contentOffset.y)
  );

  const scrollPairs = useMemo<ScrollPair[]>(
    () => [
      { list: firstListRef, position: firstListScrollValue },
      { list: secondListRef, position: secondListScrollValue },
    ],
    [firstListRef, firstListScrollValue, secondListRef, secondListScrollValue]
  );

  const { sync } = useScrollSync(scrollPairs, headerConfig);

  const сurrentScrollValue = useDerivedValue(
    () =>
      tabIndex === 0 ? firstListScrollValue.value : secondListScrollValue.value,
    [tabIndex]
  );

  const translateY = useDerivedValue(
    () => -Math.min(сurrentScrollValue.value, headerDiff)
  );

  const tabBarAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const headerAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
    opacity: interpolate(
      translateY.value,
      [-headerDiff, 0],
      [Visibility.Hidden, Visibility.Visible]
    ),
  }));

  const contentContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => ({
      paddingTop: rendered ? headerHeight + TAB_BAR_HEIGHT : 0,
      paddingBottom: bottom,
      minHeight: screenHeight + headerDiff,
    }),
    [rendered, headerHeight, bottom]
  );

  const sharedProps = useMemo<Partial<FlatListProps<Connection>>>(
    () => ({
      contentContainerStyle,
      onMomentumScrollEnd: sync,
      onScrollEndDrag: sync,
      scrollEventThrottle: 16,
      scrollIndicatorInsets: { top: heightExpanded },
    }),
    [contentContainerStyle, sync]
  );

  const renderFriends = useCallback(
    () => (
      <ConnectionList
        ref={firstListRef}
        data={FRIENDS}
        onScroll={firstListScrollHandler}
        {...sharedProps}
      />
    ),
    [firstListRef, firstListScrollHandler, sharedProps]
  );

  const renderSuggestions = useCallback(
    () => (
      <ConnectionList
        ref={secondListRef}
        data={SUGGESTIONS}
        onScroll={secondListScrollHandler}
        {...sharedProps}
      />
    ),
    [secondListScrollHandler, sharedProps]
  );

  const tabBarStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.tabBarContainer : undefined,
      { top: rendered ? headerHeight : undefined },
      tabBarAnimatedStyle,
    ],
    [rendered, headerHeight, tabBarAnimatedStyle]
  );

  const renderTabBar = useCallback<
    (props: MaterialTopTabBarProps) => React.ReactElement
  >(
    (props) => (
      <Animated.View style={tabBarStyle}>
        <TabBar onIndexChange={setTabIndex} {...props} />
      </Animated.View>
    ),
    [tabBarStyle, headerHeight, rendered]
  );

  const headerContainerStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      rendered ? styles.headerContainer : undefined,
      { paddingTop: top },
      headerAnimatedStyle,
    ],

    [rendered, headerHeight, headerAnimatedStyle]
  );

  const collapsedOverlayAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      translateY.value,
      [-headerDiff, OVERLAY_VISIBILITY_OFFSET - headerDiff, 0],
      [Visibility.Visible, Visibility.Hidden, Visibility.Hidden]
    ),
  }));

  const collapsedOverlayStyle = useMemo<StyleProp<ViewStyle>>(
    () => [
      styles.collapsedOvarlay,
      collapsedOverlayAnimatedStyle,
      { height: heightCollapsed, paddingTop: top },
    ],
    [collapsedOverlayAnimatedStyle, heightCollapsed]
  );

  return (
    <View style={styles.container}>
      <Animated.View onLayout={handleHeaderLayout} style={headerContainerStyle}>
        <Header
          name="Emily Davis"
          bio="Let's get started 🚀"
          photo={"https://picsum.photos/id/1027/300/300"}
        />
      </Animated.View>
      <Animated.View style={collapsedOverlayStyle}>
        <Text style={styles.overlayName}>Emily Davis</Text>
      </Animated.View>
      <Tab.Navigator tabBar={renderTabBar}>
        <Tab.Screen name="Friends">{renderFriends}</Tab.Screen>
        <Tab.Screen name="Suggestions">{renderSuggestions}</Tab.Screen>
      </Tab.Navigator>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  tabBarContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
  },
  overlayName: {
    fontSize: 24,
  },
  collapsedOvarlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  headerContainer: {
    top: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 1,
  },
});

export default memo(Profile);
