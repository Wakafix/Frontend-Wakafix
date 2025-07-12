import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";

interface Props {
  onSend: (message: string) => void;
}

export default function ChatInput({ onSend }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText("");
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Type a message..."
        style={styles.input}
        value={text}
        onChangeText={setText}
      />
      <Button title="Send" onPress={handleSend} />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    padding: 8,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 8,
    marginRight: 8,
  },
});