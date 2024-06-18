import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../../../store/orders.slice';

import { OrderItem } from '../../../components/orders';

import theme from '../../../theme';
import { styles } from './styles';

const HomeScreen = () => {
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items: orders, loading, error } = useSelector(state => state.orders);

  useEffect(() => {
    dispatch(fetchOrders({ email: user.email }));
  }, [dispatch, user.email]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>Historico do pedido</Text>
        <Text style={styles.headerTitle}>Aqui fica os seus pedidos</Text>
      </View>

      {loading ? (
        <View style={styles.loadingErrorContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
        </View>
      ) : orders.length > 0 ? (
        <FlatList
          data={orders}
          renderItem={({ item }) => <OrderItem order={item} />}
          keyExtractor={item => item.date}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <View style={styles.loadingErrorContainer}>
          <Ionicons name="warning-outline" size={28} color={theme.colors.primary} />
          <Text style={styles.loadingErrorText}>{error || "Você não tem pedido relizados"}</Text>
        </View>
      )}
    </View>
  );
}

export default HomeScreen;
