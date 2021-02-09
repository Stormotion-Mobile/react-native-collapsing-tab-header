import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import Profile from "./src/screens/Profile";

const App: FC = () => (
  <SafeAreaView style={styles.container}>
    <NavigationContainer>
      <Profile />
    </NavigationContainer>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
