import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";

// Example data
const workers = {
  "1": {
    name: "Grace Michael",
    bio: "Experienced electrician and solar installer.",
    skills: "Electrician, Solar Install",
    rating: 4.8,
    phone: "08012345678",
  },
  "2": {
    name: "Samuel Obasi",
    bio: "Professional plumber, fast and reliable.",
    skills: "Plumber",
    rating: 4.5,
    phone: "08087654321",
  },
};

export default function WorkerProfile() {
  const { id } = useLocalSearchParams();
  const worker = workers[id];

  if (!worker) {
    return (
      <View style={styles.container}>
        <Text>Worker not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{worker.name}</Text>
      <Text style={styles.text}>Bio: {worker.bio}</Text>
      <Text style={styles.text}>Skills: {worker.skills}</Text>
      <Text style={styles.text}>Rating: ⭐ {worker.rating}</Text>
      <Button title="Call Worker" onPress={() => {}} />
      <Button title="Message on WhatsApp" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 6,
  },
});