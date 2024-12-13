import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  try {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch products');
  }
});

const initializeStock = (products = []) => {
  const defaultStock = {};
  products.forEach((product) => {
    defaultStock[product.id] = 20;
  });
  return defaultStock;
};

const productSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    stock: {},
  },
  reducers: {
    setProducts: (state, action) => {
      const initializedStock = initializeStock(action.payload);
      state.items = action.payload.map((product) => ({
        ...product,
        quantity: initializedStock[product.id],
      }));
      state.stock = initializedStock;
    },
    setQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (state.stock[productId] !== undefined) {
        state.stock[productId] = quantity;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    reduceStock: (state, action) => {
      const { productId, quantity } = action.payload;
      if (state.stock[productId] >= quantity) {
        state.stock = {
          ...state.stock,
          [productId]: state.stock[productId] - quantity,
        };
        state.items = state.items.map((item) =>
          item.id === productId
            ? { ...item, quantity: state.stock[productId] }
            : item
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        const newStock = { ...state.stock };
        action.payload.forEach((product) => {
          if (!(product.id in newStock)) {
            newStock[product.id] = 20;
          }
        });
        state.items = action.payload.map((product) => ({
          ...product,
          quantity: newStock[product.id],
        }));
        state.stock = newStock;
        state.loading = false;
      });
  },
});

export const { setProducts, setQuantity, setLoading, setError, reduceStock } = productSlice.actions;
export default productSlice.reducer;
