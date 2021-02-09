import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { FC } from "react";
import Actors from "./Actors";

const Tab = createMaterialTopTabNavigator();

const Profile: FC = () => (
  <Tab.Navigator>
    <Tab.Screen name="Actors 1" component={Actors} />
    <Tab.Screen name="Actors 2" component={Actors} />
  </Tab.Navigator>
);

export default Profile;
