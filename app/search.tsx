// app/search.tsx
import { View, StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import SearchBar from 'components/SearchBar';
import WorkerCard from 'components/WorkerCard';
import { Worker } from 'types/worker';
import { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const dummyWorkers = [
  {
    id: '1',
    name: 'Jane Smith',
    skill: 'Plumber',
    location: 'Lagos',
    priceRange: '₦8,000 - ₦15,000',
    rating: 4.7,
    available: true,
    profileImage: 'https://randomuser.me/api/portraits/women/44.jpg',
    aiRecommended: true, // Fallback dummy flag
  },
  {
    id: '2',
    name: 'David Johnson',
    skill: 'Mechanic',
    location: 'Abuja',
    priceRange: '₦10,000 - ₦18,000',
    rating: 4.3,
    available: false,
    profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
    aiRecommended: false,
  },
];

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedWorkers, setRecommendedWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadCachedData = async () => {
      const cached = await AsyncStorage.getItem('cachedWorkers');
      if (cached) {
        setRecommendedWorkers(JSON.parse(cached));
      }
    };
    loadCachedData();
  }, []);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('https://wakafix-api.onrender.com/predict', {
        service_type: 'cleaner',
        location: 'Abuja',
        time_slot: '12:00PM',
        top_k:3,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
      });

  
      const recommended = response.data?.recommendedWorkers || [];

      // Add aiRecommended: true to each recommended worker
      const tagged = recommended.map((worker: Worker) => ({
        ...worker,
        aiRecommended: true,
      }));

      setRecommendedWorkers(tagged);

      await AsyncStorage.setItem('cachedWorkers', JSON.stringify(tagged));
    } catch (err) {
      console.error(err);
      setError('You’re offline or the AI service failed. Showing offline data.');

      setRecommendedWorkers(dummyWorkers); // Fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      {!loading && !error && recommendedWorkers.length === 0 ? (
        <Text style={styles.noResultsText}>No workers found.</Text>
      ) : (
        <FlatList
          data={recommendedWorkers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => <WorkerCard worker={item} />}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#666',
  },
});