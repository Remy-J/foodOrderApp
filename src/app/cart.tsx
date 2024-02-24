import React from 'react'
import { View, Platform, FlatList, Text } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { useCartContext } from '@/providers/CartProvider'

import CartListItem from '@/components/CartListItem'
import Button from '@/components/Button'

const CartScreen = () => {
  const { items, total } = useCartContext()
  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={items}
        renderItem={({ item }) => <CartListItem cartItem={item} />}
        contentContainerStyle={{ padding: 10, gap: 10 }}
      />
      <Text style={{ marginTop: 20, fontSize: 20, fontWeight: '500' }}>Total: ${total}</Text>
      <Button text='Checkout' />
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

export default CartScreen