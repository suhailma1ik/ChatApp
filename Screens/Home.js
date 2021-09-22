import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "react-native-elements";
import { Entypo } from "@expo/vector-icons";
import CustomeListItem from "../components/CustomeListItem";
import { auth, db } from "../firebase";
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from "react-native-popup-menu";

export default function Home({ navigation }) {
  const [chats, setChats] = useState([]);
  const [bol, setBol] = useState(false);
  const Logout = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };
  const AddChat = () => {
    navigation.navigate("NewChat");
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Menu>
          <MenuTrigger
            text={<Entypo name="dots-three-vertical" size={24} color="black" />}
          />
          <MenuOptions>
            <MenuOption
              onSelect={Logout}
              text="LogOut"
              style={{ padding: "5%" }}
            />
            <MenuOption onSelect={AddChat} style={{ padding: "5%" }}>
              <Text style={{ color: "#38A3A5" }}>AddChat</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      ),
    });
  }, [navigation]);
  const chatOpen = (id, chatName) => {
    navigation.navigate("Chat", { id, chatName });
  };
  return (
    <View>
      <ScrollView>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomeListItem id={id} chatOpen={chatOpen} chatName={chatName} />
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({});
