// components/SubmitReview.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

type Props = {
  onSubmit: (rating: number, comment: string) => void;
};

export const SubmitReview = ({ onSubmit }: Props) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    onSubmit(rating, comment);
    setComment('');
    setRating(0);
  };

  return (
    <View className="p-4">
      <Text className="text-lg font-semibold">Leave a Review</Text>
      <AirbnbRating
        count={5}
        defaultRating={0}
        onFinishRating={setRating}
        showRating={false}
        size={20}
      />
      <TextInput
        placeholder="Write your feedback..."
        className="border p-2 rounded my-2"
        value={comment}
        onChangeText={setComment}
      />
      <Button title="Submit Review" onPress={handleSubmit} />
    </View>
  );
};