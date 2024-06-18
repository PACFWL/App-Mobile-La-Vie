import { View, Text, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { removeCard, editCard } from '../../../store/auth.slice';

import { Input, NavigationHeader } from '../../../components/common';

import { isVisa, formatCardNumber } from '../../../utils';
import theme from '../../../theme';
import { styles } from './styles';

const ManageCardScreen = ({ route, navigation }) => {
  const { card, index } = route.params;
  const { user } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const [newCard, setNewCard] = useState({
    cardNumber: card.cardNumber,
    cardHolder: card.cardHolder,
    expirationDate: card.expirationDate,
    cvv: card.cvv
  });

  const handleDelete = () => {
    return Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir este cartão?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            dispatch(removeCard({ email: user.email, index: index }));
            navigation.goBack();
          }
        }
      ],
      { userInterfaceStyle: 'light' }
    )
  }

  const handleSave = () => {
    if (!newCard.cardNumber || !newCard.cardHolder || !newCard.expirationDate || !newCard.cvv) {
      return Alert.alert('Error', 'Preencha todos os campos', [{ text: 'OK' }], {
        userInterfaceStyle: 'light'
      })
    }

    dispatch(editCard({ email: user.email, index: index, card: newCard }));
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <NavigationHeader text="Cartão" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={[
            styles.card,
            newCard.cardNumber
              ? isVisa(newCard.cardNumber)
                ? { backgroundColor: theme.colors.blue }
                : { backgroundColor: theme.colors.orange }
              : {}
          ]}
        >
          <View style={styles.cardTop}>
            {newCard.cardNumber !== '' ? (
              isVisa(newCard.cardNumber) ? (
                <Image
                  style={styles.cardImg}
                  resizeMode="contain"
                  source={require('../../../assets/images/visa-icon.png')}
                />
              ) : (
                <Image
                  style={styles.cardImg}
                  resizeMode="contain"
                  source={require('../../../assets/images/master-icon.png')}
                />
              )
            ) : null}
            <MaterialCommunityIcons
              style={{ transform: [{ rotate: '45deg' }] }}
              name="signal-variant"
              size={24}
              color={theme.colors.white}
            />
          </View>

          <Text style={styles.cardNumber}>{formatCardNumber(newCard.cardNumber)}</Text>

          <View style={styles.cardBottom}>
            <Text style={styles.cardExpDate}>Valido até: {newCard.expirationDate}</Text>
            <Text style={styles.cardHolder}>{newCard.cardHolder}</Text>
          </View>
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Numero do cartão"
            value={newCard.cardNumber}
            onChangeText={text => setNewCard({ ...newCard, cardNumber: text })}
            placeholder="Insira o numero do cartão"
            placeholderTextColor={theme.colors.black}
            keyboardType="number-pad"
            autoComplete="off"
            autoCorrect={false}
            maxLength={16}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Titular do cartão"
            value={newCard.cardHolder}
            onChangeText={text => setNewCard({ ...newCard, cardHolder: text })}
            placeholder="Insira o titular do cartão"
            placeholderTextColor={theme.colors.black}
            autoComplete="name"
            autoCapitalize="words"
            autoCorrect={false}
            maxLength={30}
          />
        </View>

        <View style={styles.rowInputContainer}>
          <Input
            label="Data de expiração"
            value={newCard.expirationDate}
            onChangeText={text => setNewCard({ ...newCard, expirationDate: text })}
            placeholder="MM/YY"
            placeholderTextColor={theme.colors.black}
            keyboardType=""
            autoComplete="off"
            autoCorrect={false}
            maxLength={5}
          />
          <Input
            label="CVV"
            value={newCard.cvv}
            onChangeText={text => setNewCard({ ...newCard, cvv: text })}
            placeholder="Insira o código de segurança"
            placeholderTextColor={theme.colors.black}
            keyboardType="number-pad"
            autoComplete="off"
            autoCorrect={false}
            maxLength={3}
          />
        </View>

        <View style={styles.separatorBar}></View>

        <TouchableOpacity onPress={handleDelete}>
          <View style={styles.deleteBtn}>
            <Text style={styles.deleteBtnText}>Deletar</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleSave}>
          <View style={styles.saveBtn}>
            <Text style={styles.saveBtnText}>Salvar</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

export default ManageCardScreen;
