import React, {useReducer, useCallback, useEffect} from 'react';
import {View, ScrollView, Alert, KeyboardAvoidingView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styles from './styles';
import {createProduct, updateProduct} from '../../../store/actions/products';
import Input from '../../../components/UI/Input';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formStateReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.inputId]: action.value,
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.inputId]: action.isValid,
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      ...state,
      inputValues: updatedValues,
      inputValidities: updatedValidities,
      formIsValid: updatedFormIsValid,
    };
  }
  return state;
};

const EditProductScreen = ({navigation, route}) => {
  const prodId = route.params && route.params['productId'];
  const editedProduct = useSelector(({products}) => products.userProducts.find(prod => prod.id === prodId));

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formStateReducer, {
    inputValues: {
      title: editedProduct ? editedProduct.title : '',
      imageUrl: editedProduct ? editedProduct.imageUrl : '',
      price: '',
      description: editedProduct ? editedProduct.description : '',
    },
    inputValidities: {
      title: editedProduct ? true : false,
      imageUrl: editedProduct ? true : false,
      price: editedProduct ? true : false,
      description: editedProduct ? true : false,
    },
    formIsValid: editedProduct ? true : false,
  });

  const submitHandler = useCallback(() => {
    if (!formState.formIsValid) {
      Alert.alert('Wrong input!', 'Please check the errors in the form.', [{text: 'OKAY'}]);
      return;
    }
    if (editedProduct) {
      dispatch(
        updateProduct(
          prodId,
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
        ),
      );
    } else {
      dispatch(
        createProduct(
          formState.inputValues.title,
          formState.inputValues.description,
          formState.inputValues.imageUrl,
          +formState.inputValues.price,
        ),
      );
    }
    navigation.goBack();
  }, [
    formState.formIsValid,
    formState.inputValues.title,
    formState.inputValues.description,
    formState.inputValues.imageUrl,
    formState.inputValues.price,
    editedProduct,
    navigation,
    dispatch,
    prodId,
  ]);

  useEffect(() => navigation.setParams({submit: submitHandler}), [
    navigation,
    submitHandler,
  ]);

  //in useCallback coz this function exists as a dependency in useEffect in Input.js component and we don't need to
  //rerun useEffect very often
  const inputChangeHandler = useCallback((inputId, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        inputId: inputId,
        value: inputValue,
        isValid: inputValidity,
      });
    },
    [dispatchFormState],
  );
  return (
    <KeyboardAvoidingView behavior="padding">
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            label="Title"
            errorText="Please enter a valid title!"
            value={formState.inputValues.title}
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.title}
            initialValidity={formState.inputValidities.title}
            returnKeyType="next"
            required
          />
          <Input
            id="imageUrl"
            label="Image Url"
            errorText="Please enter a valid image url"
            value={formState.inputValues.imageUrl}
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.imageUrl}
            initialValidity={formState.inputValidities.imageUrl}
            returnKeyType="next"
            required
          />
          {editedProduct ? null : (
            <Input
              id="price"
              label="Price"
              errorText="Please enter a valid price"
              value={formState.inputValues.price}
              onInputChange={inputChangeHandler}
              initialValue={formState.inputValues.price}
              initialValidity={formState.inputValidities.price}
              keyboardType="decimal-pad"
              returnKeyType="next"
              required
              min={0}
            />)
          }
          <Input
            id="description"
            label="Description"
            errorText="Please enter a valid description"
            value={formState.inputValues.description}
            onInputChange={inputChangeHandler}
            initialValue={formState.inputValues.description}
            initialValidity={formState.inputValidities.description}
            returnKeyType="next"
            required
            minLength={5}
            multiline={true}
            numOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default EditProductScreen;
