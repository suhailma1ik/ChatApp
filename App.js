import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./Screens/Login";
import Home from "./Screens/Home";
import Register from "./Screens/Register";
import Chat from "./Screens/Chat";
import { MenuProvider } from "react-native-popup-menu";
import NewChat from "./components/NewChat";

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: {
    backgroundColor: "#38A3A5",
  },
  headerTintColor: "black",
};

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator screenOptions={globalScreenOptions}>
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="NewChat" component={NewChat} />
        </Stack.Navigator>
      </NavigationContainer>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
// colorscheme
// #22577A
// #38A3A5
// #57CC99
// #80ED99
