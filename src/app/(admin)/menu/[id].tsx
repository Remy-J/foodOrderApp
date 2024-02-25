import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { useState } from 'react';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import products from '@assets/data/products';
import { defaultProductImage } from '@/components/ProductListItem';
import Button from '@/components/Button';
import { useCartContext } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';

const SIZES: PizzaSize[] = ['S', 'M', 'L', 'XL'];

const ProductDetailsScreen = () => {
  const router = useRouter();
  const { addItem } = useCartContext();
  const { id } = useLocalSearchParams();
  const [selectedSize, setSelectedSize] = useState<PizzaSize>('M');
  const product = products.find((item) => item.id.toString() === id);

  const addToCard = () => {
    if (!product) return;
    addItem(product, selectedSize);
    router.push('/cart');
  };

  if (!product) {
    return <Text>Product not found</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: product.name }} />
      <Image
        style={styles.image}
        source={{ uri: product.image || defaultProductImage }}
        resizeMode='contain'
      />
      <Text style={styles.title}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  image: { width: '100%', aspectRatio: 1 },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default ProductDetailsScreen;
