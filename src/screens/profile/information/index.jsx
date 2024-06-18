import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';

import { useSelector } from 'react-redux';

import { NavigationHeader } from '../../../components/common';

import { styles } from './styles';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import theme from '../../../theme';

const InformationScreen = ({ navigation }) => {
  const { user } = useSelector(state => state.auth);

  return (
    <View style={styles.container}>
      <NavigationHeader text={user.fullName} />

      <View style={styles.imgContainer}>
        <Image style={styles.image} resizeMode="contain" source={{ uri: user.imgUrl }} />
      </View>

      <View style={styles.informationItem}>
        <View style={styles.informationItemLeft}>
          <Text style={styles.informationItemLeftLabel}>Nome completo</Text>
          <Text style={styles.informationItemLeftText}>{user.fullName}</Text>
        </View>
        <MaterialIcons name="person-outline" size={24} color={theme.colors.black} />
      </View>

      <View style={styles.informationItem}>
        <View style={styles.informationItemLeft}>
          <Text style={styles.informationItemLeftLabel}>E-mail</Text>
          <Text style={styles.informationItemLeftText}>{user.email}</Text>
        </View>
        <MaterialCommunityIcons name="email-outline" size={24} color={theme.colors.black} />
      </View>

      <View style={styles.informationItem}>
        <View style={styles.informationItemLeft}>
          <Text style={styles.informationItemLeftLabel}>Telefone</Text>
          <Text style={styles.informationItemLeftText}>{user.phone}</Text>
        </View>
        <MaterialIcons name="phone-iphone" size={24} color={theme.colors.black} />
      </View>

      <View style={styles.separatorBar}></View>

      <TouchableOpacity onPress={() => navigation.navigate('ManageInformation')}>
        <View style={styles.editBtn}>
          <Text style={styles.editText}>Editar</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default InformationScreen;
