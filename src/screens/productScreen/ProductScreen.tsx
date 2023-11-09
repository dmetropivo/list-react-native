import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

const ProductScreen = () => {
  const route = useRoute();
  const [isLandscape, setIsLandscape] = useState(
    Dimensions.get('window').width > Dimensions.get('window').height,
  );

  const handleOrientationChange = ({ window }) => {
    const newOrientation = window.width > window.height;
    setIsLandscape(newOrientation);
  };

  useEffect(() => {
    Dimensions.addEventListener('change', handleOrientationChange);

    return () => {
      Dimensions.removeEventListener('change', handleOrientationChange);
    };
  }, []);

  return (
    <SafeAreaView style={styles.screenContainer}>
      <View
        style={
          isLandscape
            ? styles.landscapeView
            : styles.portraitView
        }>
        <View
          style={
            isLandscape
              ? {height: '100%', width: '50%'}
              : {height: '50%', width: '100%'}
          }>
          <FastImage
            defaultSource={2}
            style={{width: '100%', height: '100%'}}
            resizeMode={'cover'}
            source={{uri: route?.params?.item.firstPreviewImage.watermarked}}
          />
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>{route?.params?.item.title}</Text>
          <Text style={styles.name}>{route?.params?.item.author.details.publicName}</Text>
          <Text style={styles.price}>{route?.params?.item.price}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  landscapeView: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  portraitView: {
    height: '100%',
    width: '100%',
    flexDirection: 'column',
  },
  textWrapper: {
    padding: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 26,
  },
  name: {
    fontSize: 22,
  },
  price: {
    fontSize: 16
  }
});

export default ProductScreen;
