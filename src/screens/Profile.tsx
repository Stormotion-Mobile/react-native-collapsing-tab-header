import {
  createMaterialTopTabNavigator,
  MaterialTopTabBar,
  MaterialTopTabBarProps,
} from "@react-navigation/material-top-tabs";
import React, { FC } from "react";
import { Animated, StyleProp, View, ViewStyle } from "react-native";
import Actors from "./Actors";

export const HEADER_HEIGHT = 150;
export const TAB_BAR = 48;

const Tab = createMaterialTopTabNavigator();

const Profile: FC = () => {
  const contentContainerStyle: StyleProp<ViewStyle> = {
    paddingTop: HEADER_HEIGHT + TAB_BAR,
  };

  const renderFirstList = () => (
    <Actors contentContainerStyle={contentContainerStyle} />
  );

  const renderSecondList = () => (
    <Actors contentContainerStyle={contentContainerStyle} />
  );

  const renderTabBar = (props: MaterialTopTabBarProps) => (
    <Animated.View
      style={{
        position: "absolute",
        top: HEADER_HEIGHT,
        left: 0,
        right: 0,
        zIndex: 1,
      }}
    >
      <MaterialTopTabBar {...props} />
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
        }}
      />
    </View>
  );
};

export default Profile;
