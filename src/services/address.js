import { db } from '../firebase';
import { child, ref, set, get, remove } from 'firebase/database';

export const getAddressFromUser = async email => {
  try {
    const key = email.split('.').join('-');
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `address/${key}`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('Não há endereços para esse usuario');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const removeAddressFromUser = async (userEmail, index) => {
  try {
    const key = userEmail.split('.').join('-');
    const dbRef = ref(db);
    await remove(child(dbRef, `address/${key}/${index}`));
  } catch (error) {
    throw new Error(error.message);
  }
}

export const addAddressFromUser = async (email, addressData) => {
  try {
    const key = email.split('.').join('-');
    const dbRef = ref(db);
    const snapshot = await set(child(dbRef, `address/${key}`), addressData);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('Algo deu errado!');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const updateAddressFromUser = async (email, index, addressData) => {
  try {
    const key = email.split('.').join('-');
    const dbRef = ref(db);
    const snapshot = await set(child(dbRef, `address/${key}/${index}`), addressData);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('Algo deu errado!');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}