import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

const dummyWorkers = [
  {
    id: '1',
    name: 'Jane Smith',
    bio: 'Experienced plumber with over 7 years of solving water and pipe issues across Port Harcourt.',
    skills: ['Plumbing', 'Pipe Repair', 'Leak Detection'],
    location: {
      address: 'Port Harcourt',
      latitude: 4.8156,
      longitude: 7.0498,
    },
    priceRange: '₦5,000 - ₦15,000',
    rating: 4.8,
    phoneNumber: '+2347012345678',
    profileImage: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
  {
    id: '2',
    name: 'John Doe',
    bio: 'Certified electrician with quick and reliable services across PH.',
    skills: ['Electrical Wiring', 'Installation', 'Maintenance'],
    location: {
      address: 'Port Harcourt',
      latitude: 4.8200,
      longitude: 7.0500,
    },
    priceRange: '₦8,000 - ₦20,000',
    rating: 4.6,
    phoneNumber: '+2348098765432',
    profileImage: 'https://randomuser.me/api/portraits/men/45.jpg',
  },
  {
    id: '3',
    name: 'Blessing Ada',
    bio: 'Professional cleaner and home care specialist.',
    skills: ['Cleaning', 'Laundry', 'Home Arrangement'],
    location: {
      address: 'Lagos',
      latitude: 4.8100,
      longitude: 7.0600,
    },
    priceRange: '₦3,000 - ₦10,000',
    rating: 4.9,
    phoneNumber: '+2348134567890',
    profileImage: 'https://randomuser.me/api/portraits/women/22.jpg',
  },
];

const Profiles = () => {
const router = useRouter();

 const handleProfileClick = (worker: any) => {
  router.push({
    pathname: '/(screen)/TrackWorkerScreen',
    params: {
      lat: String(worker.location.latitude),
      lng: String(worker.location.longitude),
      name: worker.name,
      profileImage: worker.profileImage,
    },
  });
};

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Available Workers</Text>
      {dummyWorkers.map((worker) => (
        <TouchableOpacity key={worker.id} style={styles.card} onPress={() => handleProfileClick(worker)}>
          <Image source={{ uri: worker.profileImage }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.name}>{worker.name}</Text>
            <Text style={styles.location}>{worker.location.address}</Text>
            <Text style={styles.location}>{worker.location.longitude}</Text>
            <Text style={styles.location}>{worker.location.latitude}</Text>
            <Text style={styles.rating}>⭐ {worker.rating}</Text>
            <Text numberOfLines={2} style={styles.bio}>{worker.bio}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default Profiles;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  location: {
    color: '#666',
    fontSize: 13,
  },
  rating: {
    fontSize: 13,
    color: '#888',
  },
  bio: {
    fontSize: 12,
    marginTop: 4,
    color: '#444',
  },
});