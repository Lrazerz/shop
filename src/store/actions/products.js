import Product from '../../models/product';
export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
//set products fetched from server to store
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await fetch('https://shop-b33cb.firebaseio.com/products.json');

      if (!response.ok) {
        throw new Error('Something went wrong!');
      };
      const resData = await response.json();
      let loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price,
          ),
        );
      }
      dispatch({type: SET_PRODUCTS, products: loadedProducts});
    } catch (err) {
      throw err;
    }
  };
};

export const deleteProduct = productId => {
  return async dispatch => {
    const response = await fetch(`https://shop-b33cb.firebaseio.com/products/${productId}.json`, {
      method: 'DELETE',
    });

    if(!response.ok) {
      throw new Error('Something went wrong');
    }
    dispatch({type: DELETE_PRODUCT, productId: productId});
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async dispatch => {
    //any async code
    const response = await fetch('https://shop-b33cb.firebaseio.com/products.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description, imageUrl, price}),
      });
    const resData = await response.json();

    console.log(resData);

    dispatch({
      type: CREATE_PRODUCT,
      productData: {
        id: resData.name,
        title,
        imageUrl,
        description,
        price,
      },
    });

  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async dispatch => {
    const response = await fetch(`https://shop-b33cb.firebaseio.com/products/${id}.json`, {
      //put - fully override, patch - update only in places
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title, description, imageUrl}),
    });

    if(!response.ok) {
      throw new Error('Something went wrong');
    }
    dispatch({
      type: UPDATE_PRODUCT,
      productId: id,
      productData: {
        title,
        description,
        imageUrl
      },
    });
  };
};
