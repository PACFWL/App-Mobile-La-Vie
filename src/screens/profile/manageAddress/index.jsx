import { View, Text, ScrollView, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { MaterialIcons } from '@expo/vector-icons';

import { useDispatch } from 'react-redux';
import { removeAddress, editAddress } from '../../../store/auth.slice';

import { Input, NavigationHeader } from '../../../components/common';

import theme from '../../../theme';
import { styles } from './styles';

const ManageAddressScreen = ({ route, navigation }) => {
  const { address, index } = route.params;

  const dispatch = useDispatch();

  const [newAddress, setNewAddress] = useState({
    name: address.name,
    address: address.address,
    tag: address.tag,
    phone: address.phone,
    userEmail: address.userEmail,
  });

  const handleDelete = () => {
    return Alert.alert(
      'Excluir',
      'Tem certeza que deseja excluir o endereço?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Deletar',
          style: 'destructive',
          onPress: () => {
            dispatch(removeAddress({ email: address.userEmail, index: index }))
            navigation.navigate('Addresses')
          }
        }
      ],
      { userInterfaceStyle: 'light' }
    );
  }

  const handleSave = () => {
    if (!newAddress.name || !newAddress.address || !newAddress.tag || !newAddress.phone) {
      return Alert.alert('Error', 'Preencha todos os campos', [{ text: 'OK' }], {
        userInterfaceStyle: 'light'
      });
    }

    dispatch(editAddress({  email: address.userEmail, index, address: newAddress }))
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <NavigationHeader text={newAddress.name} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Input
            label="Nome"
            value={newAddress.name}
            onChangeText={text => setNewAddress(prev => ({ ...prev, name: text }))}
            placeholder="Insira o seu nome"
            placeholderTextColor={theme.colors.black}
            autoCapitalize="words"
            autoComplete="name"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Endereço"
            value={newAddress.address}
            onChangeText={text => setNewAddress(prev => ({ ...prev, address: text }))}
            placeholder="Insira o seu endereço"
            placeholderTextColor={theme.colors.black}
            autoComplete="street-address"
            autoCorrect={false}
          />
        </View>

        <View style={styles.addressPinPoint}>
          <View style={styles.addressPinPointLeft}>
            <MaterialIcons name="location-on" size={24} color={theme.colors.black} />
            <Text style={styles.addressPinPointLeftText}>Adicione um pin point</Text>
          </View>
          <MaterialIcons name="keyboard-arrow-right" size={24} color={theme.colors.black} />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Tag"
            value={newAddress.tag}
            onChangeText={text => setNewAddress(prev => ({ ...prev, tag: text }))}
            placeholder="Insira uma tag para o endereço"
            placeholderTextColor={theme.colors.black}
            autoCapitalize="words"
            autoCorrect={false}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            label="Telefone"
            value={newAddress.phone}
            onChangeText={text => setNewAddress(prev => ({ ...prev, phone: text }))}
            placeholder="Insira o seu telefone"
            placeholderTextColor={theme.colors.black}
            keyboardType="number-pad"
            autoCorrect={false}
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

export default ManageAddressScreen;
