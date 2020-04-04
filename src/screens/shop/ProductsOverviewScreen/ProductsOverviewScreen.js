import React from 'react';
import {View, FlatList, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {addToCart} from '../../../store/actions/cart';
import Colors from '../../../constants/Colors';

import ProductItem from '../../../components/shop/ProductItem';

const ProductsOverviewScreen = props => {
  const products = useSelector(({products}) => products.availableProducts);
  const dispatch = useDispatch();

  const selectItemHandler = (id, title) => {
    props.navigation.navigate('ProductDetail', {
      productId: id,
      productTitle: title,
    })
  };

  return (
    <View>
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
    </View>
  );
};

export default ProductsOverviewScreen;
