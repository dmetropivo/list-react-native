import React, {FC, memo} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';

interface IProductItem {
  id: number;
  width: number;
  height: number;
  padding: number;
  coverPath: string;
  imageWidth: number;
  description: string;
  price: string;
  title: string;
  onPress?: () => void;
}

const ProductItem: FC<IProductItem> = props => {
  return (
    <TouchableOpacity
      onPress={props.onPress}
      style={{
        width: props.width,
        height: props.height,
        padding: props.padding,
      }}>
      <View style={styles.imageSection}>
        <FastImage
          defaultSource={2}
          style={styles.image}
          source={{
            uri: props.coverPath,
            priority: FastImage.priority.normal,
          }}
        />
      </View>
      <View style={styles.textSection}>
        <View style={styles.innerTextSection}>
          <View>
            <Text style={styles.textTitle} numberOfLines={3}>
              {props.title}
            </Text>
            <Text
              style={styles.textDescription}
              numberOfLines={1}
              ellipsizeMode={'tail'}>
              {props.description}
            </Text>
          </View>
          <Text style={styles.textPrice}>{props.price}€</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageSection: {
    zIndex: 1,
    height: '30%',
  },
  image: {
    backgroundColor: '#eaeaea',
    aspectRatio: '3/4',
    marginLeft: 15,
    marginRight: 15,
    borderWidth: 1,
    borderColor: '#c7c7c7',
  },
  textSection: {
    backgroundColor: '#FFFFFF',
    paddingTop: '60%',
    height: '70%',
    borderColor: '#c7c7c7',
    borderWidth: 1,
    borderRadius: 5,
    bottom: 0,
  },
  innerTextSection: {
    justifyContent: 'space-between',
    height: '100%',
    paddingHorizontal: 15,
    paddingBottom: 15,
  },
  textTitle: {
    fontWeight: '700',
    fontSize: 18,
  },
  textDescription: {
    marginTop: 8,
    fontSize: 16,
  },
  textPrice: {
    fontSize: 18,
    fontWeight: '700',
  },
});

export default memo(ProductItem);
