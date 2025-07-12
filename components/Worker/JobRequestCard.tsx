// components/Worker/JobRequestCard.tsx

import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Alert } from "react-native";

interface Props {
  job: {
    id: string;
    description: string;
    location: string;
    date: string;
    price: string;
    client: string;
  };
}

export default function JobRequestCard({ job }: Props) {
  const [status, setStatus] = useState<"pending" | "accepted" | "declined">("pending");

  const handleAccept = () => {
    setStatus("accepted");
    Alert.alert("Job Accepted", You accepted the job: ${job.description});
  };

  const handleDecline = () => {
    setStatus("declined");
    Alert.alert("Job Declined", You declined the job from ${job.client});
  };

  const getStatusColor = () => {
    switch (status) {
      case "accepted":
        return "#28a745";
      case "declined":
        return "#dc3545";
      default:
        return "#ffc107";
    }
  };

  const getStatusLabel = () => {
    switch (status) {
      case "accepted":
        return "Accepted";
      case "declined":
        return "Declined";
      default:
        return "Pending";
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.title}>{job.description}</Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor() }]}>
          <Text style={styles.statusText}>{getStatusLabel()}</Text>
        </View>
      </View>

      <Text>Location: {job.location}</Text>
      <Text>Date: {job.date}</Text>
      <Text>Budget: ₦{job.price}</Text>
      <Text>Client: {job.client}</Text>

      {status === "pending" && (
        <View style={styles.buttonGroup}>
          <Button title="Accept" onPress={handleAccept} />
          <View style={styles.spacer} />
          <Button title="Decline" color="red" onPress={handleDecline} />
        </View>
      )}
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
  buttonGroup: {
    flexDirection: "row",
    marginTop: 12,
    justifyContent: "space-between",
  },
  spacer: {
    width: 10,
  },
});