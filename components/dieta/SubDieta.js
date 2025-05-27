import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, deleteDoc, updateDoc, getDocs } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';


export default function SubDieta() {
  const [dietas, setDietas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('todas');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (!user) return;

    const dietasRef = collection(FIREBASE_DB, 'dietas');
    const q = query(dietasRef, where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const dietasUsuario = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDietas(dietasUsuario);
    });

    return () => unsubscribe();
  }, []);

  const eliminarDieta = (id) => {
    Alert.alert(
      'Eliminar dieta',
      '¿Estás seguro de que quieres eliminar esta dieta?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              const dietaRef = doc(FIREBASE_DB, 'dietas', id);
              await deleteDoc(dietaRef);
            } catch (error) {
              console.error('Error al eliminar dieta:', error);
            }
          }
        }
      ]
    );
  };

  const marcarComoActual = async (idDietaSeleccionada) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      const q = query(collection(FIREBASE_DB, 'dietas'), where('userId', '==', user.uid));
      const snapshot = await getDocs(q);

      const batchPromises = snapshot.docs.map((docSnap) => {
        const dietaRef = doc(FIREBASE_DB, 'dietas', docSnap.id);
        return updateDoc(dietaRef, {
          isCurrent: docSnap.id === idDietaSeleccionada,
        });
      });

      await Promise.all(batchPromises);
    } catch (error) {
      console.error('Error al marcar dieta como actual:', error);
    }
  };

  const filteredDietas = dietas
    .filter(d =>
      d.title.toLowerCase().includes(searchText.toLowerCase()) &&
      (filter === 'todas' || (filter === 'actual' && d.isCurrent))
    )
    .sort((a, b) => (a.isCurrent ? -1 : 1));

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
      <TouchableOpacity onPress={() => navigation.navigate('CrearDieta')} style={styles.crearButton}>
        <Text style={styles.crearButtonText}>+ Crear</Text>
      </TouchableOpacity>

      {dietas.length === 0 && (
        <View style={styles.textContainer}>
          <Text style={styles.textEmpty}>Crea tu primera dieta</Text>
        </View>
      )}

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar dieta..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity
          onLayout={handleDropdownToggle}
          onPress={() => setDropdownVisible(prevState => !prevState)} 
          style={styles.dropdownButton}
        >
          <Text style={styles.dropdownButtonText}>
            {filter === 'todas' ? 'Todas' : 'Actual'} ▼
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
            onPress={() => handleFilterSelection('actual')}
          >
            <Text>Actual</Text>
          </TouchableOpacity>
        </View>
      )}

      <ScrollView style={styles.scrollView}>
        {filteredDietas.length === 0 && (
          <View style={styles.textContainer}>
            <Text style={styles.textEmpty}>No se encontraron dietas</Text>
          </View>
        )}

        {filteredDietas.map((dieta, index) => (
          <TouchableOpacity key={dieta.id} onPress={() => navigation.navigate('DetalleDieta', { dieta })}>
            <View style={[styles.dietaItem, dieta.isCurrent && styles.dietaItemActual]}>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => eliminarDieta(dieta.id)}
              >
                <Text style={styles.deleteButtonText}>🗑️</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => marcarComoActual(dieta.id)}
                style={styles.selectButton}
              >
                <Text style={styles.selectButtonText}>{dieta.isCurrent ? '🏅' : '📌'}</Text>
              </TouchableOpacity>

              <View style={styles.dietaTextContainer}>
                <Text style={styles.dietaTitle}>{dieta.title || 'Sin título'}</Text>
                <Text style={styles.dietaSubtitle}>{dieta.description || 'Sin descripción'}</Text>
              </View>
            </View>

            {dieta.isCurrent && index < filteredDietas.length - 1 && (
              <View style={styles.separator} />
            )}
          </TouchableOpacity>
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
  },
  crearButton: {
    backgroundColor: '#C7F2E6',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: '#2F5D8C',
    marginBottom: 20,
    width: 80
  },
  crearButtonText: {
    color: '#2F5D8C',
    fontSize: 15,
    fontWeight: 'bold',
  },
  dietaItem: {
    backgroundColor: '#4A7BA7',
    borderRadius: 8,
    marginBottom: 10,
    padding: 10,
    position: 'relative',
  },
  dietaItemActual: {
    borderColor: '#00FF99',
    borderWidth: 2,
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
  selectButton: {
    position: 'absolute',
    top: 5,
    left: 5,
    zIndex: 1,
    padding: 5,
  },
  selectButtonText: {
    fontSize: 19,
    color: 'yellow',
  },
  dietaTextContainer: {
    paddingRight: 30,
    paddingLeft: 30,
  },
  dietaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  dietaSubtitle: {
    fontSize: 14,
    color: 'white',
  },
  textEmpty: {
    fontStyle: 'italic',
    color: '#2F5D8C',
    fontSize: 16,
  },
  textContainer: {
    alignItems: 'center',
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
    marginLeft: 20
  },
  dropdownItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  scrollView: {
    flex: 1,
  },
  separator: {
    height: 2,
    backgroundColor: '#fffafe',
    marginVertical: 20,
  },
});
