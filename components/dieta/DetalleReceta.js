import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, updateDoc, doc, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';


export default function DetalleReceta() {
  const route = useRoute();
  const { receta } = route.params;

  const [title, setTitle] = useState(receta.title);
  const [description, setDescription] = useState(receta.description);
  const [ingredients, setIngredients] = useState(receta.ingredients || []);
  const [steps, setSteps] = useState(receta.steps || []);
  const [isEditing, setIsEditing] = useState(false);

  const [nuevoNombre, setNuevoNombre] = useState('');
  const [nuevaCantidad, setNuevaCantidad] = useState('');
  const [nuevaUnidad, setNuevaUnidad] = useState('g');


  const handleSave = async () => {

    try{
      const comidaRef = doc(FIREBASE_DB, 'recetas', receta.id);
      await updateDoc(comidaRef, {
        title,
        description,
        ingredients,
        steps
      });

      console.log("Guardar receta actualizada:", { title, description, ingredients, steps });
      setIsEditing(false);
    } catch (error){
      console.log("Error al guardar la comida", error);
    }
    
  };

  const editarComida = () => {
    setIsEditing(true);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      {receta.image && (
        <Image source={{ uri: receta.image }} style={styles.image} />
      )}
      <Text style={styles.label}>Título:</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={title} onChangeText={setTitle} multiline />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}

      <Text style={styles.label}>Descripción:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={description}
          onChangeText={setDescription}
          multiline
        />
      ) : (
        <Text style={styles.text}>{description}</Text>
      )}

      <Text style={styles.label}>Ingredientes:</Text>
      {ingredients.map((item, index) => (
        isEditing ? (
          <View key={index} style={styles.inputContainer}>
            <TextInput
              style={[styles.input, styles.inlineInput]} 
              value={item.nombre}
              onChangeText={(text) => {
                const updatedIngredients = [...ingredients];
                updatedIngredients[index].nombre = text;
                setIngredients(updatedIngredients);
              }}
            />
            <TextInput
              style={[styles.input, styles.inlineInput]}
              value={item.cantidad.toString()}
              onChangeText={(text) => {
                const updatedIngredients = [...ingredients];
                updatedIngredients[index].cantidad = parseInt(text, 10);
                setIngredients(updatedIngredients);
              }}
            />
            <TextInput
              style={[styles.input, styles.inlineInput]} 
              value={item.unidad}
              onChangeText={(text) => {
                const updatedIngredients = [...ingredients];
                updatedIngredients[index].unidad = text;
                setIngredients(updatedIngredients);
              }}
            />
          </View>
        ) : (
          <View key={index} style={styles.textAll}>
            <Text>{item.nombre}: {item.cantidad} {item.unidad}</Text>
          </View>
        )
      ))}
      {isEditing && (
      <View style={styles.ingredienteContainer}>
        <View style={styles.row}>
          <TextInput
            placeholder="Ingrediente"
            style={[styles.input, styles.inputSmall]}
            value={nuevoNombre}
            onChangeText={setNuevoNombre}
          />
          <TextInput
            placeholder="Cantidad"
            style={[styles.input, styles.inputSmall]}
            value={nuevaCantidad}
            keyboardType="numeric"
            onChangeText={setNuevaCantidad}
          />
          <View style={[styles.pickerContainer]}>
            <Picker
              selectedValue={nuevaUnidad}
              onValueChange={(itemValue) => setNuevaUnidad(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="g" value="g" />
              <Picker.Item label="ml" value="ml" />
              <Picker.Item label="unidad/es" value="unidades" />
              <Picker.Item label="cucharada/s" value="cucharadas" />
              <Picker.Item label="taza/s" value="tazas" />
            </Picker>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (!nuevoNombre || !nuevaCantidad) return;
            setIngredients([...ingredients, {
              nombre: nuevoNombre,
              cantidad: parseFloat(nuevaCantidad),
              unidad: nuevaUnidad
            }]);
            setNuevoNombre('');
            setNuevaCantidad('');
            setNuevaUnidad('g');
          }}
          style={[styles.buttonAddIngredient]}
        >
          <Text style={styles.buttonText}>Añadir ingrediente</Text>
        </TouchableOpacity>
      </View>
    )}



      <Text style={styles.label}>Pasos:</Text>
      {steps.map((item, index) => (
        isEditing ? (
          <View key={index} style={styles.inputContainer}>
            <Text style={styles.stepNumber}>{index + 1}.</Text>
            <TextInput
              multiline
              style={[styles.input, styles.inlineInputPasos]} 
              value={item}
              onChangeText={(text) => {
                const updatedSteps = [...steps];
                updatedSteps[index] = text;
                setSteps(updatedSteps);
              }}
            />
          </View>
        ) : (
          <View key={index} style={styles.textAll}>
            <Text>{index + 1}. {item}</Text>
          </View>
        )
      ))}

      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={editarComida}>
          <Text style={styles.buttonText}>Editar Comida</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f4f4f4',
    marginBottom: 70

  },
  scrollViewContent: {
    paddingBottom: 100, 
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    fontSize: 18,
    color: '#2F5D8C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    fontSize: 16,
    backgroundColor: '#fff',
    maxHeight: 40, 
    textAlignVertical: 'top', 
    flexShrink: 1,
  },
  inlineInput: {
    marginRight: 10,
    width: '30%',
  },
  inlineInputPasos: {
    marginRight: 10,
    width: '100%',
    flexWrap: 'wrap'
  },
  button: {
    backgroundColor: '#2F5D8C',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 40, 
    left: 20,
    right: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 16,
    marginBottom: 15,
    color: '#333',
  },
  textAll: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    gap: 10,
  },
  stepNumber: {
    fontWeight: 'bold',
    fontSize: 18,
    marginRight: 10,
  },
  ingredienteContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  inputSmall: {
    flex: 1,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginLeft: 5,
    justifyContent: 'center',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#E0F0FF',
    width: '100%'
  },
  picker: {
    width: '110%',
    justifyContent: 'center',
  },
  
  buttonAddIngredient: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 0,
    width: '100%',
  },
});
