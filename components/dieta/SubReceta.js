import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';

export default function SubReceta() {
  const navigation = useNavigation();
  const [recetas, setRecetas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('todas');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

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

  const filteredRecetas = recetas
    .filter(r =>
      r.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (filter === 'todas' || (filter === 'favoritas' && r.isFavorite))
    )
    .sort((a, b) => (a.isFavorite ? -1 : 1));

  const handleDropdownToggle = (event) => {
    const { layout } = event.nativeEvent;
    setDropdownPosition({
      top: layout.y + layout.height,
      left: layout.x,
      width: layout.width,
    });
  };

  const handleFilterSelection = (newFilter) => {
    setDropdownVisible(false);
    setFilter(newFilter);
  };

  const closeDropdown = () => {
    if (dropdownVisible) {
      setDropdownVisible(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate('CrearReceta')} style={styles.crearButton}>
          <Text style={styles.crearButtonText}>+ Crear</Text>
        </TouchableOpacity>

        <View style={styles.searchRow}>
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar receta..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity
            onLayout={handleDropdownToggle}
            onPress={() => setDropdownVisible(prevState => !prevState)} 
            style={styles.dropdownButton}
          >
            <Text style={styles.dropdownButtonText}>
              {filter === 'todas' ? 'Todas' : 'Favoritas'} ▼
            </Text>
          </TouchableOpacity>
        </View>

        {dropdownVisible && (
          <View
            style={[styles.dropdownMenu, {
              top: dropdownPosition.top,
              left: dropdownPosition.left,
              width: dropdownPosition.width,
            }]}
          >
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleFilterSelection('todas')}
            >
              <Text>Todas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleFilterSelection('favoritas')}
            >
              <Text>Favoritas</Text>
            </TouchableOpacity>
          </View>
        )}

        <ScrollView style={styles.scrollView}>
          {filteredRecetas.length === 0 && (
            <View style={styles.textReceiptContainer}>
              <Text style={styles.textReceipt}>No se encontraron recetas</Text>
            </View>
          )}
          {recetas.length === 0 && (
          <View style={styles.textReceiptContainer}>
            <Text style={styles.textReceipt}>Crea tu primera receta</Text>
          </View>
        )}

          {filteredRecetas.map((receta) => (
            <View key={receta.id} style={styles.recetaItem}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarReceta(receta.id)}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>

              <View style={styles.recetaContent}>
                <View style={styles.imageContainer}>
                  {receta.image ? (
                    <Image source={{ uri: receta.image }} style={styles.image} />
                  ) : (
                    <Text style={styles.imageText}>Sin imagen</Text>
                  )}
                </View>

                <View style={styles.textContainer}>
                  <Text style={styles.recetaTitle}>{receta.title || 'Sin título'}</Text>
                  <Text style={styles.recetaSubtitle}>{receta.description || 'Sin descripción'}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'flex-start',
  },
  crearButton: {
    backgroundColor: '#C7F2E6',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    width: 80,
  },
  crearButtonText: {
    color: '#2F5D8C',
    fontSize: 15,
    fontWeight: 'bold',
  },
  searchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '70%',
    borderRadius: 8,
  },
  dropdownButton: {
    backgroundColor: '#2F5D8C',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  dropdownButtonText: {
    color: '#FFF',
    fontSize: 14,
  },
  dropdownMenu: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    zIndex: 2,
    marginTop: 70,
    marginLeft: 20,
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollView: {
    flex: 1,
    marginTop: 10,
  },
  recetaItem: {
    backgroundColor: '#4A7BA7',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
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
  recetaContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  imageContainer: {
    width: 80,
    height: 80,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  imageText: {
    color: 'white',
    fontSize: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 0,
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
    fontSize: 16,
  },
  textReceiptContainer: {
    marginTop: 0, 
    justifyContent: 'flex-start', 
  },
});

