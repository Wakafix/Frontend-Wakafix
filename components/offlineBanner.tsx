// components/OfflineBanner.tsx
import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

export default function OfflineBanner() {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setOffline(!state.isConnected);
    });

    return () => unsubscribe();
  }, []);

  if (!offline) return null;

  return (
    <View style={{ backgroundColor: 'red', padding: 10 }}>
      <Text style={{ color: 'white', textAlign: 'center' }}>You're offline. Showing cached data.</Text>
    </View>
  );
}