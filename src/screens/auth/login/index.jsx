import { View, Text, ActivityIndicator, TouchableOpacity, ScrollView } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { login, resetError } from '../../../store/auth.slice';

import { DismissKeyboardView, Input } from '../../../components/common';

import theme from '../../../theme';
import { styles } from './styles';

const LoginScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector(state => state.auth);

  const [formState, setFormState] = useState({
    email: '',
    password: ''
  });

  const [formError, setFormError] = useState('');

  const handleLogin = () => {
    const { email, password } = formState;

    if (!email || !password) {
      setFormError('Todos os campos são requeridos!');
      setTimeout(() => {
        setFormError('')
      }, 4000);
      return;
    }

    dispatch(login({ email, password }));
  }

  useFocusEffect(
    useCallback(() => {
      dispatch(resetError());
      setFormError('');
      setFormState({
        email: '',
        password: ''
      });
    }, [])
  )

  return (
    <DismissKeyboardView style={styles.container}>
      <Text style={styles.header}>Bem vindo ao La Vie</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Input
              label="E-mail"
              value={formState.email}
              onChangeText={text => setFormState(prev => ({ ...prev, email: text }))}
              placeholder="Insira o seu e-mail"
              placeholderTextColor={theme.colors.black}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect={false}
            />
            <MaterialCommunityIcons name="email-outline" size={24} color={theme.colors.black} />
          </View>

          <View style={styles.inputContainer}>
            <Input
              label="Senha"
              value={formState.password}
              onChangeText={text => setFormState(prev => ({ ...prev, password: text }))}
              placeholder="Insira a sua senha"
              placeholderTextColor={theme.colors.black}
              autoCapitalize="none"
              autoComplete="none"
              autoCorrect={false}
              secureTextEntry
            />
            <MaterialCommunityIcons name="lock-outline" size={24} color={theme.colors.black} />
          </View>

          {(error || formError !== '') && (
            <View style={styles.errorContainer}>
              <MaterialIcons name="error-outline" size={18} color={theme.colors.red} />
              <Text style={styles.errorText}>{error ? error : formError}</Text>
            </View>
          )}

          <TouchableOpacity disabled={loading} onPress={handleLogin}>
            <View style={styles.button}>
              {loading ? (
                <ActivityIndicator size="small" color={theme.colors.black} />
              ) : (
                <Text style={styles.buttonText}>Login</Text>
              )}
            </View>
          </TouchableOpacity>

          <View style={styles.linkContainer}>
            <Text style={styles.linkText}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.link}>Registre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </DismissKeyboardView>
  )
}

export default LoginScreen
