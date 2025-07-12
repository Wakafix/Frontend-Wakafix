import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";

interface Props {
  location: {
    latitude: number;
    longitude: number;
  };
}

export default function WorkerMapView({ location }: Props) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      <Marker
        coordinate={location}
        title="Worker"
        description="Current location"
        pinColor="blue"
      />
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});