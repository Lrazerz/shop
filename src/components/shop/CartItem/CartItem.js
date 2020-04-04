import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

const CartItem = ({quantity, title, amount, onRemove}) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.itemData}>
        <Text style={styles.quantity}>{quantity} </Text>
        <Text style={styles.mainText}>{title}</Text>
      </Text>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>${amount.toFixed(2)}</Text>
        {onRemove && <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
          <Icon name="trash-o" size={23} color="red"/>
        </TouchableOpacity>}
      </View>
    </View>
  )
};

export default CartItem;
