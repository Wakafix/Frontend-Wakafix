// app/(screen)/TrackWorkerScreen.tsx

import React from "react";
import { useLocalSearchParams } from "expo-router";
import WorkerLocation from "../../components/WorkerLocation";
import { LocationType } from "../../components/WorkerLocation";

export default function TrackWorkerScreen() {
  const { lat, lng, name, profileImage } = useLocalSearchParams();

  // Validate and convert the coordinates
  const workerLocation: LocationType = {
    latitude: parseFloat(lat as string),
    longitude: parseFloat(lng as string),
  };

  return (
    <WorkerLocation
      location={workerLocation}
      name={name as string}
      profileImage={profileImage as string}
    />
  );
}