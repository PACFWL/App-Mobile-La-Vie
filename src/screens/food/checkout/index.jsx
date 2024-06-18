import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React from 'react'
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { useSelector, useDispatch } from 'react-redux';
import { addOrder } from '../../../store/orders.slice';

import Order from '../../../models/Order';

import { NavigationHeader } from '../../../components/common';
import { OrderResumeCTA } from '../../../components/food';

import theme from '../../../theme';
import { styles } from './styles';

const CheckoutScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { restaurant, items, total, address, paymentType } = useSelector(state => state.order);
  const { user } = useSelector(state => state.auth);

  const handlePlaceOrder = () => {
    if (!address || !paymentType) {
      Alert.alert('Error', 'Escolha um método de pagamento', [{ text: 'OK' }], {
        userInterfaceStyle: 'light'
      });
      return;
    }

    const newOrder = new Order(
      user.email,
      { name: restaurant.name, logoUrl: restaurant.logoUrl },
      items,
      total,
      address,
      paymentType === 'card' ? 'Credit/Debit Card' : 'Pay Cash'
    );
    dispatch(addOrder({ order: newOrder }));

    navigation.navigate('Home');
    Alert.alert(
      'Pedido realizado!',
      'Seu pedido está sendo processado, é possivel visualiza-lo em pédidos',
      [{ text: 'Visualizar Pedidos', onPress: () => navigation.navigate('Orders', { screen: 'Home' }) }, { text: 'Fechar' }],
      { userInterfaceStyle: 'light' }
    );
  }

  return (
    <View style={styles.container}>
      <NavigationHeader text="Checkout" logoUrl={restaurant.logoUrl} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.addressContainer}>
          <Text style={styles.addressTitle}>Selecionar endereço</Text>
          {address ? (
            <View style={styles.addressSelected}>
              <View style={styles.addressSelectedData}>
                <Text style={styles.addressSelectedTitle}>{address.name}</Text>
                <Text style={styles.addressSelectedStreet}>{address.address}</Text>
              </View>

              <View style={styles.addressSelectedRight}>
                <View style={styles.addressSelectedTag}>
                  <Text style={styles.addressSelectedTagText}>{address.tag}</Text>
                </View>
                <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
                  <MaterialCommunityIcons
                    style={styles.addressChangeBtn}
                    name="dots-vertical"
                    size={22}
                    color={theme.colors.gray}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Addresses')}>
              <View style={styles.addAddressBtn}>
                <Text style={styles.addAddressBtnIcon}>+</Text>
                <Text style={styles.addAddressBtnText}>Selecionar um endereço</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        {/* Discount Code */}
        <View style={styles.discountContainer}>
          <Text style={styles.discountText}>Você possui um cupon de desconto?</Text>
          <TouchableOpacity>
            <View style={styles.discountBtn}>
              <Text style={styles.discountBtnIcon}>+</Text>
              <Text style={styles.discountBtnText}>Adicionar cupom</Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Payment Method */}
        <View>
          {paymentType === 'card' ? (
            <View style={styles.paymentContainer}>
              <View style={styles.paymentOption}>
                <MaterialCommunityIcons name="credit-card-outline" size={24} color={theme.colors.black} />
                <Text style={styles.paymentOptionText}>Cartão de crédito / débito</Text>
              </View>
              <View style={styles.paymentRight}>
                <Text style={styles.paymentRightText}>Taxa:</Text>
                <Text style={styles.paymentRightFee}>R$ 0.00</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
                  <MaterialIcons
                    style={styles.paymentChangeBtn}
                    name="keyboard-arrow-right"
                    size={24}
                    color={theme.colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : paymentType === 'cash' ? (
            <View style={styles.paymentContainer}>
              <View style={styles.paymentOption}>
                <MaterialCommunityIcons name="cash" size={24} color={theme.colors.black} />
                <Text style={styles.paymentOptionText}>Pagamento</Text>
              </View>
              <View style={styles.paymentRight}>
                <Text style={styles.paymentRightText}>Taxa:</Text>
                <Text style={styles.paymentRightFee}>R$ 0.00</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
                  <MaterialIcons
                    style={styles.paymentChangeBtn}
                    name="keyboard-arrow-right"
                    size={24}
                    color={theme.colors.black}
                  />
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <TouchableOpacity onPress={() => navigation.navigate('Payment')}>
              <View style={styles.addAddressBtn}>
                <Text style={styles.addAddressBtnIcon}>+</Text>
                <Text style={styles.addAddressBtnText}>Selecionar um método de pagamento</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.separatorBar}></View>

        {/* Order Data & Details */}
        <View style={styles.orderData}>
          <Text style={styles.orderDataTitle}>Dados do pedido</Text>
          <View style={styles.orderDataItem}>
            <Text style={styles.orderDataItemText}>Nome do restaurante</Text>
            <Text style={styles.orderDataItemText}>{restaurant.name}</Text>
          </View>
          <View style={styles.orderDataItem}>
            <Text style={styles.orderDataItemText}>Data do pedido</Text>
            <Text style={styles.orderDataItemText}>{new Date().toLocaleString()}</Text>
          </View>
        </View>

        <View style={styles.orderDetails}>
          <View>
            <Text style={styles.orderDataTitle}>Detalhes do pedido</Text>
            {items.map(item => (
              <View key={item.item.name} style={styles.orderDetailsItem}>
                <Text style={styles.orderDetailsItemText}>{item.item.name}</Text>
                <Text style={styles.orderDetailsItemText}>x {item.qty}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <OrderResumeCTA
        text="Pedido"
        total={total}
        navigateTo="Home"
        handlePlaceOrder={handlePlaceOrder}
        itemsLength={items.length}
      />
    </View>
  );
}

export default CheckoutScreen;
