import React from 'react';
import {Button, FlatList, Alert} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ProductItem from '../../../components/shop/ProductItem';
import Colors from '../../../constants/Colors';
import {deleteProduct} from '../../../store/actions/products';

const UserProductsScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(({products}) => products.userProducts);

  const editProductHandler = id => {
    navigation.navigate('EditProduct', {productId: id});
  };

  const deleteHandler = (id) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {text: 'No', style: 'default'},
      {text: 'Yes', style: 'destructive', onPress: () => {dispatch(deleteProduct(id))}}
    ]);
  };

  return (
    <FlatList data={userProducts} renderItem={
      ({item}) => (
        <ProductItem
          imageUrl={item.imageUrl}
          title={item.title}
          price={item.price}
          onSelect={() => {editProductHandler(item.id)}}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => {editProductHandler(item.id)}}
          />
          <Button color={Colors.primary} title="Delete" onPress={() => deleteHandler(item.id)} />
        </ProductItem>
      )}
    />
  );
};

export default UserProductsScreen;
