import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons'

import { useDispatch, useSelector } from 'react-redux'
import { addFavoriteRestaurant, removeFavoriteRestaurant } from '../../../store/auth.slice'

import { DismissKeyboardView, SearchBar } from '../../../components/common'

import theme from '../../../theme'
import { styles } from './styles'
import { CategoryMenuList, MenuItem } from '../../../components/food'

const RestaurantScreen = ({ route, navigation }) => {
  const { restaurant } = route.params;
  const { menu, categories } = restaurant;
  const dispatch = useDispatch();

  const { items: orderItems, total: orderTotal } = useSelector(state => state.order);

  const { user } = useSelector(state => state.auth);

  const [isFavorite, setIsFavorite] = useState(user.favorites?.some(favorite => favorite === restaurant.name));

  const [search, setSearch] = useState('Comida1');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(menu);

  const menuListRef = useRef();

  const handlePlaceOrder = () => navigation.navigate('Order');

  const filteredMenuBeforeRender = () => {
    if (menu) {
      setFilteredMenu(menu.filter(item => item.name?.toLowerCase().includes(search?.toLowerCase())));
    }
  }

  const handleGoBack = () => {
    if (orderItems.length === 0) {
      navigation.goBack();
      return;
    }

    Alert.alert(
      'Tem certeza?',
      'Seu pedido será limpado se você voltar.',
      [
        {
          text: 'Cancela',
          style: 'destructive'
        },
        {
          text: 'Ok',
          onPress: () => navigation.goBack()
        }
      ],
      { userInterfaceStyle: 'light' }
    );
  }

  const handleAddFavorite = () => {
    dispatch(addFavoriteRestaurant({ email: user.email, restaurant: restaurant.name }));
    setIsFavorite(true);
  }

  const handleRemoveFavorite = () => {
    dispatch(removeFavoriteRestaurant({ email: user.email, restaurant: restaurant.name }));
    setIsFavorite(false);
  }

  useEffect(() => {
    filteredMenuBeforeRender();
  }, [search]);

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredMenu(menu);
    } else {
      setFilteredMenu(menu.filter(item => item.category === selectedCategory));
    }
    setSearch('');
    menuListRef.current?.scrollTo({ animated: true, y: 0 });
  }, [selectedCategory]);

  return (
    <DismissKeyboardView style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity onPress={handleGoBack}>
          <MaterialCommunityIcons name="arrow-left" size={32} color={theme.colors.gray} />
        </TouchableOpacity>
        <TouchableOpacity onPress={isFavorite ? handleRemoveFavorite : handleAddFavorite}>
          <MaterialCommunityIcons
            name={isFavorite ? 'cards-heart' : 'cards-heart-outline'}
            size={32}
            color={isFavorite ? theme.colors.red : theme.colors.gray}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.headerText}>
          <Text style={styles.headerSubtitle}>{restaurant.slogan}</Text>
          <Text style={styles.headerTitle}>{restaurant.name}</Text>
        </View>
        <Image style={styles.headerImg} resizeMode="contain" source={{ uri: restaurant.logoUrl }} />
      </View>

      <SearchBar placeholder="Procurar comida" search={search} setSearch={setSearch} />

      <View style={styles.categoriesContainer}>
        <TouchableOpacity onPress={() => setSelectedCategory('')}>
          <View style={styles.categoriesFirstItem}>
            <MaterialCommunityIcons name="silverware" size={20} color={theme.colors.black} />
            <Text style={styles.categoriesFirstItemText}>Menu</Text>
          </View>
        </TouchableOpacity>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} onPress={() => setSelectedCategory(category)}>
              <View style={styles.categoriesItem}>
                <Text
                  style={[
                    styles.categoriesItemText,
                    selectedCategory === category ? { color: theme.colors.black } : {}
                  ]}
                >
                  {category}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView ref={menuListRef} style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {search !== '' ? (
          <View style={styles.menuSection}>
            <Text style={styles.menuSectionHeading}>Procurar por "{search}"</Text>
            <View style={styles.menuSectionList}>
              {filteredMenu.map((item, index) => (
                <MenuItem key={index} item={item} restaurant={restaurant} />
              ))}
            </View>
          </View>
        ) : (
          categories.map((category, index) => (
            <CategoryMenuList key={index} category={category} filteredMenu={filteredMenu} restaurant={restaurant} />
          ))
        )}
      </ScrollView>

      {orderItems.length > 0 && (
        <View style={styles.placeOrderContainer}>
          <View style={styles.placeOrderPrice}>
            <FontAwesome5 name="concierge-bell" size={18} color={theme.colors.black} />
            <Text style={styles.placeOrderPriceText}>${orderTotal.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={handlePlaceOrder}>
            <View style={styles.placeOrderCTA}>
              <Text style={styles.placeOrderCTAText}>Pedido</Text>
              <View style={styles.placeOrderCTAQty}>
                <Text style={styles.placeOrderCTAQtyText}>{orderItems.length}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </DismissKeyboardView>
  );
}

export default RestaurantScreen;
