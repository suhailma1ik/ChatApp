import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Text } from "react-native-elements";
import { Button } from "react-native-elements";
import { auth } from "../firebase";
export default function Login({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: "#38A3A5",
        headerTitleAlign: "center",
      },
    });
  }, [navigation]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    });
    return unsubscribe;
  }, []);
  const signIn = () => {
    auth.signInWithEmailAndPassword(email, password);
  };
  return (
    <View style={styles.container}>
      <View style={styles.view}>
        <Input
          value={email}
          placeholder="Enter your Email"
          onChangeText={(text) => {
            setEmail(text);
          }}
        ></Input>
        <Input
          value={password}
          placeholder="Enter your password"
          secureTextEntry
          onChangeText={(text) => {
            setPassword(text);
          }}
        ></Input>
        <Button title="Login" onPress={signIn} raised />
        <Text style={styles.divider}>OR</Text>
        <Button
          onPress={() => {
            navigation.navigate("Register");
          }}
          title="Register"
          type="outline"
          raised
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: "30%",
    width: "80%",
    justifyContent: "center",
    marginLeft: "10%",
  },
  view: {},
  divider: {
    marginLeft: "48%",
  },
});
