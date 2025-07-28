import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  Platform,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';

const NIGERIAN_STATES = [
  'Lagos', 'Abuja', 'Kano', 'Rivers', 'Oyo',
  'Kaduna', 'Enugu', 'Anambra', 'Ogun', 'Delta'
];

const LGA_BY_STATE: Record<string, string[]> = {
  Lagos: ['Ikeja', 'Epe', 'Ikorodu', 'Badagry'],
  Abuja: ['Gwagwalada', 'Kuje', 'Abaji'],
  Kano: ['Nassarawa', 'Dala', 'Gwale'],
  Rivers: ['Port Harcourt', 'Obio-Akpor'],
  Oyo: ['Ibadan North', 'Ogbomosho'],
  Kaduna: ['Zaria', 'Kaduna North'],
  Enugu: ['Nsukka', 'Enugu East'],
  Anambra: ['Awka', 'Onitsha'],
  Ogun: ['Abeokuta South', 'Ijebu Ode'],
  Delta: ['Warri South', 'Sapele'],
};

export default function RegisterWorker() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    state: '',
    lga: '',
    skill: '',
    experience: '',
    gender: '',
  });
  const [image, setImage] = useState<string | null>(null);
  const [stateSuggestions, setStateSuggestions] = useState<string[]>([]);
  const [lgaSuggestions, setLgaSuggestions] = useState<string[]>([]);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera access');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const handleChange = (key: string, value: string) => {
    setFormData({ ...formData, [key]: value });

    if (key === 'state') {
      const filtered = NIGERIAN_STATES.filter((s) =>
        s.toLowerCase().startsWith(value.toLowerCase())
      );
      setStateSuggestions(value.length ? filtered : []);
      setFormData((prev) => ({ ...prev, lga: '' }));
      setLgaSuggestions([]);
    }

    if (key === 'lga' && formData.state) {
      const lgas = LGA_BY_STATE[formData.state] || [];
      const filtered = lgas.filter((lga) =>
        lga.toLowerCase().startsWith(value.toLowerCase())
      );
      setLgaSuggestions(value.length ? filtered : []);
    }
  };

  const handleSubmit = () => {
    const { firstName, lastName, phone, state, lga, skill, experience, gender } = formData;
    if (!firstName || !lastName || !phone || !state || !lga || !skill || !experience || !gender) {
      Alert.alert('Please fill all fields');
      return;
    }

    Alert.alert('Success', 'Worker registered successfully!');
    router.push('/');
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register as a Worker</Text>

      <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.profileImage} />
        ) : (
          <Text style={styles.imageText}>Upload Profile Picture</Text>
        )}
      </TouchableOpacity>
      <Text style={styles.imageLabel}>Add profile picture</Text>
      <Text style={styles.imageHelper}>
        This helps people recognize you and build trust
      </Text>

      <View style={styles.nameRow}>
        <TextInput
          style={[styles.input, styles.halfInput]}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={(text) => handleChange('firstName', text)}
        />
        <TextInput
          style={[styles.input, styles.halfInput, { marginLeft: 10 }]}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={(text) => handleChange('lastName', text)}
        />
      </View>
      <View style={styles.phoneRow}>
        <Text style={styles.prefix}>+234</Text>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Phone Number"
          keyboardType="phone-pad"
          value={formData.phone}
          onChangeText={(text) => handleChange('phone', text)}
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Enter State"
        value={formData.state}
        onChangeText={(text) => handleChange('state', text)}
      />
      {stateSuggestions.map((state) => (
        <TouchableOpacity
          key={state}
          onPress={() => {
            handleChange('state', state);
            setStateSuggestions([]);
          }}
        >
          <Text style={styles.suggestion}>{state}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Enter LGA"
        value={formData.lga}
        onChangeText={(text) => handleChange('lga', text)}
      />
      {lgaSuggestions.map((lga) => (
        <TouchableOpacity
          key={lga}
          onPress={() => {
            handleChange('lga', lga);
            setLgaSuggestions([]);
          }}
        >
          <Text style={styles.suggestion}>{lga}</Text>
        </TouchableOpacity>
      ))}

      <TextInput
        style={styles.input}
        placeholder="Skill or Service"
        value={formData.skill}
        onChangeText={(text) => handleChange('skill', text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Years of Experience"
        keyboardType="numeric"
        value={formData.experience}
        onChangeText={(text) => handleChange('experience', text)}
      />

      <View style={styles.genderRow}>
        <TouchableOpacity
          style={[
            styles.genderDot,
            formData.gender === 'male' && styles.genderDotSelected,
          ]}
          onPress={() => handleChange('gender', 'male')}
        />
        <Text style={styles.genderLabel}>Male</Text>

        <TouchableOpacity
          style={[
            styles.genderDot,
            formData.gender === 'female' && styles.genderDotSelected,
          ]}
          onPress={() => handleChange('gender', 'female')}
        />
        <Text style={styles.genderLabel}>Female</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
    marginVertical: 20,
  },
  imagePicker: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  imageText: {
    color: '#800080',
    fontSize: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#800080',
    borderRadius: 50,
    textAlign: 'center',
  },
  imageLabel: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  imageHelper: {
    textAlign: 'center',
    color: '#777',
    fontSize: 12,
    marginBottom: 20,
  },
  nameRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  prefix: {
    paddingHorizontal: 12,
    paddingVertical: Platform.OS === 'ios' ? 12 : 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    fontSize: 16,
    marginRight: 5,
    backgroundColor: '#eee',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    fontSize: 16,
  },
  halfInput: {
    flex: 1,
  },
  suggestion: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    marginBottom: 5,
    borderRadius: 6,
    color: '#333',
  },
  genderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 15,
  },
  genderDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#800080',
    marginHorizontal: 10,
  },
  genderDotSelected: {
    backgroundColor: '#800080',
  },
  genderLabel: {
    fontSize: 16,
    color: '#333',
    marginRight: 20,
  },
  button: {
    backgroundColor: '#800080',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});