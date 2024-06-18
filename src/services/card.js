import { db } from '../firebase';
import { child, ref, set, get, remove } from 'firebase/database';

export const getCardsFromUser = async email => {
  try {
    const key = email.split('.').join('-');
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, `card/${key}`));

    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('Não há cartões para esse usuario');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const removeCardFromUser = async (userEmail, index) => {
  try {
    const key = userEmail.split('.').join('-');
    const dbRef = ref(db);
    await remove(child(dbRef, `card/${key}/${index}`));
  } catch (error) {
    throw new Error(error.message);
  }
}

export const addCardFromUser = async (email, cardData) => {
  try {
    const key = email.split('.').join('-');
    const dbRef = ref(db);
    const snapshot = await set(child(dbRef, `card/${key}`), cardData);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('Algo deu errado!');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export const updateCardFromUser = async (email, index, cardData) => {
  try {
    const key = email.split('.').join('-');
    const dbRef = ref(db);
    const snapshot = await set(child(dbRef, `card/${key}/${index}`), cardData);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      throw new Error('Algo deu errado!');
    }
  } catch (error) {
    throw new Error(error.message);
  }
}