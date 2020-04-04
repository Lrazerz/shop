import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, ScrollView, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {createProduct, updateProduct} from '../../../store/actions/products';

const EditProductScreen = ({navigation,route}) => {
  const prodId = route.params && route.params['productId'];
  const editedProduct = useSelector(({products}) => products.userProducts.find(prod => prod.id === prodId));

  const dispatch = useDispatch();

  const [title, setTitle] = useState(editedProduct ? editedProduct.title : '');
  const [imageUrl, setImageUrl] = useState(editedProduct ? editedProduct.imageUrl : '');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState(editedProduct ? editedProduct.description : '');

  const submitHandler = useCallback(() => {
    if (editedProduct) {
      dispatch(updateProduct(prodId, title, description, imageUrl));
    } else {
      dispatch(createProduct(title, description, imageUrl, +price));
    }
    navigation.goBack();
  }, [dispatch, editedProduct, prodId, title, description, imageUrl, price]);

  useEffect(() => navigation.setParams({submit: submitHandler}), [submitHandler]);
  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} value={title} onChangeText={text => {console.log('text changed',text,'state',title);setTitle(text)}}/>
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput style={styles.input} value={imageUrl} onChangeText={text => setImageUrl(text)}/>
        </View>
        {editedProduct ? null :
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput style={styles.input}  value={price} onChangeText={text => setPrice(text)}/>
          </View>
        }
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput style={styles.input}  value={description} onChangeText={text => setDescription(text)}/>
        </View>
      </View>
    </ScrollView>
  );
};

export default EditProductScreen;
