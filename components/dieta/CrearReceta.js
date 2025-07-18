import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  Linking,
  Platform,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';



const CrearRecetaScreen = () => {
  const [nombreReceta, setNombreReceta] = useState('');
  const [description, setDescription] = useState('');
  const route = useRoute();
  const tipoLlamada = route.params?.tipo || 'tipo de comida';
  const [tipo, setTipo] = useState(tipoLlamada);

  const [ingredientes, setIngredientes] = useState([]);
  const [pasos, setPasos] = useState([]);
  const [imagenURL, setImagenURL] = useState(null);
  const [nombreIngrediente, setNombreIngrediente] = useState('');
  const [cantidadIngrediente, setCantidadIngrediente] = useState('');
  const [unidadMedida, setUnidadMedida] = useState('g');
  const [paso, setPaso] = useState('');
  const [duración, setDuracion] = useState('');

  const [objetivo, setObjetivo] = useState([]);

  const navigation = useNavigation();

  
  

  const agregarIngrediente = () => {
    if (!nombreIngrediente || !cantidadIngrediente) {
      Alert.alert('Campos vacíos', 'Por favor completa el nombre y la cantidad.');
      return;
    }

    const nuevo = {
      nombre: nombreIngrediente,
      cantidad: cantidadIngrediente,
      unidad: unidadMedida,
    };

    setIngredientes([...ingredientes, nuevo]);
    setNombreIngrediente('');
    setCantidadIngrediente('');
    setUnidadMedida('g');
  };

  const agregarPaso = () => {
    if (!paso) return;
    setPasos([...pasos, paso]);
    setPaso('');
  };

  const seleccionarImagen = async () => {
    let permiso = await ImagePicker.getMediaLibraryPermissionsAsync();
  
    if (!permiso.granted) {
      if (!permiso.canAskAgain) {
        Alert.alert(
          'Permiso requerido',
          'Debes habilitar el permiso de galería manualmente en la configuración.',
          [
            { text: 'Cancelar', style: 'cancel' },
            {
              text: 'Abrir configuración',
              onPress: () => {
                if (Platform.OS === 'ios') {
                  Linking.openURL('app-settings:');
                } else {
                  Linking.openSettings();
                }
              },
            },
          ]
        );
        return;
      }
  
      const nuevoPermiso = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!nuevoPermiso.granted) {
        Alert.alert('Permiso denegado', 'No se pudo obtener acceso a la galería.');
        return;
      }
    }
  
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (!result.canceled && result.assets?.length > 0) {
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
  
    if (!result.canceled && result.assets && result.assets.length > 0) {
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
    data.append('upload_preset', 'mi_preset');
    data.append('cloud_name', 'djpa1rej0'); 

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

  const guardarReceta = async () => {
    if (!nombreReceta || tipo ==='tipo de comida' || !description || ingredientes.length === 0) {
      Alert.alert('Datos incompletos', 'Por favor completa todos los campos.');
      return;
    }
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert("Error", "No hay un usuario autenticado.");
      return;
    }
  
    try {
      let imagenEnlace = '';
      if (imagenURL) {
        imagenEnlace = await subirImagenACloudinary(imagenURL);
      }
  
      const recetaData = {
        title: nombreReceta,
        description,
        tipo,
        ingredientes,
        pasos,
        image: imagenEnlace,
        duración,
        createdAt: new Date(),
        userId: user.uid,
      };
  
      const recetaRef = await addDoc(collection(FIREBASE_DB, 'recetas'), recetaData);
  
      Alert.alert("Éxito", "Receta guardada correctamente.");
      navigation.goBack();
  
      const ingredientesString = ingredientes.map(
        ing => `${ing.cantidad} ${ing.unidad} de ${ing.nombre}`
      ).join(', ');
  
      setTimeout(async () => {
        try {
          const response = await fetch('http://10.0.2.2:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'llama3',
              prompt: `Clasifica el objetivo nutricional de esta receta: "${description}", "${ingredientesString}".
               Devuelve estrictamente un array JSON llamado "objetivos" con los elementos seleccionados de: ["Alta en proteínas", "Baja en calorías", "Alta en calorías", "Baja en grasas", "Alta en carbohidratos", "Baja en carbohidratos", "Bajo índice glucémico", "Alta en fibra", "Sin lactosa", "Sin gluten", "Vegana", "Vegetariana"].

Solo incluye los elementos que realmente correspondan según los ingredientes y cantidades. Evalúa los valores por ración (según el número de personas). Utiliza las siguientes reglas aproximadas:

- "Alta en proteínas" si contiene más de 20 g de proteína por ración.
- "Alta en calorías" si supera 600 kcal por ración. "Baja en calorías" si es menor de 400 kcal por ración.
- "Baja en grasas" si no supera los 8 g de grasa por ración.
- "Alta en carbohidratos" si tiene más de 40 g de carbohidratos por ración. "Baja en carbohidratos" si tiene menos de 20 g.
- "Bajo índice glucémico" si todos los carbohidratos provienen de legumbres, vegetales, frutas bajas en azúcar o cereales integrales.
- "Alta en fibra" si tiene más de 7 g de fibra por ración.
- "Sin lactosa" si no contiene leche, queso, yogur u otros lácteos.
- "Sin gluten" si no contiene trigo, cebada, centeno ni pan normal.
- "Vegana" si no contiene ingredientes animales.
- "Vegetariana" si no contiene carne ni pescado.

No des explicaciones ni texto adicional. Devuelve solo el array. Por ejemplo: ["Alta en proteínas", "Alta en fibra", "Vegana"].`,
              stream: false
            })
          });
  
          const data = await response.json();
          let objetivos = [];
  
          try {
            const parsed = JSON.parse(data.response.trim());
            if (Array.isArray(parsed)) {
              objetivos = parsed;
            } else if (Array.isArray(parsed.objetivos)) {
              objetivos = parsed.objetivos
                .filter(item => item.value === true)
                .map(item => item.label);
            }
          } catch {
            const matches = data.response.match(/"([^"]+)"/g);
            if (matches) {
              objetivos = matches.map(str => str.replace(/"/g, ''));
            }
          }
  
          await updateDoc(doc(FIREBASE_DB, 'recetas', recetaRef.id), {
            objetivo: { objetivos },
          });
  
        } catch (error) {
          console.error("Error al obtener y guardar el objetivo nutricional:", error);
        }
      }, 500);

      setTimeout(async () => {
        try {
          const prompt = `Dime cuántas calorías tiene esta comida. Ten en cuenta que hay 5 comidas diarias. Haz una estimación equilibrada para que, con la suma de las 5 comidas, se acerque al máximo diario. Ninguna comida puede superar las 800 calorías. Usa valores medios entre 100 y 600. Devuélveme solo el número (en kcal), sin explicaciones ni texto adicional.
                    Título: ${nombreReceta}
                    Descripción: ${description}
                    Ingredientes: ${ingredientesString}`

          const response = await fetch('http://10.0.2.2:11434/api/generate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              model: 'llama3',
              prompt: prompt,
              stream: false
            })
          });
  
          const data = await response.json();
          const match = data.response.match(/(\d+(\.\d+)?)/);
  
          if (match) {
            const kcalValue = parseFloat(match[1]);
            await updateDoc(doc(FIREBASE_DB, 'recetas', recetaRef.id), {
              kcal: kcalValue, 
            });
            return kcalValue;
          } else {
            console.warn("No se pudo extraer un número de calorías válido:", data.response);
            return 0;
          }
  
        } catch (error) {
          console.error("Error al obtener y guardar las kcal:", error);
        }
      }, 500);
  
    } catch (error) {
      console.error("Error al crear receta: ", error);
      Alert.alert("Error", "No se pudo guardar la receta.");
    }
  };
  

  return (
    <View contentContainerStyle={{ paddingBottom: 120 }} style={styles.container}>
      
      <View style={styles.botonCentrado}>
        <TouchableOpacity
          style={[styles.botonCustom, { width:150, height: 50, justifyContent: 'center', backgroundColor: '#C7F2E6' }]}
          onPress={guardarReceta}
        >
          <Text style={[styles.botonCustomText, {color: '#2F5D8C'}]}>Guardar</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 100, paddingTop: 20}} >
        <View style={styles.seccion}>

              <TextInput
                placeholder="Nombre"
                style={styles.input}
                value={nombreReceta}
                onChangeText={setNombreReceta}
              />
              <TextInput
                placeholder="Descripción"
                style={styles.input}
                value={description}
                onChangeText={setDescription}
              />
              <View style={styles.medidaDropdown}>
                <Picker
                  selectedValue={tipo}
                  onValueChange={(value) => setTipo(value)}
                >
                  <Picker.Item label="tipo de comida" value="tipo de comida" />
                  <Picker.Item label="desayuno" value="desayuno" />
                  <Picker.Item label="media mañana" value="media mañana" />
                  <Picker.Item label="comida" value="comida" />
                  <Picker.Item label="merienda" value="merienda" />
                  <Picker.Item label="cena" value="cena" />
                </Picker>
                
              </View>
              <TextInput
                  placeholder="Tiempo de preparación (min)"
                  style={styles.input}
                  keyboardType="numeric"
                  value={duración.toString()}
                  onChangeText={(text) => {
                    const valorNumerico = parseInt(text, 10);
                    setDuracion(isNaN(valorNumerico) ? 0 : valorNumerico);
                  }}
                />
            </View>

            
            <Text style={styles.titulo}>Describe la receta</Text>
            
            <View style={styles.seccion}>
              <View style={styles.ingredienteContainer}>
                <Text style={styles.subtitulo}>Ingredientes</Text>
          
                <View style={styles.row}>
                  <TextInput
                    placeholder="Ingrediente"
                    style={[styles.input, { width: '30%', marginRight: 5 }]}
                    value={nombreIngrediente}
                    onChangeText={setNombreIngrediente}
                  />
                  <TextInput
                    placeholder="Cantidad"
                    style={[styles.input, { width: '25%', marginRight: 5 }]}
                    value={cantidadIngrediente}
                    keyboardType="numeric"
                    onChangeText={setCantidadIngrediente}
                  />
                  <View style={[styles.medidaDropdown, { width: '30%' }]}>
                    <Picker
                      selectedValue={unidadMedida}
                      onValueChange={(itemValue) => setUnidadMedida(itemValue)}
                    >
                      <Picker.Item label="g" value="g" />
                      <Picker.Item label="ml" value="ml" />
                      <Picker.Item label="unidad/es" value="unidades" />
                      <Picker.Item label="cucharada/s" value="cucharadas" />
                      <Picker.Item label="taza/s" value="tazas" />
                    </Picker>
                  </View>
                  <TouchableOpacity style={[styles.botonCustom, { paddingHorizontal: 10 }]} onPress={agregarIngrediente}>
                    <Text style={styles.botonCustomText}>+</Text>
                  </TouchableOpacity>
                </View>

              
                
          
                {ingredientes.map((item, index) => (
                  <Text key={index} style={styles.ingredienteItem}>
                    {item.nombre}: {item.cantidad} {item.unidad}
                  </Text>
                ))}
              </View>
            </View>

            <View style={styles.seccion}>
              <View style={styles.pasosContainer}>
                <Text style={styles.subtitulo}>Pasos</Text>
                <View style={{flexDirection: 'row', gap: 20}} >
                  <TextInput
                    placeholder="Descripción de un paso"
                    style={styles.inputPaso}
                    value={paso}
                    onChangeText={setPaso}
                  />
                  <View >
                    <TouchableOpacity style={styles.botonCustomPaso} onPress={agregarPaso}>
                      <Text style={styles.botonCustomText}> + </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
        
              {pasos.map((item, index) => (
                <Text key={index} style={styles.pasoItem}>
                  {index + 1}. {item}
                </Text>
              ))}
            </View>
        
            <View style={styles.seccion}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 90, alignItems: 'center' }}>
                <Text style={styles.subtitulo}>Añadir Imagen</Text>

                <TouchableOpacity onPress={mostrarOpciones} style={styles.boton}>
                  <Ionicons name="cloud-upload-outline" size={24} color="white" />
                </TouchableOpacity>
              </View>

              {imagenURL && (
                <Image source={{ uri: imagenURL }} style={styles.imagen} />
              )}
            </View>
      </ScrollView>
      


      
  
      
    </View>
  );
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff',
    padding: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2F5D8C'
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2F5D8C',
    marginBottom: 10
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    backgroundColor: '#E0F0FF'
  },
  inputPaso: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    backgroundColor: '#E0F0FF',
    width: '78%'
  },
  inputSmall: {
    flex: 1,
    marginRight: 5,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  medidaDropdown: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    marginLeft: 5,
    justifyContent: 'center',
    height: 40,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  ingredienteContainer: {
    marginBottom: 20,
  },
  pasosContainer: {
    marginBottom: 20,
  },
  ingredienteItem: {
    fontSize: 16,
    marginTop: 5,
  },
  pasoItem: {
    fontSize: 16,
    marginTop: 5,
  },
  imagen: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: 15,
  },
  boton: {
    backgroundColor: '#2F5D8C',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10
  },
  botonTexto: {
    color: 'white',
    fontWeight: 'bold',
  },
  botonCentrado: {
    alignItems: 'center',
    marginTop: 10,
  },
  botonCustom: {
    backgroundColor: '#2F5D8C',
    paddingVertical: 8,
    paddingHorizontal: 18,
    borderRadius: 8,
    marginBottom:10,
    marginLeft: 10
  },
  botonCustomPaso: {
    backgroundColor: '#2F5D8C',
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  botonCustomText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center'
  },
  seccion: {
    borderWidth: 1,
    borderColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
});

export default CrearRecetaScreen;
