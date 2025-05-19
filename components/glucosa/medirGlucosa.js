import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Modal
} from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  where,
  query,
  onSnapshot,
  collection
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function MedirGlucosa() {
  const [hora, setHora] = useState('');
  const [nivelGlucosa, setNivelGlucosa] = useState('');
  const [nota, setNota] = useState('');
  const [glucosas, setGlucosas] = useState([]);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [tempHora, setTempHora] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const glucosaRef = collection(FIREBASE_DB, 'glucosa');
    const q = query(glucosaRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setGlucosas(data);
    });

    return () => unsubscribe();
  }, []);

  const guardarGlucosa = async () => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    if (!hora || !nivelGlucosa) {
      Alert.alert("Error", "Por favor, rellena la hora y el nivel de glucosa.");
      return;
    }

    try {
      await addDoc(collection(FIREBASE_DB, 'glucosa'), {
        fecha: new Date().toISOString().split('T')[0],
        hora,
        nivelGlucosa,
        nota,
        createdAt: new Date(),
        userId: user.uid,
      });

      Alert.alert("Éxito", "Glucosa guardada correctamente.");
      setHora('');
      setNivelGlucosa('');
      setNota('');
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar la glucosa.");
    }
  };

  const seleccionarHora = (event, selectedTime) => {
    if (selectedTime) {
      setTempHora(selectedTime);
    }
  };

  const abrirSelectorHora = () => {
    setTempHora(hora ? moment(hora, 'HH:mm').toDate() : new Date());
    setModalVisible(true);
  };

  const confirmarHora = () => {
    setHora(moment(tempHora).format('HH:mm'));
    setModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Hora</Text>
      <TouchableOpacity style={styles.input} onPress={abrirSelectorHora}>
        <Text style={styles.inputText}>
          {hora ? hora : "Selecciona la hora"}
        </Text>
      </TouchableOpacity>

      {/* Modal para el selector de hora */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Selecciona la hora</Text>
            <DateTimePicker
              mode="time"
              value={tempHora}
              is24Hour={true}
              display="spinner"
              onChange={seleccionarHora}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.cancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.confirmButton} onPress={confirmarHora}>
                <Text style={styles.confirmButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      <Text style={styles.label}>Nivel de glucosa (mg/dL)</Text>
      <TextInput
        style={styles.input}
        placeholder="Ej: 100"
        value={nivelGlucosa}
        onChangeText={setNivelGlucosa}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Nota (opcional)</Text>
      <TextInput
        style={styles.input}
        placeholder="Observaciones..."
        value={nota}
        onChangeText={setNota}
      />

      <TouchableOpacity style={styles.button} onPress={guardarGlucosa}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
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

  // Estilos del Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: '#FF5C5C',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#2F5D8C',
    padding: 10,
    borderRadius: 5,
  },
  cancelButtonText: { color: '#fff' },
  confirmButtonText: { color: '#fff' },
});
