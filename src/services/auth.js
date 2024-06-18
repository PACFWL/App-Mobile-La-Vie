import { AUTH_LOGIN_URL, AUTH_REGISTER_URL } from '../firebase';

export const login = async (email, password) => {
  try {
    const response = await fetch(AUTH_LOGIN_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    });

    if (!response.ok) {
      throw new Error('Senha ou e-mail invalido');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}

export const register = async (email, password) => {
  try {
    const response = await fetch(AUTH_REGISTER_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true
      })
    });

    const data = await response.json();

    if (!response.ok) {
      const { message } = data.error;

      if (message === 'EMAIL_EXISTS') {
        throw new Error('Email já cadastrado');
      }
      if (message === 'INVALID_EMAIL') {
        throw new Error('Insira um email válido');
      }
      if (message === 'WEAK_PASSWORD : Password should be at least 6 characters') {
        throw new Error('Senha precisa conter no minimo 6 caracteres');
      }

      throw new Error(message);
    }

    return data;
  } catch (error) {
    throw new Error(error.message);
  }
}
