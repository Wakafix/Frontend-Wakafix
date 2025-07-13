// app/client/history.tsx

import React from "react";
import { View, Text, FlatList, StyleSheet, SafeAreaView } from "react-native";
import ClientJobCard from "@/components/Client/ClientJobCard";

const clientJobs = [
  {
    id: "1",
    description: "Repair electric socket",
    location: "Eliozu",
    date: "2025-07-13",
    price: "7000",
    status: "pending",
  },
  {
    id: "2",
    description: "Fix water pump",
    location: "Rumuokoro",
    date: "2025-07-12",
    price: "12000",
    status: "accepted",
    worker: "Grace Michael",
  },
  {
    id: "3",
    description: "Generator repair",
    location: "GRA",
    date: "2025-07-10",
    price: "15000",
    status: "completed",
    worker: "Samuel Obasi",
  },
];

export default function ClientHistory() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>📖 Your Job Requests</Text>

      <FlatList
        data={clientJobs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ClientJobCard job={item} />}
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