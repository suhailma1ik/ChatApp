import React from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, ListItem } from "react-native-elements";

export default function CustomeListItem({ id, chatOpen, chatName }) {
  return (
    <ListItem bottomDivider onPress={() => chatOpen(id, chatName)} id={id}>
      <Avatar
        rounded
        source={{
          uri: "https://avatars.dicebear.com/api/male/seedi.svg",
        }}
      />
      <ListItem.Content>
        <ListItem.Title>{chatName}</ListItem.Title>
        <ListItem.Subtitle>hy</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
}
const styles = StyleSheet.create({});
