import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { setCard, setPaymentType } from '../../../store/order.slice';

import { NavigationHeader } from '../../../components/common';
import { OrderResumeCTA } from '../../../components/food';

import { showCardNumberLastDigits, isVisa } from '../../../utils';
import theme from '../../../theme';
import { styles } from './styles';

const CardsScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const { cards } = useSelector(state => state.auth);
  const { restaurant, items, total, card: orderCard } = useSelector(state => state.order);

  const handlePressCard = card => {
    dispatch(setPaymentType({ paymentType: 'card' }));
    dispatch(setCard({ card }));
  }

  return (
    <View style={styles.container}>
      <NavigationHeader text="Seus cartões" logoUrl={restaurant.logoUrl} />

      <View>
        {cards.map((card, index) => (
          <TouchableOpacity key={index} onPress={() => handlePressCard(card)}>
            <View
              style={[
                styles.cardItem,
                card.cardNumber === orderCard?.cardNumber && { borderColor: theme.colors.primary }
              ]}
            >
              <View style={styles.cardData}>
                <Image
                  style={styles.cardDataImg}
                  resizeMode="contain"
                  source={
                    isVisa(card.cardNumber)
                      ? require('../../../assets/images/visa-icon.png')
                      : require('../../../assets/images/master-icon.png')
                  }
                />
                <View style={styles.cardDataContent}>
                  <Text style={styles.cardDataNumber}>{showCardNumberLastDigits(card.cardNumber)}</Text>
                  <Text style={styles.cardDataType}>Cartão de crédito / débito</Text>
                </View>
              </View>

              {card.cardNumber === orderCard?.cardNumber && (
                <MaterialCommunityIcons name="check-circle" size={24} color={theme.colors.primary} />
              )}
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.separatorBar}></View>

        <TouchableOpacity onPress={() => navigation.navigate('Profile', { screen: 'AddCard' })}>
          <View style={styles.addCardBtn}>
            <Text style={styles.addCardBtnIcon}>+</Text>
            <Text style={styles.addCardBtnText}>Adicionar um novo cartão</Text>
          </View>
        </TouchableOpacity>
      </View>

      <OrderResumeCTA text="Checkout" total={total} navigateTo="Checkout" itemsLength={items.length} />
    </View>
  );
}

export default CardsScreen;
