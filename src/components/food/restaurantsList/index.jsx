import { View, Text, ScrollView, FlatList } from 'react-native';
import React from 'react';

import RestaurantItem from '../restaurantItem';

import { styles } from './styles';

const RestaurantsList = ({
  listRef,
  navigation,
  search,
  filteredRestaurants,
  favoriteRestaurants,
  featuredRestaurants,
  fastestRestaurants
}) => {
  return (
    <ScrollView ref={listRef} style={styles.container}>
      {search !== '' ? (
        <View style={styles.restaurantsSection}>
          <Text style={styles.restaurantsSectionHeading}>Procurar por "{search}"</Text>
          <FlatList
            data={filteredRestaurants}
            renderItem={({ item }) => <RestaurantItem restaurant={item} navigation={navigation} />}
            keyExtractor={item => item.name}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.restaurantsSlider}
          />
        </View>
      ) : (
        <>
          {favoriteRestaurants.length !== 0 && (
            <View style={styles.restaurantsSection}>
              <Text style={styles.restaurantsSectionHeading}>Seus lugares favoritos</Text>
              <FlatList
                data={favoriteRestaurants}
                renderItem={({ item }) => <RestaurantItem restaurant={item} navigation={navigation} />}
                keyExtractor={item => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.restaurantsSlider}
              />
            </View>
          )}

          {featuredRestaurants.length !== 0 && (
            <View style={styles.restaurantsSection}>
              <Text style={styles.restaurantsSectionHeading}>Local destacado</Text>
              <FlatList
                data={featuredRestaurants}
                renderItem={({ item }) => <RestaurantItem restaurant={item} navigation={navigation} />}
                keyExtractor={item => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.restaurantsSlider}
              />
            </View>
          )}

          {fastestRestaurants.length !== 0 && (
            <View style={styles.restaurantsSection}>
              <Text style={styles.restaurantsSectionHeading}>Preparo rápido</Text>
              <FlatList
                data={fastestRestaurants}
                renderItem={({ item }) => <RestaurantItem restaurant={item} navigation={navigation} />}
                keyExtractor={item => item.name}
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.restaurantsSlider}
              />
            </View>
          )}
        </>
      )}
    </ScrollView>
  );
}

export default RestaurantsList;
