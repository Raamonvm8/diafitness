import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, FlatList, Modal, TextInput, ScrollView } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { Feather } from '@expo/vector-icons';
import Header from '../header';
import Fondo from '../fondo';
import DateTimePicker from '@react-native-community/datetimepicker';

import * as CalendarAPI from 'expo-calendar';

//import * as Permissions from 'expo-permissions';

export default function CalendarioView() {
  const hoy = new Date().toISOString().split('T')[0];
  const [selectedDate, setSelectedDate] = useState(hoy);
  const [eventos, setEventos] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [nuevoEvento, setNuevoEvento] = useState('');

  const [horaInicio, setHoraInicio] = useState(new Date());
  const [horaFin, setHoraFin] = useState(new Date(new Date().getTime() + 60 * 60 * 1000));
  const [mostrarInicioPicker, setMostrarInicioPicker] = useState(false);
  const [mostrarFinPicker, setMostrarFinPicker] = useState(false);


  useEffect(() => {
    (async () => {
      const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await CalendarAPI.getCalendarsAsync();
        console.log('Calendarios disponibles:', calendars);
      }
    })();
  }, []);

  const marcarFecha = (date) => {
    setSelectedDate(date.dateString);
  };

  const obtenerEventosDelDia = async (fecha) => {
    const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permiso de calendario denegado');
      return [];
    }

    const calendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
    const googleCalendars = calendars.filter(cal => cal.source?.name?.includes('Google'));

    const calendarIds = googleCalendars.length ? googleCalendars.map(cal => cal.id) : calendars.map(cal => cal.id);

    const startDate = new Date(fecha + 'T00:00:00');
    const endDate = new Date(fecha + 'T23:59:59');

    const events = await CalendarAPI.getEventsAsync(calendarIds, startDate, endDate);
    return events;
  };

  useEffect(() => {
    (async () => {
      const eventosDelDia = await obtenerEventosDelDia(selectedDate);
      setEventos({ [selectedDate]: eventosDelDia.map(ev => ev.title) });
    })();
  }, [selectedDate]);



  const agregarEvento = async () => {
    if (!nuevoEvento) return;

    const startDate = new Date(`${selectedDate}T${horaInicio.toTimeString().split(' ')[0]}`);
    const endDate = new Date(`${selectedDate}T${horaFin.toTimeString().split(' ')[0]}`);

    try {
      const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
      if (status === 'granted') {
        const calendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
        
        const defaultCalendar = calendars.find(
          cal => cal.source?.name === 'Default' || cal.source?.name === 'iCloud'
        ) || calendars[0];

        if (defaultCalendar?.id) {
          await CalendarAPI.createEventAsync(defaultCalendar.id, {
            title: nuevoEvento,
            startDate,
            endDate,
            timeZone: 'Europe/Madrid',
            notes: 'Evento añadido desde la app.',
          });

          const eventosDelDia = await obtenerEventosDelDia(selectedDate);
          setEventos({ [selectedDate]: eventosDelDia.map(ev => ev.title) });
        } else {
          console.warn('No se encontró un calendario compatible');
        }
      }
    } catch (error) {
      console.error('Error al crear evento en el calendario:', error);
    }

    setNuevoEvento('');
    setModalVisible(false);
  };



  return (
    <Fondo>
    
    <><Header />
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
        firstDay={1} />

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
              style={styles.input} />

            <Text style={{ marginBottom: 5 }}>Hora de inicio:</Text>
            <TouchableOpacity onPress={() => setMostrarInicioPicker(true)} style={styles.input}>
              <Text>{horaInicio.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {mostrarInicioPicker && (
              <DateTimePicker
                value={horaInicio}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
                onChange={(event, selected) => {
                  setMostrarInicioPicker(false);
                  if (selected) setHoraInicio(selected);
                }}
              />
            )}

            <Text style={{ marginTop: 10, marginBottom: 5 }}>Hora de fin:</Text>
            <TouchableOpacity onPress={() => setMostrarFinPicker(true)} style={styles.input}>
              <Text>{horaFin.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
            </TouchableOpacity>
            {mostrarFinPicker && (
              <DateTimePicker
                value={horaFin}
                mode="time"
                display={Platform.OS === 'ios' ? 'spinner' : 'spinner'}
                onChange={(event, selected) => {
                  setMostrarFinPicker(false);
                  if (selected) setHoraFin(selected);
                }}
              />
            )}

            <TouchableOpacity style={styles.boton} onPress={agregarEvento}>
              <Text style={styles.botonTexto}>Guardar</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelar}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView></>
    </Fondo>
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