// components/Client/ClientJobCard.tsx

import React from "react";
import { View, Text, StyleSheet } from "react-native";
type JobStatus = "pending" | "accepted" | "declined" | "completed";

interface Jobs {
    id: string;
    description: string;
    location: string;
    date: string;
    price: string;
    status: string;
    worker?: string;
  };


export default function ClientJobCard({ job }: { job: Jobs }) {
  const getStatusColor = () => {
    switch (job.status) {
      case "accepted":
        return "#28a745";
      case "declined":
        return "#dc3545";
      case "completed":
        return "#0d6efd";
      default:
        return "#ffc107";
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{job.description}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{job.status.toUpperCase()}</Text>
        </View>
      </View>

      <Text>Location: {job.location}</Text>
      <Text>Date: {job.date}</Text>
      <Text>Budget: ₦{job.price}</Text>
      {job.worker && <Text>Assigned to: {job.worker}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
    elevation: 3,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 6,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
});