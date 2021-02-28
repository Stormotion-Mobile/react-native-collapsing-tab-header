import { NavigationContainer } from "@react-navigation/native";
import React, { FC } from "react";
import { StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Connection from "./src/screens/Profile";

const App: FC = () => (
  <SafeAreaProvider>
    <NavigationContainer>
      <Connection />
    </NavigationContainer>
  </SafeAreaProvider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
});

export default App;
