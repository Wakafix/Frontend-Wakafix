import React from "react";
import { View, Text, StyleSheet } from "react-native";

interface Props {
  text: string;
  sender: "client" | "worker";
}

export default function MessageBubble({ text, sender }: Props) {
  const isClient = sender === "client";

  return (
    <View style={[styles.bubbleContainer, isClient ? styles.client : styles.worker]}>
      <Text style={styles.bubbleText}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bubbleContainer: {
    maxWidth: "75%",
    padding: 10,
    marginVertical: 4,
    borderRadius: 10,
  },
  client: {
    backgroundColor: "#e1f5fe",
    alignSelf: "flex-start",
  },
  worker: {
    backgroundColor: "#d1ffd7",
    alignSelf: "flex-end",
  },
  bubbleText: {
    fontSize: 15,
  },
});