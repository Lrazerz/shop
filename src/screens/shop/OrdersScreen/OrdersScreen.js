import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import OrderItem from '../../../components/shop/OrderItem';
import styles from './styles';

const OrdersScreen = ({navigation}) => {
  const orders = useSelector(({orders}) => orders.orders);
  console.log('orders screen orders', orders);

  return (
    <View style={{flex: 1, backgroundColor: 'green'}}>
      <FlatList
        keyExtractor={item => item.id}
        data={orders}
        renderItem={({item}) => (
          <OrderItem
            amount={item.totalAmount}
            date={item.readableDate}
            items={item.items}
          />
        )}
      />
    </View>
  );
};

export default OrdersScreen;
