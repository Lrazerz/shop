import React, {useEffect, useState, useCallback} from 'react';
import {View, FlatList, Button, ActivityIndicator, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../../store/actions/cart';
import Colors from '../../../constants/Colors';
import {fetchProducts} from '../../../store/actions/products';
import ProductItem from '../../../components/shop/ProductItem';
import styles from './styles';

const ProductsOverviewScreen = props => {
  const {navigation} = props;
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const products = useSelector(({products}) => products.availableProducts);
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    console.log('load prods');
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(fetchProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  },[dispatch, setIsLoading, setError]);

  useEffect(() => {
    const focusSub = navigation.addListener('focus', loadProducts);

    return focusSub;
  }, [navigation, loadProducts]);

  const selectItemHandler = (id, title) => {
    navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occured</Text>
        <Button title="Try again" onPress={loadProducts} />
      </View>
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Maybe start adding some!</Text>
      </View>
    );
  };

  return (
    <FlatList
      data={products}
      renderItem={({item}) => (
        <ProductItem
          imageUrl={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {
            selectItemHandler(item.id, item.title);
          }}>
          <Button
            color={Colors.primary}
            title="View details"
            onPress={() => {selectItemHandler(item.id, item.title);}}
          />
          <Button color={Colors.primary} title="To cart" onPress={() => {dispatch(addToCart(item))}} />
        </ProductItem>
      )}
      keyExtractor={item => item.id}
    />
  );
};

export default ProductsOverviewScreen;
