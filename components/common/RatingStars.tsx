// components/common/RatingStars.tsx

import React from "react";
import { View, Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface Props {
  rating: number;
  setRating?: (rating: number) => void;
  editable?: boolean;
}

const RatingStars =({ rating, setRating, editable = false }: Props) => {
  return (
    <View style={styles.starContainer}>
      {[1, 2, 3, 4, 5].map((star) => (
        <Pressable
          key={star}
          onPress={() => editable && setRating?.(star)}
          disabled={!editable}
        >
          <FontAwesome
            name={star <= rating ? "star" : "star-o"}
            size={24}
            color="#FFD700"
            style={styles.star}
          />
        </Pressable>
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  starContainer: { flexDirection: "row", marginVertical: 8 },
  star: { marginRight: 4 },
});
export default RatingStars;