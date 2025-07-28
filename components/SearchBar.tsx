// components/SearchBar.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type Props = {
  onSearch: (query: string) => void;
};

const SearchBar = ({ onSearch }: Props) => {
  const [query, setQuery] = useState('');

  const handlePress = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by skill or location..."
        value={query}
        onChangeText={setQuery}
        style={styles.input}
        returnKeyType ="search"
        onSubmitEditing={handlePress}
      />
      <Button title="Search" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default SearchBar;