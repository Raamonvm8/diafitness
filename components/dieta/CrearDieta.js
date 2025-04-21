import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, addDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function CrearDieta() {
  const [comidas, setComidas] = useState([]);
  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevoDetalle, setNuevoDetalle] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigation = useNavigation();

  const agregarComida = () => {
    if (!nuevoNombre || !nuevoDetalle) {
      Alert.alert("Campos vacíos", "Por favor completa el nombre y detalle de la comida.");
      return;
    }

    const nueva = {
      nombre: nuevoNombre,
      detalle: nuevoDetalle,
    };

    setComidas([...comidas, nueva]);
    setNuevoNombre('');
    setNuevoDetalle('');
  };

  const eliminarComida = (index) => {
    const nuevas = [...comidas];
    nuevas.splice(index, 1);
    setComidas(nuevas);
  };

  const guardarDieta = async () => {
    if (!title || !description || comidas.length === 0) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos.");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) {
      Alert.alert("Error", "No hay usuario autenticado.");
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, 'dietas'), {
        title,
        description,
        comidas,
        createdAt: new Date(),
        userId: user.uid,
      });

      Alert.alert("Éxito", "Dieta guardada correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al guardar dieta:", error);
      Alert.alert("Error", "No se pudo guardar la dieta.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Título de la dieta"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={description}
        onChangeText={setDescription}
      />

      <Text style={styles.subtitulo}>Añadir comida:</Text>
      <View style={styles.row}>
        <TextInput
          placeholder="Nombre"
          style={[styles.input, styles.inputSmall]}
          value={nuevoNombre}
          onChangeText={setNuevoNombre}
        />
        <TextInput
          placeholder="Detalle"
          style={[styles.input, styles.inputSmall]}
          value={nuevoDetalle}
          onChangeText={setNuevoDetalle}
        />
        <Button title="Añadir" onPress={agregarComida} />
      </View>

      {comidas.map((comida, index) => (
        <View key={index} style={styles.comidaItem}>
          <Text style={styles.comidaText}>{comida.nombre} - {comida.detalle}</Text>
          <TouchableOpacity onPress={() => eliminarComida(index)}>
            <Text style={styles.eliminarTexto}>❌</Text>
          </TouchableOpacity>
        </View>
      ))}

      <TouchableOpacity onPress={guardarDieta} style={styles.guardarBtn}>
        <Text style={styles.guardarTexto}>Guardar dieta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    backgroundColor: '#E0F7FA',
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
  },
  inputSmall: {
    flex: 1,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitulo: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  comidaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#C5E1A5',
    padding: 10,
    borderRadius: 6,
    marginVertical: 5,
  },
  comidaText: {
    fontSize: 14,
  },
  eliminarTexto: {
    color: 'red',
    fontWeight: 'bold',
  },
  guardarBtn: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  guardarTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
});
