import React, {FC, useState} from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput, TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {SVGSearch} from '../../svg/SVGSearch';
// import {useDebounce} from "../../hooks/useDebounce";
import {useDebouncedCallback} from '../../hooks/useDebounceCallback';

export interface IProductSearchInput {
  containerStyles?: StyleProp<ViewStyle>;
  onChangeValue?: any;
}

const ProductSearchInput: FC<IProductSearchInput> = ({
  containerStyles,
  onChangeValue,
}) => {
  const insets = useSafeAreaInsets();
  const [value, setValue] = useState('');

  const handleDebounce = useDebouncedCallback((e: string) => {
    onChangeValue(e);
  }, 500);

  const handleChange = (e: string) => {
    setValue(e);
    handleDebounce(e);
  };

  return (
    <View
      style={[containerStyles, styles.inputWrapper, {paddingTop: insets.top}]}>
      <TextInput
        onChangeText={handleChange}
        value={value}
        placeholder={'Nach Material oder Auto*innen suchen'}
        style={styles.inputStyle}
      />
      <TouchableOpacity
        onPress={() => onChangeValue(value)}
        style={styles.searchIconWrapper}>
        <SVGSearch />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputStyle: {
    flex: 1,
    height: 56,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 10,
    borderColor: '#c7c7c7',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  inputWrapper: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  searchIconWrapper: {
    width: '15%',
    backgroundColor: '#5cbcbe',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopEndRadius: 20,
    borderBottomEndRadius: 20,
  },
});

export default ProductSearchInput;
