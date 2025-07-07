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
  const [diasCumplir, setDiasCumplir] = useState('');


  const objetivosSugeridos = [
    "Aumentar volumen muscular",
    "Definición muscular",
    "Perder grasa corporal",
    "Mantener misma composición corporal",
    "Aumentar resistencia física"
  ];
  const objetivosContradictorios = {
    "Volumen muscular": ["Definición muscular", "Perder grasa corporal", "Mantener misma composición corporal"],
    "Definición muscular": ["Aumentar volumen muscular", "Mantener misma composición corporal"],
    "Perder grasa corporal": ["Mantener misma composición corporal"],
    "Mantener misma composición corporal": ["Aumentar volumen muscular", "Definición muscular", "Perder grasa corporal"],
  };


  const [objetivosSeleccionados, setObjetivosSeleccionados] = useState([]);



  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    cargarObjetivos();

  }, []);

  const cargarObjetivos = async () => {
    if (!user) return;

    const mesActual = moment().format('MM-YYYY');
    const objetivosRef = doc(FIREBASE_DB, 'Objetivos Mensuales', `${user.uid}_${mesActual}`);
    const docSnapshot = await getDoc(objetivosRef);

    if (docSnapshot.exists()) {
      const data = docSnapshot.data();
      setListaObjetivos(data.objetivos_personales || []);
      setObjetivosSeleccionados(data.objetivos_fitness || []);
    } else {
      setListaObjetivos([]);
      setObjetivosSeleccionados([]);
    }
  };


  const guardarObjetivo = async () => {
    if (!user) return;

    if (!objetivo.trim()) {
      Alert.alert("Error", "Por favor, rellena el objetivo.");
      return;
    }
    if (!diasCumplir.trim()) {
      Alert.alert("Error", "Por favor, indica los días para cumplir el objetivo.");
      return;
    }

    const mesActual = moment().format('MM-YYYY');
    const objetivosRef = doc(FIREBASE_DB, 'Objetivos Mensuales', `${user.uid}_${mesActual}`);
    const docSnapshot = await getDoc(objetivosRef);

    try {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const nuevosObjetivosPersonales = [...(data.objetivos_personales || []), {
          texto: objetivo,
          dias: parseInt(diasCumplir),
        }];
        await updateDoc(objetivosRef, {
          objetivos_personales: nuevosObjetivosPersonales,
        });

      } else {
        await setDoc(objetivosRef, {
          mes: mesActual,
          userId: user.uid,
          objetivos_personales: [{
            texto: objetivo,
            dias: parseInt(diasCumplir)
          }],
          objetivos_fitness: []
        });
      }

      Alert.alert("Éxito", "Objetivo personal guardado correctamente.");
      setObjetivo('');
      setDiasCumplir('');
      cargarObjetivos();
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar el objetivo.");
    }
  };


  const guardarObjetivosFitness = async () => {
    if (!user) return;

    const mesActual = moment().format('MM-YYYY');
    const objetivosRef = doc(FIREBASE_DB, 'Objetivos Mensuales', `${user.uid}_${mesActual}`);
    const docSnapshot = await getDoc(objetivosRef);

    try {
      if (docSnapshot.exists()) {
        await updateDoc(objetivosRef, {
          objetivos_fitness: objetivosSeleccionados,
        });
      } else {
        await setDoc(objetivosRef, {
          mes: mesActual,
          userId: user.uid,
          objetivos_personales: [],
          objetivos_fitness: objetivosSeleccionados
        });
      }

      Alert.alert("Éxito", "Objetivos fitness guardados correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar los objetivos fitness.");
    }
  };



  const eliminarObjetivo = async (index) => {
    const mesActual = moment().format('MM-YYYY');
    const objetivosRef = doc(FIREBASE_DB, 'Objetivos Mensuales', `${user.uid}_${mesActual}`);
    const docSnapshot = await getDoc(objetivosRef);

    if (docSnapshot.exists()) {
      const objetivos = docSnapshot.data().objetivos_personales || [];
      const nuevosObjetivos = objetivos.filter((_, i) => i !== index);

      try {
        await updateDoc(objetivosRef, {
          objetivos_personales: nuevosObjetivos
        });

        setListaObjetivos(nuevosObjetivos);
        Alert.alert("Éxito", "Objetivo eliminado correctamente.");
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al eliminar el objetivo.");
      }
    }
  };

  

  return (
    <ScrollView style={styles.container}>   
      <Text style={styles.sectionTitle}>Objetivos de {moment().format('MMMM')}</Text>
   
      <View style={styles.section} >
        <Text style={styles.label}>Objetivos Personales:</Text>
        <View style={{ flexDirection: 'row', gap: 10, marginTop: 10}}>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="Ej: caminar 2000 pasos diarios"
            value={objetivo}
            onChangeText={setObjetivo}
            keyboardType="default"
          />

          <TextInput
            style={{
              backgroundColor: '#E0F0FF',
              padding: 10,
              borderRadius: 10,
              width: 60,
              textAlign: 'center',
              color: '#2F5D8C',
            }}
            placeholder="Días"
            value={diasCumplir}
            onChangeText={setDiasCumplir}
            keyboardType="numeric"
          />

          <TouchableOpacity style={styles.button} onPress={diasCumplir<32 ? guardarObjetivo : Alert.alert("Error", "No puede ser mayor que 31 dias")}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        
        {listaObjetivos.map((obj, index) => (
          <View key={index} style={{display: 'flex', flexDirection: 'row', gap: 8, alignItems: 'center'}} >
              <Text style={styles.objetivoItem}>
                - {obj.texto} ({obj.dias} días)
              </Text>

              <TouchableOpacity 
              style={{ alignItems:'center', alignContent:'center', borderWidth: 2, borderColor:'red', width:25, height:25, borderRadius: 12.5 }} 
              onPress={() => eliminarObjetivo(index)} >
              <Text style={{color:'red', fontWeight:'bold'}}>x</Text>
              </TouchableOpacity>
          </View>
          ))}
      </View>
      
      <View style={styles.section} >
        <Text style={styles.label}>Selecciona tus objetivos fitness para este mes:</Text>

        {objetivosSugeridos.map((item, index) => {
          const seleccionado = objetivosSeleccionados.includes(item);

          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (seleccionado) {
                  setObjetivosSeleccionados(prev => prev.filter(obj => obj !== item));
                } else {
                  const conflictos = objetivosContradictorios[item]?.filter(conf => objetivosSeleccionados.includes(conf));

                  if (conflictos && conflictos.length > 0) {
                    Alert.alert(
                      "Objetivo contradictorio",
                      `No puedes seleccionar "${item}" porque se contradice a: ${conflictos.join(", ")}`
                    );
                    return;
                  }

                  setObjetivosSeleccionados(prev => [...prev, item]);
                }
              }}

              style={[
                styles.objetivoSugerido,
                { backgroundColor: seleccionado ? '#2F5D8C' : '#E0F0FF' }
              ]}
            >
              <Text style={{ color: seleccionado ? '#fff' : '#2F5D8C' }}>{item}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
      

      <TouchableOpacity style={[styles.button, { marginTop: 50 }]} onPress={guardarObjetivosFitness}>
        <Text style={styles.buttonText}>Guardar objetivos seleccionados</Text>
      </TouchableOpacity>


    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFFFFF', flex: 1 },
  label: { fontWeight: 'bold', marginTop: 10, color: '#2F5D8C' },
  input: {
    backgroundColor: '#E0F0FF',
    padding: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%'
  },
  inputText: { color: '#2F5D8C', fontSize: 16 },
  button: {
    backgroundColor: '#2F5D8C',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 20,
    color: '#2F5D8C',
    alignSelf: 'center'
  },
  objetivoItem: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  objetivoSugerido: {
    padding: 12,
    borderRadius: 8,
    marginVertical: 6,
    borderWidth: 1,
    borderColor: '#2F5D8C',
  },
  section: {
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
