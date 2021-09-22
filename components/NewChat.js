import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Button, Input } from "react-native-elements";
import { db } from "../firebase";

export default function NewChat({ navigation }) {
  const [chat, setChat] = useState("");
  const createNewChat = async () => {
    await db
      .collection("chats")
      .add({ chatName: chat })
      .then(() => {
        navigation.goBack();
      })
      .catch((e) => alert(e));
  };
  return (
    <View style={styles.container}>
      <Input
        placeholder="Enter Chat Name"
        value={chat}
        onChangeText={(text) => setChat(text)}
        onSubmitEditing={createNewChat}
      ></Input>
      <Button title="Add Chat" onPress={createNewChat}></Button>
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
});
