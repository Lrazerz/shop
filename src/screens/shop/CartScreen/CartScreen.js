import React, {useEffect} from 'react';
import {View, Text, Button, FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import Colors from '../../../constants/Colors';
import styles from './styles';
import CartItem from '../../../components/shop/CartItem';
import {removeFromCart} from '../../../store/actions/cart';
import {addOrder} from '../../../store/actions/orders';
import Card from '../../../components/UI/Card';

const CartScreen = ({navigation}) => {
  useEffect(() => navigation.setOptions({title: 'Your Cart'}), []);
  const dispatch = useDispatch();
  const totalAmount = useSelector(({cart}) => cart.totalAmount);

  const cartItems = useSelector(({cart}) => {
    const transformedCartItems = [];

    for (const key in cart.items) {
      transformedCartItems.push({
        productId: key,
        productTitle: cart.items[key].productTitle,
        productPrice: cart.items[key].productPrice,
        quantity: cart.items[key].quantity,
        sum: cart.items[key].sum,
      });
    }
    return transformedCartItems.sort((a, b) =>
      a.productId > b.productId ? 1 : -1,
    );
  });

  console.log('total am: ', totalAmount);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>
            ${Math.round(totalAmount.toFixed(2) * 100) / 100}
          </Text>
        </Text>
        <Button
          title="Order Now"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={() => dispatch(addOrder(cartItems, totalAmount))}
        />
      </Card>
      <FlatList
        data={cartItems}
        renderItem={({item}) => (
          <CartItem
            quantity={item.productQuantity}
            title={item.productTitle}
            amount={item.sum}
            onRemove={() => dispatch(removeFromCart(item.productId))}
          />
        )}
        keyExtractor={item => item.productId}
      />
    </View>
  );
};

export default CartScreen;
