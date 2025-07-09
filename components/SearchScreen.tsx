import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Touchable,
} from "react-native";
import { useRouter } from "expo-router";

const workers = [
  {
    id: "1",
    name: "Grace Michael",
    rating: 4.8,
    priceRange: "₦10,000 - ₦15,000",
    skills: "Electrician, Solar Install",
    availability: "Available",
    travelTime: "20 mins",
  },
  {
    id: "2",
    name: "Samuel Obasi",
    rating: 4.5,
    priceRange: "₦8,000 - ₦12,000",
    skills: "Plumber",
    availability: "Busy",
    travelTime: "45 mins",
  },
  // Add more workers as needed
];

export default function SearchScreen() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const filteredWorkers = workers.filter((worker) =>
    worker.skills.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Service Expert</Text>

      <TextInput
        style={styles.input}
        placeholder="Search by skill or location..."
        value={search}
        onChangeText={setSearch}
      />

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Location ▼</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterBtn}>
          <Text style={styles.filterText}>Skill Level ▼</Text>
        </TouchableOpacity>
      </View>

      {/* Worker Cards */}
      <FlatList
        data={filteredWorkers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/worker/ ${item.id}`)}>
          <View style={styles.card}>
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text> {item.rating}</Text>
              <Text>{item.priceRange}</Text>
              <Text>{item.skills}</Text>
              <Text>{item.availability}</Text>
              <Text>🕒 Travel Time: {item.travelTime}</Text>
            </View>
          </View>     
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f6fa",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  filters: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  filterBtn: {
    backgroundColor: "#ddd",
    padding: 10,
    borderRadius: 6,
  },
  filterText: {
    fontSize: 14,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  info: {
    flex: 1,
    justifyContent: "space-around",
  },
  name: {
    fontWeight: "bold",
    fontSize: 16,
  },
});