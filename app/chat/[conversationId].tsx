import React, { useState } from "react";
import { View, FlatList, StyleSheet, SafeAreaView, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import MessageBubble from "@/components/Chat/MessageBubble";
import ChatInput from "@/components/Chat/ChatInput";

export default function ChatPage() {
  const { conversationId } = useLocalSearchParams();
  const [messages, setMessages] = useState([
    { id: "1", text: "Hi, I need a plumber.", sender: "client" },
    { id: "2", text: "Sure, I can help. What's the issue?", sender: "worker" },
  ]);

  const sendMessage = (text: string) => {
    const newMessage = {
      id: Date.now().toString(),
      text,
      sender: "client", // Simulating client for now
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>Conversation: {conversationId}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble text={item.text} sender={item.sender as "client" | "worker"} />
        )}
        contentContainerStyle={styles.messages}
      />
      <ChatInput onSend={sendMessage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  messages: {
    padding: 16,
  },
  header: {
    fontSize: 16,
    fontWeight: "600",
    padding: 12,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
});