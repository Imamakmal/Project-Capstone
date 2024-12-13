import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
  },
  reducers: {
    addItem: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({ ...action.payload });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload.id);
    },
    clearCart: (state) => {
      state.items = [];
    },
    updateQuantity: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        if (action.payload.quantity <= 0) {
          state.items = state.items.filter(item => item.id !== existingItem.id);
        } else {
          existingItem.quantity = action.payload.quantity;
        }
      }
    },
  },
});

export const { addItem, removeItem, clearCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
