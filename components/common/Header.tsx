import React from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";

export default function Header({ title }: { title: string }) {
  const colorScheme = useColorScheme(); // 'light' or 'dark'

  const isDark = colorScheme === "dark";

  return (
    <View style={[styles.container, { backgroundColor: isDark ? "#121212" : "#0d6efd" }]}>
      <Text style={[styles.title, { color: isDark ? "#fff" : "#fff" }]}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingBottom: 16,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
  },
});