import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig'; 

export default function SubReceta() {
  const navigation = useNavigation();
  const [recetas, setRecetas] = useState([]);
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const recetasRef = collection(FIREBASE_DB, 'recetas');

    if (!user) return;

    
    const q = query(recetasRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const recetasUsuario = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecetas(recetasUsuario);
    });

    return () => unsubscribe();
  }, []);

  const eliminarReceta = (id) => {
    Alert.alert(
      'Eliminar receta',
      '¿Estás seguro de que quieres eliminar esta receta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const recetaRef = doc(FIREBASE_DB, 'recetas', id);
              await deleteDoc(recetaRef);
            } catch (error) {
              console.error('Error al eliminar receta:', error);
            }
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('CrearReceta')} style={styles.crearButton}>
        <Text style={styles.crearButtonText}>+ Crear</Text>
      </TouchableOpacity>
      {recetas.length === 0 && (
        <View style={styles.textReceiptContainer}>
          <Text style={styles.textReceipt}>Crea tu primera receta</Text>
        </View>
      )}
      {recetas.map((receta) => (
        
        <View key={receta.id} style={styles.recetaItem}>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => eliminarReceta(receta.id)}
            >
              <Text style={styles.deleteButtonText}>🗑️</Text>
            </TouchableOpacity>

            <View style={styles.imagePlaceholder}>
              {receta.image ? (
                <Image source={{ uri: receta.image }} style={styles.image} />
              ) : (
                <Text style={styles.imageText}>Sin imagen</Text>
              )}
            </View>
            <View style={styles.recetaTextContainer}>
              <Text style={styles.recetaTitle}>{receta.title || 'Sin título'}</Text>
              <Text style={styles.recetaSubtitle}>{receta.description || 'Sin descripción'}</Text>
            </View>
          </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  crearButton: {
    backgroundColor: '#C7F2E6',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: 80
  },
  crearButtonText: {
    color: '#2F5D8C',
    fontSize: 15,
    fontWeight: 'bold',
  },
  recetaItem: {
    flexDirection: 'row',
    backgroundColor: '#4A7BA7',
    borderRadius: 8,
    marginBottom: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    zIndex: 1,
    padding: 5,
  },
  deleteButtonText: {
    fontSize: 15,
    color: 'white',
  },
  imagePlaceholder: {
    width: 120,
    height: 120,
    backgroundColor: '#2F5D8C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: 'white',
    fontWeight: 'bold',
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: 'cover',
  },
  recetaTextContainer: {
    flex: 1,
    padding: 10,
  },
  recetaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  recetaSubtitle: {
    fontSize: 14,
    color: 'white',
  },
  textReceipt: {
    fontStyle: 'italic',
    color: '#2F5D8C',
    fontSize: 16
  },
  textReceiptContainer: {
    alignItems: 'center',
  }
});
