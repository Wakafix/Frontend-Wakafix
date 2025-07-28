// ReviewList.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { Review } from '@/types/review';

type Props = {
  reviews: Review[];
};

export const ReviewList = ({ reviews }: Props) => (
  <View>
    {reviews.map((item) => (
      <View key={item.id} className="border-b p-3">
        <Text className="font-bold">{item.reviewerName}</Text>
        <Text className="text-yellow-500">⭐️ {item.rating}</Text>
        <Text>{item.comment}</Text>
        <Text className="text-xs text-gray-500">{item.date}</Text>
      </View>
    ))}
  </View>
);