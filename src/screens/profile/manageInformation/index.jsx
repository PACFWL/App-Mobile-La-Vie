import { View, Text, TouchableOpacity, Image, ScrollView, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../../store/auth.slice';

import { DismissKeyboardView, Input, NavigationHeader } from '../../../components/common';

import { uploadImage } from '../../../utils';
import theme from '../../../theme';
import { styles } from './styles';

const ManageInformationScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);

  const [formState, setFormState] = useState({
    fullName: user.fullName,
    phone: user.phone
  });
  const [formError, setFormError] = useState('');
  const [loading, setLoading] = useState(false);

  const [pickedUrl, setPickedUrl] = useState(null);

  const verifyCameraPermissions = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa fornecer permissão para usar a camera', [{ text: 'OK' }], {
        userInterfaceStyle: 'light'
      });
      return false;
    }
    return true;
  }

  const verifyLibraryPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      Alert.alert('Permissão negada', 'Você precisa fornecer permissão para acessar a galeria', [{ text: 'OK' }], {
        userInterfaceStyle: 'light'
      });
      return false;
    }
    return true;
  }

  const handleSelectFromLibrary = async () => {
    const hasPermission = await verifyLibraryPermissions();

    if (!hasPermission) return;

    const image = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!image.canceled) setPickedUrl(image.assets[0].uri);
  }

  const handleTakeImage = async () => {
    const hasPermission = await verifyCameraPermissions();

    if (!hasPermission) return;

    const image = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });

    if (!image.canceled) setPickedUrl(image.assets[0].uri);
  }

  const handleSaveInformation = async () => {
    if (formState.fullName === '' || formState.phone === '') {
      setFormError('Todos os campos são obrigatorios');
      return;
    }

    if (formState.phone.length < 9) {
      setFormError('Numero de telefone invalido!');
      return;
    }

    const userData = {
      ...user,
      fullName: formState.fullName,
      phone: formState.phone
    }

    setLoading(true);

    if (pickedUrl) {
      const downloadUrl = await uploadImage(pickedUrl);
      userData.imgUrl = downloadUrl;
    }

    dispatch(updateUser({ email: user.email, userData }));
    setLoading(false);
    navigation.goBack();
  }

  return (
    <DismissKeyboardView style={styles.container}>
      <NavigationHeader text="Manage Information" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.avatarItem}>
          <Text style={styles.itemTitle}>Avatar</Text>
          <View style={styles.itemContent}>
            <Image
              style={styles.previewImg}
              resizeMode="contain"
              source={{ uri: pickedUrl ? pickedUrl : user.imgUrl }}
            />
            <View style={styles.changeImgOptions}>
              <TouchableOpacity onPress={handleSelectFromLibrary}>
                <View style={styles.changeImgOption}>
                  <MaterialIcons name="image" size={16} color={theme.colors.black} />
                  <Text style={styles.changeImgText}>Escolha uma foto da galeria</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={handleTakeImage}>
                <View style={styles.changeImgOption}>
                  <MaterialIcons name="camera-alt" size={16} color={theme.colors.black} />
                  <Text style={styles.changeImgText}>Tire uma foto</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.item}>
          <Input
            label="Nome completo"
            value={formState.fullName}
            onChangeText={text => setFormState(prev => ({ ...prev, fullName: text }))}
            placeholder="Insira o seu nome completo"
            placeholderTextColor={theme.colors.black}
            autoCapitalize="words"
            autoComplete="name"
            autoCorrect={false}
          />
          <MaterialIcons name="person-outline" size={24} color={theme.colors.black} />
        </View>

        <View style={styles.item}>
          <View style={styles.itemLeft}>
            <Text style={styles.itemLeftLabel}>E-mail</Text>
            <Text style={styles.itemLeftText}>{user.email}</Text>
          </View>
          <MaterialCommunityIcons name="email-outline" size={24} color={theme.colors.gray} />
        </View>

        <View style={styles.item}>
          <Input
            label="Telefone"
            value={formState.phone}
            onChangeText={text => setFormState(prev => ({ ...prev, phone: text }))}
            placeholder="Insira o seu numero de telefone"
            placeholderTextColor={theme.colors.black}
            keyboardType="number-pad"
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect={false}
          />
          <MaterialIcons name="phone-iphone" size={24} color={theme.colors.black} />
        </View>

        {formError !== '' && (
          <View style={styles.errorContainer}>
            <MaterialIcons name="error-outline" size={18} color={theme.colors.red} />
            <Text style={styles.errorText}>{formError}</Text>
          </View>
        )}

        <View style={styles.separatorBar}></View>

        <TouchableOpacity onPress={handleSaveInformation}>
          <View style={styles.saveBtn}>
            {loading ? (
              <ActivityIndicator size="small" color={theme.colors.black} />
            ) : (
              <Text style={styles.saveBtnText}>Salvar</Text>
            )}
          </View>
        </TouchableOpacity>
      </ScrollView>
    </DismissKeyboardView>
  );
}

export default ManageInformationScreen;
