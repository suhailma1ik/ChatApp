import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import firebase from "firebase/app";
import { Ionicons } from "@expo/vector-icons";
import { Avatar, Input } from "react-native-elements";
import { SafeAreaView } from "react-native-safe-area-context";
import { db, auth } from "../firebase";

export default function Chat({ navigation, route }) {
  const [message, setMessage] = useState("");
  const [textm, setTextm] = useState([]);
  const sendMessage = () => {
    message === ""
      ? console.log(message)
      : db.collection("chats").doc(route.params.id).collection("messages").add({
          message: message,
          displayName: auth.currentUser.displayName,
          timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          email: auth.currentUser.email,
        });
    setMessage("");
  };
  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp")
      .onSnapshot((snapshpt) =>
        setTextm(
          snapshpt.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    return unsubscribe;
  }, []);
  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitle: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginLeft: "-15%",
          }}
        >
          <Avatar
            rounded
            source={{
              uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg",
            }}
          />
          <Text style={{ marginLeft: "10%" }}>{route.params.chatName}</Text>
        </View>
      ),
    });
  }, [navigation]);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <>
          <ScrollView>
            {textm.map(({ id, data }) =>
              data.email === auth.currentUser.email ? (
                <View style={styles.sender}>
                  <Text>{data.message}</Text>
                </View>
              ) : (
                <View style={styles.reciver}>
                  <Text>{data.message}</Text>
                </View>
              )
            )}
          </ScrollView>
          <View style={styles.footer}>
            <TextInput
              style={styles.input}
              placeholder="type message"
              value={message}
              onChangeText={(text) => setMessage(text)}
              onSubmitEditing={sendMessage}
            />
            <TouchableOpacity onPress={sendMessage}>
              <Ionicons name="send" size={24} color="#38A3A5" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  input: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    backgroundColor: "#ECECEC",
    padding: 10,
    color: "black",
    borderRadius: 30,
    // #22577A
    // #38A3A5
    // #57CC99
    // #80ED99
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    width: "100%",
  },
  sender: {
    padding: 5,
    backgroundColor: "#889EAF",
    alignSelf: "flex-end",
    borderRadius: 7,
    marginBottom: 5,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
  },
  reciver: {
    padding: 5,
    backgroundColor: "#FEFBF3",
    alignSelf: "flex-start",
    marginBottom: 5,
    borderRadius: 7,
    marginRight: 15,
    maxWidth: "80%",
    position: "relative",
  },
});
