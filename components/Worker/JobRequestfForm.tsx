import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  useColorScheme,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function JobRequestForm() {
  const colorScheme = useColorScheme(); // detect light or dark mode
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = () => {
    if (!description || !location || !price) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }


    Alert.alert(
      "Request Sent",
      `Job: ${description}\nLocation: ${location}\nDate: ${date.toDateString()}\nPrice: ₦${price}`
    );

    // Reset form
    setDescription("");
    setLocation("");
    setPrice("");
    setDate(new Date());
  };

  const styles = getStyles(colorScheme ?? "light"); // use dynamic styles

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Book This Worker</Text>

      <Text style={styles.label}>Job Description</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Install new solar panel"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Preferred Date & Time</Text>
      <Button title={date.toLocaleString()} onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="datetime"
          display="default"
          onChange={(event, selectedDate) => {
            setShowPicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}

      <Text style={styles.label}>Location</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. Port Harcourt, Rivers"
        value={location}
        onChangeText={setLocation}
      />

      <Text style={styles.label}>Budget / Price Range (₦)</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g. 20000"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />

      <View style={{ marginTop: 16 }}>
        <Button title="Send Request" onPress={handleSubmit} />
      </View>
    </View>
  );
}

// 🔧 Reusable function for light/dark mode styling
const getStyles = (theme: "light" | "dark" | null) =>
  StyleSheet.create({
    container: {
      marginTop: 24,
      padding: 16,
      backgroundColor: theme === "dark" ? "#1c1c1e" : "#f0f0f0",
      borderRadius: 12,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 12,
      color: theme === "dark" ? "#fff" : "#000",
    },
    label: {
      marginTop: 12,
      marginBottom: 4,
      fontWeight: "600",
      color: theme === "dark" ? "#ddd" : "#333",
    },
    input: {
      borderWidth: 1,
      borderColor: "#ccc",
      borderRadius: 6,
      padding: 10,
      backgroundColor: theme === "dark" ? "#2c2c2e" : "#fff",
      color: theme === "dark" ? "#fff" : "#000",
    },
  });