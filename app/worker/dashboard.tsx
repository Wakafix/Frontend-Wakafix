// app/worker/dashboard.tsx

import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import JobRequestCard from "@/components/Worker/JobRequestCard";

const dummyRequests = [
  {
    id: "job1",
    description: "Fix leaking sink",
    location: "Rumuokoro, Port Harcourt",
    date: "2025-07-12",
    price: "10000",
    client: "Amaka O.",
  },
  {
    id: "job2",
    description: "Install solar inverter",
    location: "GRA Phase 3",
    date: "2025-07-14",
    price: "45000",
    client: "Tunde F.",
  },
];

export default function WorkerDashboard() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📋 Job Requests</Text>

      <FlatList
        data={dummyRequests}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <JobRequestCard job={item} />}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f2f2f2",
    flex: 1,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
});