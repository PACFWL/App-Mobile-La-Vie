import { REALTIME_DB_URL } from '../firebase/index'

export const getRestaurants = async () => {
  try {
    const response = await fetch(`${REALTIME_DB_URL}/restaurantes.json`);
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
