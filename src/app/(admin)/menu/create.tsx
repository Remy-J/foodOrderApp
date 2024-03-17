import { useState } from 'react'
import { View, Text, StyleSheet, TextInput, Image, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { Stack, useLocalSearchParams } from 'expo-router'
import Colors from '@/constants/Colors'
import Button from '@components/Button'
import { defaultProductImage } from '@/components/ProductListItem'

const CreateProductScreen = () => {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [errors, setErrors] = useState('')
  const [image, setImage] = useState<string | null>(null)

  const { id } = useLocalSearchParams()
  const isUpdating = !!id

  const resetFields = () => {
    setName('')
    setPrice('')
  }
  const validateInput = () => {
    setErrors('')
    if (!name) {
      setErrors('Name is required')
      return false
    }
    if (!price) {
      setErrors('Price is required')
      return false
    }
    if (isNaN(parseFloat(price))) {
      setErrors('Price is not a number')
      return false
    }
    return true
  }
  const onCreate = () => {
    if (!validateInput()) {
      return
    }
    console.warn(errors)
    console.warn('Creating product')
    // Save in database
    resetFields()
  }

  const onUpdate = () => {
    if (!validateInput()) {
      return
    }
    console.warn(errors)
    console.warn('Updating product')
    // Save in database
    resetFields()
  }

  const onSubmit = () => {
    if (isUpdating) {
      onUpdate()
    } else {
      onCreate()
    }
  }

  const onDelete = () => {
    console.warn('Deleting')
    // Save in database
    resetFields()
  }

  const confirmDelete = () => {
    Alert.alert('Confirm', 'Are you sure you want to delete this product?', [
      {
        text: 'Cancel',
      },
      { text: 'Delete', style: 'destructive', onPress: onDelete },
    ])
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    })

    if (!result.canceled) {
      setImage(result.assets[0].uri)
    } else {
      alert('You did not select any image.')
    }
  }
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{ title: isUpdating ? 'Updateproduct' : 'Create Product' }}
      />
      <Image
        source={{ uri: image ?? defaultProductImage }}
        style={styles.image}
      />
      <Text onPress={pickImageAsync} style={styles.textButton}>
        Select image
      </Text>
      <Text style={styles.label}>Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder='Name'
        style={styles.input}
      />

      <Text style={styles.label}>Price ($)</Text>
      <TextInput
        value={price}
        onChangeText={setPrice}
        placeholder='9.99'
        keyboardType='numeric'
        style={styles.input}
      />
      <Text style={styles.error}>{errors}</Text>
      <Button onPress={onSubmit} text={isUpdating ? 'Update' : 'Create'} />
      {isUpdating && (
        <Text onPress={confirmDelete} style={styles.textButton}>
          Delete
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    marginBottom: 20,
  },
  error: {
    color: 'red',
  },
  image: {
    width: '50%',
    aspectRatio: 1,
    alignSelf: 'center',
  },
  textButton: {
    alignSelf: 'center',
    fontWeight: 'bold',
    color: Colors.light.tint,
    marginVertical: 10,
  },
})

export default CreateProductScreen
