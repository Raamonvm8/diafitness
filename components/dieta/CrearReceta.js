import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';


import {
  View,
  TextInput,
  Image,
  Alert,
  Button,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function CrearReceta() {
  const [imagenURL, setImagenURL] = useState(null);
  const [ingredientes, setIngredientes] = useState([]);
  const [nombreIngrediente, setNombreIngrediente] = useState('');
  const [cantidadIngrediente, setCantidadIngrediente] = useState('');
  const navigation = useNavigation();

  const [newItem, setNewItem] = React.useState({
    title: '',
    description: '',
    ingredients: [],
    image: null,
  });

  const handleCrear = async () => {
    if (!newItem.title || !newItem.description || ingredientes.length === 0 || !imagenURL) {
      Alert.alert("Campos incompletos", "Por favor completa todos los campos antes de guardar.");
      return;
    }
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert("Error", "No hay un usuario autenticado.");
      return;
    }
  
    try {
      const imagenEnlace = await subirImagenACloudinary(imagenURL);
  
      await addDoc(collection(FIREBASE_DB, 'recetas'), {
        title: newItem.title,
        description: newItem.description,
        ingredients: ingredientes,
        image: imagenEnlace,
        createdAt: new Date(),
        userId: user.uid, 
      });
  
      Alert.alert("Éxito", "Receta guardada correctamente.");
      navigation.goBack();
    } catch (error) {
      console.error("Error al crear receta: ", error);
      Alert.alert("Error", "No se pudo guardar la receta.");
    }
  };
  

  const seleccionarImagen = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita permiso para acceder a la galería.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagenURL(result.assets[0].uri);
    }
  };

  const tomarFoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso requerido', 'Se necesita permiso para usar la cámara.');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagenURL(result.assets[0].uri);
    }
  };

  const mostrarOpciones = () => {
    Alert.alert(
      'Subir Imagen',
      '¿Qué deseas hacer?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Elegir de la galería', onPress: seleccionarImagen },
        { text: 'Tomar una foto', onPress: tomarFoto },
      ],
      { cancelable: true }
    );
  };

  const subirImagenACloudinary = async (uri) => {
    const data = new FormData();
    data.append('file', {
      uri,
      type: 'image/jpeg',
      name: 'foto.jpg'
    });
    data.append('upload_preset', 'mi_preset'); // <-- tu preset
    data.append('cloud_name', 'djpa1rej0'); // <-- tu cloud name

    try {
      const res = await fetch('https://api.cloudinary.com/v1_1/djpa1rej0/image/upload', {
        method: 'POST',
        body: data,
      });

      const json = await res.json();
      return json.secure_url;
    } catch (err) {
      console.error('Error al subir imagen a Cloudinary:', err);
      throw err;
    }
  };

  const agregarIngrediente = () => {
    if (!nombreIngrediente || !cantidadIngrediente) {
      Alert.alert("Campos vacíos", "Por favor completa el nombre y la cantidad.");
      return;
    }

    const nuevo = {
      nombre: nombreIngrediente,
      cantidad: cantidadIngrediente,
    };

    setIngredientes([...ingredientes, nuevo]);
    setNombreIngrediente('');
    setCantidadIngrediente('');
  };

  const eliminarIngrediente = (index) => {
    const nuevosIngredientes = [...ingredientes];
    nuevosIngredientes.splice(index, 1);
    setIngredientes(nuevosIngredientes);
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        placeholder="Título"
        style={styles.input}
        value={newItem.title}
        onChangeText={(text) => setNewItem({ ...newItem, title: text })}
      />

      <TextInput
        placeholder="Descripción"
        style={styles.input}
        value={newItem.description}
        onChangeText={(text) => setNewItem({ ...newItem, description: text })}
      />

      <View style={styles.row}>
        <TextInput
          placeholder="Ingrediente"
          style={[styles.input, styles.inputSmall]}
          value={nombreIngrediente}
          onChangeText={setNombreIngrediente}
        />
        <TextInput
          placeholder="Cantidad (g)"
          style={[styles.input, styles.inputSmall]}
          value={cantidadIngrediente}
          keyboardType="numeric"
          onChangeText={setCantidadIngrediente}
        />
        <Button title="Añadir" onPress={agregarIngrediente} />
      </View>

      {ingredientes.map((item, index) => (
        <View key={index} style={styles.ingredienteRow}>
          <Text style={styles.ingredienteItem}>
            {item.nombre}: {item.cantidad} g
          </Text>
          <TouchableOpacity onPress={() => eliminarIngrediente(index)}>
            <Text style={styles.eliminarBoton}>−</Text>
          </TouchableOpacity>
        </View>
      ))}

      <Button title="Subir imagen" onPress={mostrarOpciones} />
      {imagenURL && (
        <Image source={{ uri: imagenURL }} style={styles.imagen} />
      )}
      <Button title="Guardar receta" onPress={handleCrear} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
  inputSmall: {
    flex: 1,
    marginRight: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ingredienteRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
  },
  ingredienteItem: {
    fontSize: 16,
  },
  eliminarBoton: {
    fontSize: 20,
    color: 'red',
    marginLeft: 10,
    paddingHorizontal: 10,
  },
  imagen: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 10,
  },
});
