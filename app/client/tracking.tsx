import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, Alert, useColorScheme } from "react-native";
import * as Location from "expo-location";
import WorkerMapView from "@/components/Map/WorkerMapView";
import Header from "@/components/common/Header";

export default function TrackingPage() {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  if (loading || !location) {
    return (
      <View style={[styles.loadingContainer, { backgroundColor: isDark ? "#000" : "#fff" }]}>
        <Header title="Live Tracking" />
        <ActivityIndicator size="large" color={isDark ? "#fff" : "#0d6efd"} />
        <Text style={[styles.loadingText, { color: isDark ? "#fff" : "#000" }]}>
          Fetching your current location...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Header title="Live Tracking" />
      <WorkerMapView location={location} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 60,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});