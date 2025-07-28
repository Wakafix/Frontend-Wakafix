import React, { useRef, useState } from 'react';
import { View, Text, Image, FlatList, Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import  { NativeSyntheticEvent, NativeScrollEvent } from 'react-native'
import { ImageSourcePropType } from 'react-native';

const { width, height } = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Empowering Local Talents',
    image: require('../assets/images/workersImage.jpg'), // Replace with your image later
  },
  {
    key: '2',
    title: 'Smart Matching Powered by AI',
    image: require('../assets/images/ImageAi.jpg'), // Replace with your image later
  },
  {
    key: '3',
    title: 'Turn your skills into income',
    image: require('../assets/images/ImageMoney.jpg'), // Replace with your image later
  },
];

const Onboarding = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentSlideIndex + 1 });
    } else {
      router.push('/get-started'); // Update this to wherever you want to go after onboarding
    }
  };


  const handlePrev = () => {
    if (currentSlideIndex > 0) {
      flatListRef.current?.scrollToIndex({ index: currentSlideIndex - 1 });
    }
  };

  const updateSlideIndex = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

 const Slide = ({ item }: { item: { title: string; image: ImageSourcePropType } }) => (
  <View style={{ width, height,justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
    <Text style={{ color: '#000', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
      {item.title}
    </Text>
    <Image
      source={item.image}
      resizeMode="contain"
      style={{ width: '100%', height: height * 0.4, borderRadius: 10 }}
    />
  </View>
);

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FlatList
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        ref={flatListRef}
        onMomentumScrollEnd={updateSlideIndex}
        renderItem={({ item }) => <Slide item={item} />}
        keyExtractor={item => item.key}
      />

      {/* Indicators */}
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        {slides.map((_, index) => (
          <View
            key={index}
            style={{
              height: 10,
              width: 10,
              borderRadius: 5,
              backgroundColor: index === currentSlideIndex ? '#007BFF' : '#ccc',
              marginHorizontal: 5,
            }}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, marginBottom: 30 }}>
        <TouchableOpacity onPress={handlePrev} disabled={currentSlideIndex === 0}>
          <Text style={{ fontSize: 16, color: currentSlideIndex === 0 ? '#999' : '#007BFF' }}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext}>
          <Text style={{ fontSize: 16, color: '#007BFF' }}>{currentSlideIndex === slides.length - 1 ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;