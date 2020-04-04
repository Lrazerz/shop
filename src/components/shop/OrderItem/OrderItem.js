import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import CartItem from '../CartItem';
import styles from './styles';
import Colors from '../../../constants/Colors';
import Card from '../../UI/Card';

const OrderItem = ({amount, date, items}) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Button title={showDetails ? "Hide Details" : "Show Details"} onPress={() => {
          setShowDetails(prevState => !prevState);
        }}
        color={Colors.primary}
      />
      {showDetails && <View style={styles.detailItems}>
          {items.map(cartItem => {
            console.log('cartItem ', cartItem);
            return (
            <CartItem
              key={cartItem.productId}
              quantity={cartItem.quantity}
              title={cartItem.productTitle}
              amount={cartItem.sum}
            />)
          }
          )}
        </View>
      }
    </Card>
  );
};

export default OrderItem;
