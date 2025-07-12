import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";

export default function useOfflineData<T>(key: string, fetcher: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const netInfo = await Network.getNetworkStateAsync();
      setIsOffline(!netInfo.isConnected);

      if (netInfo.isConnected) {
        try {
          const freshData = await fetcher();
          setData(freshData);
          await AsyncStorage.setItem(key, JSON.stringify(freshData));
        } catch (e) {
          console.warn("Failed to fetch fresh data", e);
        }
      } else {
        const cached = await AsyncStorage.getItem(key);
        if (cached) setData(JSON.parse(cached));
      }
    };

    loadData();
  }, []);

  return { data, isOffline };
}