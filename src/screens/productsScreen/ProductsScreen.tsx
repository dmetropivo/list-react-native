import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {getProductsElastic} from '../../api/productsApi';
import {IProductsResponse} from '../../Interfaces/api';
import ProductItem from '../../components/ProductItem/ProductItem';
import ProductSearchInput from '../../components/ProductSearchInput/ProductSearchInput';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {HomeStackParamList} from '../../Interfaces/navigation';
import {FlashList} from "@shopify/flash-list";

type TLoading = 'none' | 'global' | 'lazyLoad' | 'refresh';

const ProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState<TLoading>('global');
  const insets = useSafeAreaInsets();
  const [valueFromInput, setValueFromInput] = useState('');
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const currentPage = useRef(1);
  const totalItems = useRef(0);

  const windowWidth = Dimensions.get('window').width;
  const numColumns = windowWidth > 500 ? 4 : 2;
  const ITEM_WIDTH = windowWidth / numColumns;
  const ITEM_HEIGHT = ITEM_WIDTH * 2;

  const fetch = async (loadingType: TLoading) => {
    setLoading(loadingType);
    try {
      const response: IProductsResponse = await getProductsElastic({
        limit: 20,
        p: loadingType === 'global' ? 1 : currentPage.current,
        world: 'de',
        q: valueFromInput,
      });
      setProducts(
        loadingType === 'lazyLoad'
          ? [...products, ...response.data.items.materials]
          : response.data.items.materials,
      );
      totalItems.current = response.data.total
    } catch (e) {
      console.log('Error', e);
    }
    setLoading('none');
  };

  useEffect(() => {
    currentPage.current = 1;
    fetch('global');
  }, [valueFromInput]);

  const handleReachEnd = () => {
    if (products.length < totalItems.current) {
      currentPage.current += 1;
      fetch('lazyLoad');
    }
  };

  const handleOnRefresh = () => {
    currentPage.current = 1;
    fetch('refresh');
  };

  const ListFooterComponent = useMemo(() => {
    return loading === 'lazyLoad' ? (
      <ActivityIndicator
        style={{paddingBottom: insets.bottom}}
        size={'large'}
        color={'#5cbcbe'}
      />
    ) : (
      <View style={{paddingBottom: insets.bottom}} />
    );
  }, [loading]);

  const handlePressItem = item => {
    navigation.navigate('ProductScreen', {item});
  };

  return (
    <View style={styles.screenContainer}>
      <ProductSearchInput
        onChangeValue={setValueFromInput}
        containerStyles={{marginVertical: 20}}
      />
      {loading === 'global' ? (
        <View style={styles.loaderWrapper}>
          <ActivityIndicator size={'large'} color={'#5cbcbe'} />
        </View>
      ) : (
        <>
          {products.length === 0 ? (
            <View />
          ) : (
            <FlashList
              style={styles.flatListContentContainerStyle}
              numColumns={numColumns}
              estimatedItemSize={200}
              showsVerticalScrollIndicator={true}
              showsHorizontalScrollIndicator={false}
              data={products}
              onEndReached={handleReachEnd}
              refreshing={loading === 'refresh'}
              onRefresh={handleOnRefresh}
              onEndReachedThreshold={0.7}
              ListFooterComponent={ListFooterComponent}
              keyExtractor={item => item.id}
              renderItem={({item}) => (
                <ProductItem
                  onPress={() => handlePressItem(item)}
                  height={ITEM_HEIGHT}
                  width={ITEM_WIDTH}
                  id={item.id}
                  description={item.author.details.publicName}
                  imageWidth={ITEM_WIDTH - 20}
                  padding={10}
                  coverPath={item.firstPreviewImage.watermarked}
                  price={item.price}
                  title={item.title}
                />
              )}
            />
          )}
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    height: '100%',
  },
  loaderWrapper: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default ProductsScreen;
