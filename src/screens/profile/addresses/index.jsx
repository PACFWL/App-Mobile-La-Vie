import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useEffect } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';

import { NavigationHeader } from '../../../components/common';

import theme from '../../../theme';
import { styles } from './styles';
import { loadAddress } from '../../../store/auth.slice';

const AddressesScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { addresses } = useSelector(state => state.auth);

  useEffect(() => {
    dispatch((loadAddress()));
  }, [addresses]);


  return (
    <View style={styles.container}>
      <NavigationHeader text="Endereços" />

      <ScrollView>
        <View>
          {addresses.map((address, index) => (
            <TouchableOpacity key={index} onPress={() => navigation.navigate('ManageAddress', { address, index })}>
              <View style={styles.addressItem}>
                <View style={styles.addressData}>
                  <View style={styles.addressDataTop}>
                    <Text style={styles.addressDataTopTitle}>{address.name}</Text>
                    <Text style={styles.addressDataTopTag}>{address.tag}</Text>
                  </View>
                  <Text style={styles.addressDataStreet}>{address.address}</Text>
                </View>

                <MaterialCommunityIcons name="dots-vertical" size={24} color={theme.colors.gray} />
              </View>
            </TouchableOpacity>
          ))}

          <View style={styles.separatorBar}></View>

          <TouchableOpacity onPress={() => navigation.navigate('AddAddress')}>
            <View style={styles.addAddressBtn}>
              <Text style={styles.addAddressBtnIcon}>+</Text>
              <Text style={styles.addAddressBtnText}>Adicione um endereço</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

export default AddressesScreen;
