import React from 'react';
import { useRouter } from 'expo-router';
import SearchScreen from '../../components/search/SearchScreen';

export default function Page() {
  const router = useRouter ();
  return <SearchScreen />;
}