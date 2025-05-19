import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet
} from 'react-native';
import { getAuth } from 'firebase/auth';
import {
    doc,
    setDoc,
    updateDoc,
    getDoc,
    collection,
    deleteDoc
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function GestionarObjetivos() {
  const [objetivo, setObjetivo] = useState('');
  const [listaObjetivos, setListaObjetivos] = useState([]);

  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    cargarObjetivos();

  }, []);

  const cargarObjetivos = async () => {
    if (!user) return;

    const mesActual = moment().format('MMMM');
    const objetivosRef = doc(FIREBASE_DB, 'Objetivos Mensuales', `${user.uid}_${mesActual}`);
    const docSnapshot = await getDoc(objetivosRef);

    if (docSnapshot.exists()) {
      setListaObjetivos(docSnapshot.data().objetivos);
    } else {
      setListaObjetivos([]);
    }
  };

  const guardarObjetivo = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    if (!objetivo.trim()) {
        Alert.alert("Error", "Por favor, rellena el objetivo.");
        return;
    }

    const mesActual = moment().format('MMMM');
    const objetivosRef = doc(FIREBASE_DB, 'Objetivos Mensuales', `${user.uid}_${mesActual}`);
    const docSnapshot = await getDoc(objetivosRef);

    try {
        if (docSnapshot.exists()) {
          await updateDoc(objetivosRef, {
            objetivos: [...docSnapshot.data().objetivos, objetivo]
          });
        } else {
          await setDoc(objetivosRef, {
            mes: mesActual,
            userId: user.uid,
            objetivos: [objetivo]
          });
        }
  
        Alert.alert("Éxito", "Objetivo guardado correctamente.");
        setObjetivo('');
        cargarObjetivos(); 
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al guardar el objetivo.");
    }
  };

  const eliminarObjetivo = async (index) => {
    const mesActual = moment().format('MMMM');
    const objetivosRef = doc(FIREBASE_DB, 'Objetivos Mensuales', `${user.uid}_${mesActual}`);
    const docSnapshot = await getDoc(objetivosRef);
  
    if (docSnapshot.exists()) {
      const objetivos = docSnapshot.data().objetivos;
  
      const nuevosObjetivos = objetivos.filter((_, i) => i !== index);
  
      try {
        await updateDoc(objetivosRef, {
          objetivos: nuevosObjetivos
        });
  
        setListaObjetivos(nuevosObjetivos);
        Alert.alert("Éxito", "Objetivo eliminado correctamente.");
      } catch (error) {
        console.error(error);
        Alert.alert("Error", "Hubo un problema al eliminar el objetivo.");
      }
    }
  };
  

  return (
    <ScrollView style={styles.container}>      

      <Text style={styles.label}>Objetivo:</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: caminar 2000 pasos diarios"
        value={objetivo}
        onChangeText={setObjetivo}
        keyboardType="default"
        />

      <TouchableOpacity style={styles.button} onPress={guardarObjetivo}>
        <Text style={styles.buttonText}>Añadir</Text>
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Objetivos de {moment().format('MMMM')}:</Text>
      {listaObjetivos.map((obj, index) => (
        <View key={index} style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center'}} >
            <Text style={styles.objetivoItem}>
            - {obj} 
            </Text>
            <TouchableOpacity 
            style={{ alignItems:'center', alignContent:'center', borderWidth: 2, borderColor:'red', width:25, height:25, borderRadius: 12.5 }} 
            onPress={() => eliminarObjetivo(index)} >
            <Text style={{color:'red', fontWeight:'bold'}}>x</Text>
            </TouchableOpacity>
        </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFFFFF', flex: 1 },
  label: { fontWeight: 'bold', marginTop: 10 },
  input: {
    backgroundColor: '#E0F0FF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputText: { color: '#2F5D8C', fontSize: 16 },
  button: {
    backgroundColor: '#2F5D8C',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  objetivoItem: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
});
