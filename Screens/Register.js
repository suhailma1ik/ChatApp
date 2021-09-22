import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Input } from "react-native-elements";
import { Button } from "react-native-elements";
import { auth } from "../firebase";
export default function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [passWord, setPassWord] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const Register = () => {
    passWord === confirmPassword
      ? auth
          .createUserWithEmailAndPassword(email, passWord)
          .then((authUser) => {
            authUser.user.updateProfile({
              displayName: name,
            });
          })
          .catch((e) => alert(e.message))
      : alert("Confirm password and Password are not same");
  };

  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter your Name"
        onChangeText={(text) => setName(text)}
        value={name}
      ></Input>
      <Input
        placeholder="Enter your Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      ></Input>
      <Input
        placeholder="Enter your Password"
        value={passWord}
        onChangeText={(text) => setPassWord(text)}
      ></Input>
      <Input
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={(text) => setConfirmPassword(text)}
        secureTextEntry
        onSubmitEditing={Register}
        on
      ></Input>
      <Button title="Register" raised onPress={Register}></Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    top: "25%",
    width: "80%",
    justifyContent: "center",
    marginLeft: "10%",
  },
});
