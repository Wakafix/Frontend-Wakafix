// components/Worker/WorkerReviews.tsx

import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Rating from "../common/RatingStars";

const dummyReviews = [
  { id: "1", name: "Jane Doe", rating: 5, comment: "Amazing service!" },
  { id: "2", name: "John Smith", rating: 4, comment: "Great job, but arrived a bit late." },
];

export default function WorkerReviews() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reviews</Text>
      <FlatList
        data={dummyReviews}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Rating rating={item.rating} />
            <Text style={styles.comment}>{item.comment}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, padding: 16 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 12 },
  reviewCard: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
    elevation: 2,
  },
  name: { fontWeight: "bold", marginBottom: 4 },
  comment: { marginTop: 4 },
});
