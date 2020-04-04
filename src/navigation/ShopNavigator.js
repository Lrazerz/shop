import React from 'react';
import {Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HeaderButtons, Item} from 'react-navigation-header-buttons';
import Icon from 'react-native-vector-icons/Feather';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen/ProductsOverviewScreen';
import ProductDetailScreen from '../screens/shop/ProductDetailScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import HeaderButton from '../components/UI/HeaderButton';

import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';

const defaultScreenOptions = ({navigation}) => ({
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : 'white',
  },
  headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary,
});

const HeaderLeftButton = ({navigation}) => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="Menu"
      iconName="menu"
      onPress={() => navigation.toggleDrawer()}
    />
  </HeaderButtons>
);

const HeaderRightButton = ({navigation}) => (
  <HeaderButtons HeaderButtonComponent={HeaderButton}>
    <Item
      title="Create"
      iconName="edit"
      onPress={() => navigation.navigate('EditProduct')}
    />
  </HeaderButtons>
);

const productsOverviewOptions = ({navigation}) => ({
  headerLeft: () => <HeaderLeftButton navigation={navigation} />,
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item
        title="Cart"
        iconName="shopping-cart"
        onPress={() => navigation.navigate('Cart')}
      />
    </HeaderButtons>
  ),
});

//with headerLeft hamburger
const drawerScreenOptions = title => ({navigation}) => ({
  headerTitle: title,
  headerLeft: () => <HeaderLeftButton navigation={navigation} />,
});

const drawerScreenOptionsWithRightButton = title => ({navigation}) => ({
  headerTitle: title,
  headerLeft: () => <HeaderLeftButton navigation={navigation} />,
  headerRight: () => <HeaderRightButton navigation={navigation} />
});

const editProductScreenOptions = ({navigation, route}) => ({
  headerTitle: (route.params && route.params['productId']) ? 'Edit Product' : 'Add Product',
  headerRight: () => (
    <HeaderButtons HeaderButtonComponent={HeaderButton}>
      <Item title="Save" iconName="check" onPress={route.params && route.params.submit} />
    </HeaderButtons>
  ),
});

const Stack = createStackNavigator();

const ProductsNavigator = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen
      name="ProductsOverview"
      component={ProductsOverviewScreen}
      options={productsOverviewOptions}
    />
    <Stack.Screen name="ProductDetail" component={ProductDetailScreen} />
    <Stack.Screen name="Cart" component={CartScreen} />
  </Stack.Navigator>
);

const OrdersNavigator = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen
      name="Orders"
      component={OrdersScreen}
      options={drawerScreenOptions('Your Orders')}
    />
  </Stack.Navigator>
);

const AdminNavigator = () => (
  <Stack.Navigator screenOptions={defaultScreenOptions}>
    <Stack.Screen
      name="UserProducts"
      component={UserProductsScreen}
      options={drawerScreenOptionsWithRightButton('Your Products')}
    />
    <Stack.Screen
      name="EditProduct"
      component={EditProductScreen}
      options={editProductScreenOptions}
    />
  </Stack.Navigator>
);

const Drawer = createDrawerNavigator();

const RootContainer = () => (
  <NavigationContainer>
    <Drawer.Navigator drawerContentOptions={{activeTintColor: Colors.primary}}>
      <Drawer.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: drawerConfig => (
            <Icon name="shopping-cart" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: drawerConfig => (
            <Icon name="list" size={23} color={drawerConfig.color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: drawerConfig => (
            <Icon name="edit" size={23} color={drawerConfig.color} />
          ),
        }}
      />
    </Drawer.Navigator>
  </NavigationContainer>
);

export default RootContainer;
