import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import {
  login as loginService,
  register as registerService,
  createUser,
  getUser,
  updateUser as updateUserService,
  addFavoriteRestaurant as addFavoriteRestaurantService,
  removeFavoriteRestaurant as removeFavoriteRestaurantService,
  addAddressFromUser,
  getAddressFromUser,
  removeAddressFromUser,
  updateAddressFromUser
} from '../services';


import { deleteData, getData, storeData } from '../utils';
import { addCardFromUser, getCardsFromUser, removeCardFromUser, updateCardFromUser } from '../services/card';

const initialState = {
  user: null,
  addresses: [],
  cards: [],
  loading: false,
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      state.user = null;
      state.addresses = [];
      state.cards = [];
      state.token = null;
      state.loading = false;
      state.error = null;

      deleteData('user');
      deleteData('addresses');
      deleteData('cards');
    },
    resetError: state => {
      state.error = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(login.pending, state => {
      state.loading = true;
    }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.addresses = action.payload.addresses;
        state.cards = action.payload.cards;
        state.loading = false;
        state.error = null;
      }),
      builder.addCase(login.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
      builder.addCase(register.pending, state => {
        state.loading = true;
      }),
      builder.addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      }),
      builder.addCase(register.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
      builder.addCase(updateUser.pending, state => {
        state.loading = true;
      }),
      builder.addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      }),
      builder.addCase(updateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
      builder.addCase(addAddress.fulfilled, (state, action) => {
        state.addresses = [...state.addresses, action.payload];
        storeData('addresses', state.addresses);
      }),
      builder.addCase(editAddress.fulfilled, (state, action) => {
        state.addresses = [...state.addresses, action.payload];
        storeData('addresses', state.addresses);
      }),
      builder.addCase(removeAddress.fulfilled, (state, action) => {
        const id = action.payload;
        state.addresses = state.addresses.filter(a => a.id !== id);

        storeData('addresses', state.addresses);
      }),
      builder.addCase(addCard.fulfilled, (state, action) => {
        state.cards = [...state.cards, action.payload];
        storeData('cards', state.cards);
      }),
      builder.addCase(editCard.fulfilled, (state, action) => {
        const id = action.payload.id;
        const card = action.payload.card;

        const index = state.cards.findIndex(c => c.id === id);
        state.cards[index] = card;

        storeData('cards', state.cards);
      }),
      builder.addCase(removeCard.fulfilled, (state, action) => {
        const id = action.payload;
        state.cards = state.cards.filter(c => c.id !== id);

        storeData('cards', state.cards);
      }),
      builder.addCase(addFavoriteRestaurant.fulfilled, (state, action) => {
        state.user.favorites = action.payload;
      }),
      builder.addCase(removeFavoriteRestaurant.fulfilled, (state, action) => {
        state.user.favorites = action.payload;
      }),
      builder.addCase(loadUser.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.addresses = action.payload.addresses;
        state.cards = action.payload.cards;
      });
  }
});

export const login = createAsyncThunk('auth/login', async ({ email, password }, thunkAPI) => {
  try {
    const userLogged = await loginService(email, password);
    const user = await getUser(userLogged.email);
    const addressesResult = await getAddressFromUser(user.email);
    const cardsResult = await getCardsFromUser(user.email);

    storeData('user', user);
    storeData('addresses', addressesResult);
    storeData('cards', cardsResult);

    return { user, addressesResult, cardsResult };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const register = createAsyncThunk('auth/register', async ({ email, password, user }, thunkAPI) => {
  try {
    await registerService(email, password);
    const userData = await createUser(user);

    storeData('user', userData);

    return userData;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const updateUser = createAsyncThunk('auth/updateUser', async ({ email, userData }, thunkAPI) => {
  try {
    const updatedUser = await updateUserService(email, userData);
    return updatedUser;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addFavoriteRestaurant = createAsyncThunk(
  'auth/addFavoriteRestaurant',
  async ({ email, restaurant }, thunkAPI) => {
    try {
      const favorites = await addFavoriteRestaurantService(email, restaurant);
      return favorites;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const removeFavoriteRestaurant = createAsyncThunk(
  'auth/removeFavoriteRestaurant',
  async ({ email, restaurant }, thunkAPI) => {
    try {
      const favorites = await removeFavoriteRestaurantService(email, restaurant);
      return favorites;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addAddress = createAsyncThunk('auth/addAddress', async ({ email, address }, thunkAPI) => {
  try {
    const newAddressArr = [address];
    const addressesResult = await getAddressFromUser(email);
    const addresses = [...addressesResult, ...newAddressArr]
    const result = await addAddressFromUser(email, addresses);
    const newAddress = {
      ...result
    }

    deleteData('addresses');
    storeData('addresses', newAddress);

    return newAddress;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editAddress = createAsyncThunk('auth/updateAddress', async ({ email, index, address }, thunkAPI) => {
  try {
    const result = await updateAddressFromUser(email, index, address);
    const updatedddress = {
      ...result
    }

    deleteData('addresses');
    storeData('addresses', updatedddress);

    return updatedddress;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeAddress = createAsyncThunk('auth/deleteAddress', async ({ email, index }, thunkAPI) => {
  try {
    await removeAddressFromUser(email, index);

    const user = await getData('user');
    const addresses = (await getAddressFromUser(user.email));
    return { addresses };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addCard = createAsyncThunk('auth/addCard', async ({ email, card }, thunkAPI) => {
  try {
    const cardArr = [card];
    const cardsResult = await getCardsFromUser(email);
    const cards = [...cardsResult, ...cardArr]
    const result = await addCardFromUser(email, cards);

    const newCard = {
      ...result
    }

    return newCard;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const editCard = createAsyncThunk('auth/updateCard', async ({ email, index, card }, thunkAPI) => {
  try {
    const result = await updateCardFromUser(email, index, card);
    const updatedddress = {
      ...result
    }

    deleteData('cards');
    storeData('cards', updatedddress);

    return updatedddress;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const removeCard = createAsyncThunk('auth/deleteCard', async ({ email, index }, thunkAPI) => {
  try {
    await removeCardFromUser(email, index);

    const user = await getData('user');
    const cards = (await getCardsFromUser(user.email));
    return { cards };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loadUser = createAsyncThunk('auth/loadUser', async (_, thunkAPI) => {
  try {
    const user = await getData('user');
    const addresses = (await getAddressFromUser(user.email)) || (await getData('addresses')) || [];
    const cards = (await getData('cards')) || [];

    return { user, addresses, cards };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const loadAddress = createAsyncThunk('auth/loadAddress', async (_, thunkAPI) => {
  try {
    const user = await getData('user');
    const addresses = (await getAddressFromUser(user.email)) || (await getData('addresses')) || [];
    return { addresses };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const { logout, resetError } = authSlice.actions;

export default authSlice.reducer;
