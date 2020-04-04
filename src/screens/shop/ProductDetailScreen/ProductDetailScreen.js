import React, {useEffect} from 'react';
import {View, Text, Image, Button, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../../store/actions/cart';

import styles from './styles';

import Colors from '../../../constants/Colors';

const ProductDetailScreen = ({route, navigation}) => {
  const {productId, productTitle} = route.params;
  const selectedProduct = useSelector(({products}) => products.availableProducts.find(item => item.id === productId));
  const dispatch = useDispatch();
  useEffect(() => navigation.setOptions({title: productTitle}),[]);

  return (
    <ScrollView>
      <Image source={{uri: selectedProduct.imageUrl}} style={styles.image} />
      <View style={styles.actions}>
        <Button title="Add To Cart" onPress={() => {dispatch(addToCart(selectedProduct))}} color={Colors.primary}/>
      </View>
      <Text style={styles.price}>${selectedProduct.price.toFixed(2)}</Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

export default ProductDetailScreen;
