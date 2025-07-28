import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Worker } from '@/types/worker'; // Assuming you have a Worker type defined

type Props = {
  worker: Worker;
};

const WorkerCard: React.FC<Props> = ({ worker }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: worker.profileImage }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{worker.name}</Text>
        <Text style={styles.skill}>Skill: {worker.skill}</Text>
        <Text style={styles.location}>Location: {worker.location}</Text>
        <Text style={styles.price}>Price: {worker.priceRange}</Text>
        <Text style={styles.rating}>Rating: ⭐️ {worker.rating}</Text>
        <Text style={[styles.availability, { color: worker.available ? 'green' : 'red' }]}>
          {worker.available ? 'Available' : 'Unavailable'}
        </Text>
      </View>
    </View>
  );
};

export default WorkerCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 12,
  },
  info: {
    flex: 1,
    justifyContent: 'space-around',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  skill: {
    fontSize: 14,
    color: '#333',
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  price: {
    fontSize: 14,
    color: '#444',
  },
  rating: {
    fontSize: 14,
    color: '#ffaa00',
  },
  availability: {
    fontSize: 14,
    fontWeight: '600',
  },
});