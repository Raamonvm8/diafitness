import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Modal,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth } from 'firebase/auth';
import { collection, query, where, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import DetalleReceta from './DetalleReceta';
import Icon from 'react-native-vector-icons/Ionicons';


export default function SubReceta() {
  const navigation = useNavigation();
  const [recetas, setRecetas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('todas');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    tipoComida: [],
    objetivos: []
  });
  const FILTERS = {
    tipoComida: ['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena'],
    objetivos: ['Bajo en calorías', 'Proteico', 'Rico en hidratos', 'Bajo en grasas', 'Bajo en glucosa']
  };
  const sugerencias = [
    {
      id: 'sugerencia1',
      title: 'Ensalada Mediterránea',
      description: 'Fresca y saludable con tomate, pepino y queso feta',
      ingredients: [
        { nombre: 'Tomate', cantidad: 2, unidad: 'unidades' },
        { nombre: 'Pepino', cantidad: 1, unidad: 'unidad' },
        { nombre: 'Queso feta', cantidad: 100, unidad: 'g' },
        { nombre: 'Aceite de oliva', cantidad: 2, unidad: 'cucharadas' },
      ],
      steps: [
        'Cortar el tomate y el pepino en trozos pequeños.',
        'Añadir el queso feta desmenuzado.',
        'Aliñar con aceite de oliva.',
        'Mezclar todo y servir fresco.',
      ],
      image: 'https://vivirmejor.mx/wp-content/uploads/2021/01/ensalada-mediterranea.jpg',
    },
    {
      id: 'sugerencia2',
      title: 'Tacos de Pollo',
      description: 'Tortillas rellenas de pollo sazonado y vegetales frescos',
      ingredients: [
        { nombre: 'Tortillas de maíz', cantidad: 4, unidad: 'unidades' },
        { nombre: 'Pechuga de pollo', cantidad: 200, unidad: 'g' },
        { nombre: 'Lechuga', cantidad: 50, unidad: 'g' },
        { nombre: 'Tomate', cantidad: 1, unidad: 'unidad' },
        { nombre: 'Salsa', cantidad: 3, unidad: 'cucharadas' },
      ],
      steps: [
        'Cocinar la pechuga de pollo sazonada.',
        'Calentar las tortillas.',
        'Colocar pollo, lechuga y tomate en las tortillas.',
        'Agregar salsa al gusto y servir.',
      ],
      image: 'https://comerbeber.com/archivos/imagen/2021/08/burritos-pollo-cortados-cv_960.jpg',
    },
    {
      id: 'sugerencia3',
      title: 'Pasta Alfredo',
      description: 'Pasta cremosa con salsa de queso parmesano y mantequilla',
      ingredients: [
        { nombre: 'Pasta', cantidad: 200, unidad: 'g' },
        { nombre: 'Mantequilla', cantidad: 50, unidad: 'g' },
        { nombre: 'Queso parmesano', cantidad: 100, unidad: 'g' },
        { nombre: 'Nata para cocinar', cantidad: 100, unidad: 'ml' },
      ],
      steps: [
        'Cocer la pasta hasta que esté al dente.',
        'Derretir la mantequilla en una sartén.',
        'Añadir la nata y el queso parmesano.',
        'Mezclar la pasta con la salsa y servir caliente.',
      ],
      image: 'https://th.bing.com/th/id/OIP.fuMZiahJWxTDmHEeTG2nYwHaE7?rs=1&pid=ImgDetMain',
    },
  ];
  
  
  const toggleFilter = (section, value) => {
    const current = selectedFilters[section];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];

    setSelectedFilters(prev => ({
      ...prev,
      [section]: updated
    }));
  };

  const applyFilters = () => {
    setModalVisible(false);
    console.log('Filtros aplicados:', selectedFilters);
    // Pasar selectedFilters a lógica de filtrado
  };

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


  const recetasMostradas = filter === 'todas' ? recetas : sugerencias;

  const recetasFiltradas = recetasMostradas.filter(r =>
    r.title.toLowerCase().includes(searchText.toLowerCase())
  );

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
              {filter === 'todas' ? 'Mis Comidas' : 'Sugerencias'} ▼
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
              <Text>Mis Comidas</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.dropdownItem}
              onPress={() => handleFilterSelection('sugerencias')}
            >
              <Text>Sugerencias</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity style={styles.filtroBtn} onPress={() => setModalVisible(true)}>
            <Text style={styles.filtroTexto}>Filtros</Text>
            <Icon name="filter" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        <Modal animationType="slide" visible={modalVisible} transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.seccionTitulo}>Tipo de comida</Text>
              {FILTERS.tipoComida.map((opcion, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => toggleFilter('tipoComida', opcion)}
                  style={[
                    styles.opcionBtn,
                    selectedFilters.tipoComida.includes(opcion) && styles.opcionSeleccionada
                  ]}
                >
                  <Text>{opcion}</Text>
                </TouchableOpacity>
              ))}

              <Text style={[styles.seccionTitulo, { marginTop: 20 }]}>Objetivos</Text>
              {FILTERS.objetivos.map((opcion, idx) => (
                <TouchableOpacity
                  key={idx}
                  onPress={() => toggleFilter('objetivos', opcion)}
                  style={[
                    styles.opcionBtn,
                    selectedFilters.objetivos.includes(opcion) && styles.opcionSeleccionada
                  ]}
                >
                  <Text>{opcion}</Text>
                </TouchableOpacity>
              ))}

              <TouchableOpacity style={styles.aplicarBtn} onPress={applyFilters}>
                <Text style={styles.aplicarTexto}>Aplicar filtros</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Text style={{ color: 'red', marginTop: 10, textAlign: 'center' }}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
  

        <ScrollView style={styles.scrollView}>
          {recetasFiltradas.length === 0 && (
            <View style={styles.textReceiptContainer}>
              <Text style={styles.textReceipt}>
                {filter === 'todas' ? 'Crea tu primera receta' : 'No hay sugerencias disponibles'}
              </Text>
            </View>
          )}

          {recetasFiltradas.map((receta) => (
            <TouchableOpacity key={receta.id} onPress={() => navigation.navigate('DetalleReceta', { receta })}>
              <View style={styles.recetaItem}>
                {filter === 'todas' && (
                  <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={() => eliminarReceta(receta.id)}
                  >
                    <Text style={styles.deleteButtonText}>🗑️</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.recetaContent}>
                  <View style={styles.imageContainer}>
                  {receta.image ? (
                    typeof receta.image === 'string' ? (
                      <Image source={{ uri: receta.image }} style={styles.image} />
                    ) : (
                      <Image source={receta.image} style={styles.image}/>
                    )
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
    justifyContent: 'flex-start',
  },
  crearButton: {
    backgroundColor: '#C7F2E6',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#2F5D8C',
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
    width: '60%',
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
    textAlign: 'center',
  },
  textReceiptContainer: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filtroBtn: {
    backgroundColor: '#2F5D8C',
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    width:'25%',
    gap: 5,
  },
  filtroTexto: {
    color: '#fff',
    fontWeight: 'bold'
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 20
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20
  },
  seccionTitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  opcionBtn: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 8,
    borderRadius: 8
  },
  opcionSeleccionada: {
    backgroundColor: '#cce5ff'
  },
  aplicarBtn: {
    backgroundColor: '#2F5D8C',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  aplicarTexto: {
    color: '#fff',
    fontWeight: 'bold'
  }
});
