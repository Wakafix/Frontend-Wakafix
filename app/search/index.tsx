import React from 'react';
import { useRouter } from 'expo-router';
import SearchScreen from '../../components/SearchScreen';

export default function Page() {
  const router = useRouter ();
  return <SearchScreen />;
}