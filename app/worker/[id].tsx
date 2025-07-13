import React from "react";
import { View, Text, Button, StyleSheet, ScrollView, Linking } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Header from "@/components/common/Header";

import WorkerReviews from "@/components/Worker/WorkerReviews";
import ReviewForm from "@/components/Worker/ReviewForm";
import JobRequestForm from "@/components/Worker/JobRequestfForm";

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
  const worker = workers[id as keyof typeof workers];

  if (!worker) {
    return (
      <View style={styles.container}>
        <Text>Worker not found</Text>
      </View>
    );
  }

  const handleCall = () => {
    Linking.openURL(`tel:${worker.phone}`);
  };

  const handleWhatsApp = () => {
    const message = `Hello ${worker.name}, I saw your profile on Wakafix and would like to hire you.`;
    const phoneWithCountryCode = `234${worker.phone.slice(1)}`; // Converts 080... to +234...
    Linking.openURL(`https://wa.me/${phoneWithCountryCode}?text=${encodeURIComponent(message)}`);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.name}>{worker.name}</Text>
      <Text style={styles.text}>Bio: {worker.bio}</Text>
      <Text style={styles.text}>Skills: {worker.skills}</Text>
      <Text style={styles.text}>Rating: ⭐ {worker.rating}</Text>

      <View style={styles.buttonGroup}>
        <Button title="Call Worker" onPress={handleCall} />
        <View style={styles.spacer} />
        <Button title="Message on WhatsApp" onPress={handleWhatsApp} />
      </View>

      {/* Review Section */}
      <WorkerReviews /> 
      <ReviewForm />
      <JobRequestForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
  buttonGroup: {
    marginVertical: 16,
  },
  spacer: {
    height: 10,
  },
});
