import React from 'react'
import { View, Platform, FlatList } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCartContext } from '@/providers/CartProvider'

import CartListItem from '@/components/CartListItem'

const CartScreen = () => {
  const { items } = useCartContext()
  return (
    <View>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen