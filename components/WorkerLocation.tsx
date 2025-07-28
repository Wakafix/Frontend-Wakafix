// components/WorkerLocation.tsx

import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

export type LocationType = {
  latitude: number;
  longitude: number;
};

type WorkerLocationProps = {
  location: LocationType;
  name: string;
  profileImage: string;
};

const WorkerLocation: React.FC<WorkerLocationProps> = ({
  location,
  name,
  profileImage,
}) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          ...location,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={location} title={name}>
          <Image source={{ uri: profileImage }} style={styles.markerImage} />
        </Marker>
      </MapView>
      <View style={styles.infoBox}>
        <Image source={{ uri: profileImage }} style={styles.profileImage} />
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.status}>Currently En Route</Text>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  markerImage: { width: 40, height: 40, borderRadius: 20 },
  infoBox: {
    position: "absolute",
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 12,
    elevation: 5,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    alignSelf: "center",
  },
  name: {
    textAlign: "center",
    marginTop: 8,
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    textAlign: "center",
    color: "gray",
    marginTop: 4,
  },
});

export default WorkerLocation;