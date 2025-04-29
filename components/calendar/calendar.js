import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';

export default function CalendarioView() {
  const hoy = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(hoy);
  const [eventos, setEventos] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState('');

  const marcarFecha = (date) => {
    setSelectedDate(date.dateString);
  };

  const agregarEvento = () => {
    if (!nuevoEvento) return;
    setEventos(prev => ({
      ...prev,
      [selectedDate]: [...(prev[selectedDate] || []), nuevoEvento],
    }));
    setNuevoEvento('');
    setModalVisible(false);
  };

  const objetivosDelMes = [
    'Ir al gimnasio 3 veces por semana',
    'Beber 2L de agua al día',
    'Evitar azúcar procesado'
  ];

  return (
    <ScrollView style={styles.container}>
      <Calendar
        onDayPress={marcarFecha}
        markedDates={{
          [selectedDate]: { selected: true, marked: true, selectedColor: '#2F5D8C' },
        }}
        theme={{
          backgroundColor: '#FFFFFF',
          calendarBackground: '#FFFFFF',
          todayTextColor: '#2F5D8C',
          arrowColor: '#2F5D8C',
        }}
        firstDay={1}
      />

      <View style={styles.seccionDia}>
        <Text style={styles.subtitulo}>Resumen del {selectedDate || 'día'}</Text>
        {eventos[selectedDate]?.length ? (
          eventos[selectedDate].map((evento, i) => (
            <Text key={i} style={styles.evento}>- {evento}</Text>
          ))
        ) : (
          <Text style={styles.noEvento}>No hay eventos para este día.</Text>
        )}

        <TouchableOpacity style={styles.boton} onPress={() => setModalVisible(true)}>
          <Feather name="plus" size={20} color="#2F5D8C" />
          <Text style={styles.botonTexto}>Añadir evento</Text>
        </TouchableOpacity>
      </View>

      

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.subtitulo}>Nuevo evento</Text>
            <TextInput
              value={nuevoEvento}
              onChangeText={setNuevoEvento}
              placeholder="Escribe el evento"
              style={styles.input}
            />
            <TouchableOpacity style={styles.boton} onPress={agregarEvento}>
              <Text style={styles.botonTexto}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F0FF',
    padding: 30,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2F5D8C',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2F5D8C',
    marginBottom: 8,
  },
  seccionDia: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 16,
    shadowColor: '#00000020',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  evento: {
    color: '#2F5D8C',
    marginBottom: 4,
  },
  noEvento: {
    color: '#888',
    fontStyle: 'italic',
  },
  boton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C7F2E6',
    padding: 10,
    borderRadius: 10,
    marginTop: 12,
    alignSelf: 'flex-start'
  },
  botonTexto: {
    marginLeft: 8,
    color: '#2F5D8C',
    fontWeight: '600',
  },
  objetivosMes: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  objetivo: {
    color: '#2F5D8C',
    marginBottom: 6,
  },
  botonSecundario: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#E0F0FF',
    borderRadius: 10,
    alignItems: 'center'
  },
  botonSecundarioTexto: {
    color: '#2F5D8C',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#00000088',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '80%',
  },
  input: {
    borderColor: '#2F5D8C',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
  },
  cancelar: {
    color: '#888',
    marginTop: 10,
    textAlign: 'center'
  },
});