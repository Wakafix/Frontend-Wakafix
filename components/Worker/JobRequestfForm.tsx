// components/Worker/JobRequestForm.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function JobRequestForm() {
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleSubmit = () => {
    if (!description  !location  !price) {
      Alert.alert("Please fill in all fields");
      return;
    }

    Alert.alert("Request Sent", Job: ${description}\nLocation: ${location}\nDate: ${date.toDateString()}\nPrice: ₦${price});
    
    // Reset form
    setDescription("");
    setLocation("");
    setPrice("");
    setDate(new Date());
  };

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
      <Button title={date.toDateString()} onPress={() => setShowPicker(true)} />
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

      <Button title="Send Request" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
    padding: 16,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  label: {
    marginTop: 12,
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 10,
    backgroundColor: "#fff",
  },
});