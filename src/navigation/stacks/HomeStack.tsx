import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ProductsScreen from '../../screens/productsScreen/ProductsScreen';
import ProductScreen from '../../screens/productScreen/ProductScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'ProductsScreen'}>
      <Stack.Screen name={'ProductsScreen'} component={ProductsScreen} />
      <Stack.Screen
        options={{headerShown: true, headerTitle: ''}}
        name={'ProductScreen'}
        component={ProductScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
