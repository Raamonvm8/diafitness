import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { getAuth, signOut  } from 'firebase/auth';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import { agregarSugerenciasComidaGlobales } from '../dieta/cargarSugerencias';
import { useFocusEffect } from '@react-navigation/native';
import Header from '../header';
import Fondo from '../fondo';


export default function Perfil() {
  const [usuario, setUsuario] = useState(null);
  const [objetivos, setObjetivos] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {

    const cargarDatosUser = async () => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) return;

      const refUsers = doc(FIREBASE_DB, 'users', user.uid);
      const getRefDoc = await getDoc(refUsers);

      if(getRefDoc.exists()){
        setUsuario(getRefDoc.data());
      }else {
        console.log('No se encontraron datos del usuario.');
      }
      
    };
    cargarDatosUser();
    cargarObjetivos();
  }, []);

  useFocusEffect(
    useCallback(() => {
      cargarObjetivos();
    }, [])
  );

  const cargarObjetivos = async () => {
  const auth = getAuth();
  const user = auth.currentUser;

  if (!user) {
    console.log("Usuario no autenticado");
    return;
  }

  const mesActual = moment().format('MMMM');
  const refObjetivos = doc(FIREBASE_DB, 'Objetivos Mensuales', `${user.uid}_${mesActual}`);
  console.log("Buscando objetivos en:", `${user.uid}_${mesActual}`);

  try {
    const getRefDoc = await getDoc(refObjetivos);

    if (getRefDoc.exists()) {
      const data = getRefDoc.data();
      console.log("Datos del documento:", data);
      setObjetivos(data.objetivos || []);
    } else {
      console.log('No se encontraron objetivos del usuario para este mes.');
      setObjetivos([]);
    }
  } catch (error) {
    console.error("Error al cargar objetivos:", error);
  }
};




  return (
    <Fondo>
    <><Header />
    <ScrollView style={styles.container}>

      <View style={styles.avatarContainer}>
        <Image
          source={require('../../assets/perfil/avatar-perfil.png')}
          style={styles.avatar} />
        {usuario ? (
          <>
            <Text style={styles.name}>{usuario.nombre}</Text>
            <Text style={styles.email}>{usuario.email}</Text>
          </>
        ) : (
          <Text>Cargando datos del usuario...</Text>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Personal</Text>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="dumbbell" size={22} color="#2F5D8C" />
          <Text style={styles.infoText}>Peso: {usuario?.peso ?? ''}Kg</Text>
        </View>
        <View style={styles.infoItem}>
          <MaterialCommunityIcons name="human-male-height" size={22} color="#2F5D8C" />
          <Text style={styles.infoText}>Altura: {usuario?.altura ?? ''} m </Text>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle} onPress={agregarSugerenciasComidaGlobales}>Objetivos de este mes</Text>
        {objetivos.length > 0 ? (
          objetivos.map((objetivo, i) => (
            <Text key={i} style={styles.infoText}>- {objetivo}</Text>
          ))
        ) : (
          <Text style={styles.infoText}>No tienes objetivos para este mes.</Text>
        )}

        <TouchableOpacity style={styles.botonSecundario} onPress={() => navigation.navigate('GestionarObjetivos')}>
          <Text style={styles.botonSecundarioTexto}>Gestionar objetivos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Preferencias</Text>
        <View style={styles.infoItem}>
          <Ionicons name="notifications-outline" size={22} color="#2F5D8C" />
          <Text style={styles.infoText}>Notificaciones activadas</Text>
        </View>
        <View style={styles.infoItem}>
          <Ionicons name="color-palette-outline" size={22} color="#2F5D8C" />
          <Text style={styles.infoText}>Tema: Claro</Text>
        </View>
      </View>


    </ScrollView></>
    </Fondo>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E0F0FF',
  },
  header: {
    backgroundColor: '#2F5D8C',
    paddingVertical: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: '#C7F2E6',
    borderWidth: 3,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2F5D8C',
    marginTop: 10,
  },
  email: {
    fontSize: 16,
    color: '#555',
    marginTop: 4,
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 15,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F5D8C',
    marginBottom: 10,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 16,
    color: '#333',
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C7F2E6',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {width:0, height:2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  editText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#2F5D8C',
    fontWeight: 'bold',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2F5D8C',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  logoutText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#FFFFFF',
    fontWeight: 'bold',
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
});
