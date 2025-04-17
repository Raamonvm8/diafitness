import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function DetalleReceta({ route }) {
  const { receta } = route.params; // Obtener los datos de la receta pasada como parámetro

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{receta.nombre}</Text>
      <Image source={{ uri: receta.imagen }} style={styles.image} />
      <Text style={styles.description}>{receta.descripcion}</Text>
      <Text style={styles.ingredientsTitle}>Ingredientes:</Text>
      <Text style={styles.ingredients}>{receta.ingredientes}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  ingredientsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  ingredients: {
    fontSize: 16,
  },
});
