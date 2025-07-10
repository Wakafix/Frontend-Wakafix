// components/Worker/ReviewForm.tsx

import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import RatingStars from "../common/RatingStars";

export default function ReviewForm() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = () => {
    if (!comment || rating === 0) {
      Alert.alert("Please provide both a rating and a comment.");
      return;
    }

    // Placeholder logic — integrate with backend later
    Alert.alert("Review Submitted!", `Rating: ${rating}\nComment: ${comment}`);
    setRating(0);
    setComment("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leave a Review</Text>
      <RatingStars rating={rating} setRating={setRating} editable />
      <TextInput
        style={styles.input}
        placeholder="Write your review..."
        value={comment}
        onChangeText={setComment}
        multiline
      />
      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 20, padding: 16, backgroundColor: "#f9f9f9", borderRadius: 8 },
  title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
  input: {
    height: 100,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 12,
    padding: 8,
    textAlignVertical: "top",
    borderRadius: 6,
    backgroundColor: "#fff",
  },
});
