import React from 'react';
import {View, Text, Image, Button, TouchableOpacity, TouchableNativeFeedback, Platform} from 'react-native';
import Card from '../../UI/Card';

import styles from './styles';

const ProductItem = ({imageUrl, title, price, onSelect, children}) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{uri: imageUrl}} style={styles.image}/>
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>
              {children}
            </View>
          </View>
        </TouchableCmp>
      </View>
    </Card>
  );
};

export default ProductItem;
