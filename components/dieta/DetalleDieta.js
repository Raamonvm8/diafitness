import React, { useState, useEffect } from 'react';
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
import { collection, updateDoc, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';



export default function DetalleDieta() {
    const route = useRoute();
    const navigation = useNavigation();
    const { dieta, recetas } = route.params;

    const [title, setTitle] = useState(dieta.title);
    const [description, setDescription] = useState(dieta.description);

    const [dietData, setDietData] = useState(dieta.dieta || {});
    const [isEditing, setIsEditing] = useState(false);

    const [diasDesplegados, setDiasDesplegados] = useState({});
    const [detalles, setDetalles] = useState([]);
    const ordenComidas = ['Desayuno', 'Media Mañana', 'Comida', 'Merienda', 'Cena'];



    const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
    const nombresDias = {
        L: 'Lunes',
        M: 'Martes',
        X: 'Miércoles',
        J: 'Jueves',
        V: 'Viernes',
        S: 'Sábado',
        D: 'Domingo',
    };

    const handleSave = async () => {
        try {
        const comidaRef = doc(FIREBASE_DB, 'dietas', dieta.id);
        await updateDoc(comidaRef, {
            title,
            description,
            dieta: dietData,
        });

        console.log("Dieta actualizada:", { title, description, dieta: dietData });
        setIsEditing(false);
        } catch (error) {
        console.log("Error al guardar la dieta", error);
        }
    };

    const toggleDia = (dia) => {
        setDiasDesplegados(prev => ({
            ...prev,
            [dia]: !prev[dia],
        }));
    };
    
    const obtenerDetallesReceta = async (id) => {
        const ref = doc(FIREBASE_DB, 'recetas', id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
            return { id: snap.id, ...snap.data() };
        }
        return null;
    };

    useEffect(() => {
        const cargarDetalles = async () => {
            const detallesCompletos = [];

            for (const dia of Object.keys(dieta)) {
            for (const seccion of Object.keys(dieta[dia])) {
                for (const comida of dieta[dia][seccion]) {
                const receta = await obtenerDetallesReceta(comida.id);
                if (receta) {
                    detallesCompletos.push({
                    dia,
                    seccion,
                    ...receta
                    });
                }
                }
            }
            }

            setDetalles(detallesCompletos);
        };

        cargarDetalles();
    }, []);




    const editarDieta = () => {
        setIsEditing(true);
    };

  const actualizarDia = (dia, index, nuevoTexto) => {
    const copia = { ...dietData };
    if (!copia[dia]) copia[dia] = [];
    copia[dia][index] = nuevoTexto;
    setDietData(copia);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.label}>Título:</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={title} onChangeText={setTitle} multiline />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}

      <Text style={styles.label}>Descripción:</Text>
      {isEditing ? (
        <TextInput style={styles.input} value={description} onChangeText={setDescription} multiline />
      ) : (
        <Text style={styles.text}>{description}</Text>
      )}

      {diasSemana.map((dia) => (
        <View key={dia} style={{ marginBottom: 20 }}>
            <TouchableOpacity onPress={() => toggleDia(dia)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.label}>{nombresDias[dia]}</Text>
            <Text style={{ color: '#2F5D8C', marginLeft: 10, fontSize: 18, marginBottom: 5 }}>
                {diasDesplegados[dia] ? '▲' : '▼'}
            </Text>
            </TouchableOpacity>

            {diasDesplegados[dia] &&
            dietData[dia] &&
            ['Desayuno', 'Media Mañana', 'Comida', 'Merienda', 'Cena']
                .filter((tipo) => dietData[dia][tipo]) 
                .map((comidaTipo) => (
                <View key={comidaTipo} style={{ marginBottom: 10, paddingLeft: 10 }}>
                    <Text style={{ color: '#2F5D8C' , fontWeight: '600', fontSize: 16, marginBottom: 5 }}>{comidaTipo}</Text>

                    {dietData[dia][comidaTipo].map((receta, index) => (
                    <View key={index} style={{ paddingLeft: 10, marginBottom: 8 }}>
                        {isEditing ? (
                        <>
                            <TextInput
                            style={styles.input}
                            value={receta.title}
                            onChangeText={(nuevoNombre) => {
                                const copia = { ...dietData };
                                copia[dia][comidaTipo][index].title = nuevoNombre;
                                setDietData(copia);
                            }}
                            />
                            <TextInput
                            style={styles.input}
                            value={receta.description}
                            onChangeText={(nuevoDetalle) => {
                                const copia = { ...dietData };
                                copia[dia][comidaTipo][index].description = nuevoDetalle;
                                setDietData(copia);
                            }}
                            />
                        </>
                        ) : (
                        <TouchableOpacity onPress={() => navigation.navigate('DetalleReceta', { receta })}>
                            <Text style={styles.text}>🍽 {receta.title}</Text>
                            <Text style={{ color: '#666' }}>{receta.description}</Text>
                        </TouchableOpacity>
                        )}
                    </View>
                    ))}
                </View>
                ))}
        </View>
        ))}




      {isEditing ? (
        <TouchableOpacity style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button} onPress={editarDieta}>
          <Text style={styles.buttonText}>Editar Dieta</Text>
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
