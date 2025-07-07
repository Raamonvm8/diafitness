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
import { collection, query, where, onSnapshot, doc, deleteDoc, getDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import DetalleReceta from './DetalleReceta';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import platoDefecto from '../../assets/platoharvard.png';



export default function SubReceta({ showOnlyCreateButton = false }) {
  const navigation = useNavigation();
  const [recetas, setRecetas] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('todas');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const CANTIDAD_SUGERENCIAS = 60;
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    tipoComida: [],
    objetivos: [],
    duración: []
  });
  const FILTERS = {
    tipoComida: ['Desayuno', 'Media mañana', 'Almuerzo', 'Merienda', 'Cena'],
    objetivos: ['Baja en calorías', 'Alta en proteínas', 'Alta en carbohidratos', 'Baja en grasas', 'Bajo índice glucémico', 'Sin gluten', 'Vegana', 'Vegetariana', 'Alta en fibra', 'Sin lactosa'],
    duración: ['0-5 min', '10-20 min', '30-45 min', '60+ min']
  };
  const [tempSelectedFilters, setTempSelectedFilters] = useState({
    tipoComida: [],
    objetivos: [],
    duración: []
  });
  
  const [sugerenciasCargadas, setSugerenciasCargadas] = useState(false);
  const [sugerenciasAleatorias, setSugerenciasAleatorias] = useState([]);

  const [desayuno, setDesayuno] = useState(false);
  const [mediaMañana, setMediaMañana] = useState(false);
  const [almuerzo, setAlmuerzo] = useState(false);
  const [merienda, setMerienda] = useState(false);
  const [cena, setCena] = useState(false);

  if (showOnlyCreateButton) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CrearReceta')}
        style={styles.crearButton}
      >
        <Text style={styles.crearButtonText}>+ Crear</Text>
      </TouchableOpacity>
    );
  }

  const toggleTempFilter = (section, value) => {
    const current = tempSelectedFilters[section];
    const updated = current.includes(value)
      ? current.filter(item => item !== value)
      : [...current, value];

    setTempSelectedFilters(prev => ({
      ...prev,
      [section]: updated
    }));
  };

  useEffect(() => {
    console.log("hay desayuno?", desayuno);
    console.log("hay media mañana?", mediaMañana);
    console.log("hay almuerzo?", almuerzo);
    console.log("hay merienda?", merienda);
    console.log("hay cena?", cena);
    
  }, [cena, merienda, desayuno, mediaMañana, almuerzo]);

  


  const applyFilters = async () => {
    setSelectedFilters(tempSelectedFilters);
    setModalVisible(false);
    console.log('Filtros aplicados:', tempSelectedFilters);

    setDesayuno(tempSelectedFilters.tipoComida.includes("Desayuno"));
    setMediaMañana(tempSelectedFilters.tipoComida.includes("Media mañana"));
    setAlmuerzo(tempSelectedFilters.tipoComida.includes("Almuerzo"));
    setMerienda(tempSelectedFilters.tipoComida.includes("Merienda"));
    setCena(tempSelectedFilters.tipoComida.includes("Cena"));

    try {
      await AsyncStorage.setItem('selectedFilters', JSON.stringify(tempSelectedFilters));
      
    } catch (error) {
      console.error('Error guardando filtros en AsyncStorage:', error);
    }
  };

  useEffect(() => {
    if (!sugerenciasCargadas) {
      obtenerSugerencias();
    }
  }, [sugerenciasCargadas]);

  useEffect(() => {
    if (filter === 'sugerencias' && sugerencias.length > 0) {
      setSugerenciasAleatorias(obtenerSugerenciasAleatorias(sugerencias, CANTIDAD_SUGERENCIAS));
    }
  }, [filter, sugerencias]);

  useEffect(() => {
    if (filter === 'todas') {
      cargarMisComidas();
    } else {
      obtenerSugerencias();
    }
  }, [selectedFilters, filter]);

  const cumpleFiltroDuracion = (receta) => {
    if (selectedFilters.duración.length === 0) return true;

    const duracionReceta = Number(receta.duración);
    return selectedFilters.duración.some((duracionTexto) => {
      const [min, max] = obtenerRangoDuracion(duracionTexto);
      return !isNaN(duracionReceta) && duracionReceta >= min && duracionReceta <= max;
    });
  };


  const llamarFiltrosMisComidas = (recetas) => {
    if (selectedFilters.tipoComida.length === 0 && selectedFilters.objetivos.length === 0 && selectedFilters.duración.length===0) {
      console.log("NO hay filtros");
      setRecetas(recetas);
    } else {
      const recetasFiltradas = recetas.filter((receta) => {
        const tieneTipoValido = typeof receta.tipo === 'string';

        const coincideTipo = tieneTipoValido &&
          selectedFilters.tipoComida
            .map(f => f.toLowerCase())
            .includes(receta.tipo.toLowerCase());

        const coincideObjetivo = receta.objetivo?.objetivos && Array.isArray(receta.objetivo?.objetivos)
          ? selectedFilters.objetivos.every((objetivo) =>
              receta.objetivo.objetivos
                .map(f => f.toLowerCase())
                .includes(objetivo.toLowerCase())
            )
          : false;

        const coincideDuracion = cumpleFiltroDuracion(receta);

        console.log(`Receta: ${receta.title} - Tipo: ${receta.tipo} - Coincide Tipo: ${coincideTipo} - Coincide Objetivo: ${coincideObjetivo}`);

        if (
          selectedFilters.tipoComida.length > 0 &&
          selectedFilters.objetivos.length > 0 &&
          selectedFilters.duración.length > 0
        ) {
          return coincideTipo && coincideObjetivo && coincideDuracion;
        } else if (selectedFilters.tipoComida.length > 0 && selectedFilters.objetivos.length > 0) {
          return coincideTipo && coincideObjetivo;
        } else if (selectedFilters.tipoComida.length > 0 && selectedFilters.duración.length > 0) {
          return coincideTipo && coincideDuracion;
        } else if (selectedFilters.objetivos.length > 0 && selectedFilters.duración.length > 0) {
          return coincideObjetivo && coincideDuracion;
        } else if (selectedFilters.tipoComida.length > 0) {
          return coincideTipo;
        } else if (selectedFilters.objetivos.length > 0) {
          return coincideObjetivo;
        } else if (selectedFilters.duración.length > 0) {
          return coincideDuracion;
        }

      });

      setRecetas(recetasFiltradas);
    }
  };

  const llamarFiltrosMisSugerencias = (recetas) => {
    if (selectedFilters.tipoComida.length === 0 && selectedFilters.objetivos.length === 0 && selectedFilters.duración.length === 0) {
      console.log("NO hay filtros");
      setSugerencias(recetas);
    } else {
      const recetasFiltradas = recetas.filter((receta) => {
        const tieneTipoValido = typeof receta.tipo === 'string';

        const coincideTipo = tieneTipoValido &&
          selectedFilters.tipoComida
            .map(f => f.toLowerCase())
            .includes(receta.tipo.toLowerCase());
          
        const coincideDuracion = cumpleFiltroDuracion(receta);


        const coincideObjetivo = receta.objetivo?.objetivos && Array.isArray(receta.objetivo?.objetivos)
          ? selectedFilters.objetivos.every((objetivo) =>
              receta.objetivo.objetivos
                .map(f => f.toLowerCase())
                .includes(objetivo.toLowerCase())
            )
          : false;

        console.log(`Receta: ${receta.title} - Tipo: ${receta.tipo} - Coincide Tipo: ${coincideTipo} - Coincide Objetivo: ${coincideObjetivo}`);

        if (
          selectedFilters.tipoComida.length > 0 &&
          selectedFilters.objetivos.length > 0 &&
          selectedFilters.duración.length > 0
        ) {
          return coincideTipo && coincideObjetivo && coincideDuracion;
        } else if (selectedFilters.tipoComida.length > 0 && selectedFilters.objetivos.length > 0) {
          return coincideTipo && coincideObjetivo;
        } else if (selectedFilters.tipoComida.length > 0 && selectedFilters.duración.length > 0) {
          return coincideTipo && coincideDuracion;
        } else if (selectedFilters.objetivos.length > 0 && selectedFilters.duración.length > 0) {
          return coincideObjetivo && coincideDuracion;
        } else if (selectedFilters.tipoComida.length > 0) {
          return coincideTipo;
        } else if (selectedFilters.objetivos.length > 0) {
          return coincideObjetivo;
        } else if (selectedFilters.duración.length > 0) {
          return coincideDuracion;
        }
        console.log(`Duración receta: ${receta.duración} (tipo: ${typeof receta.duración})`);

      });

      setSugerencias(recetasFiltradas);
    }
  };

  const obtenerRangoDuracion = (duracionTexto) => {
    switch (duracionTexto) {
      case '0-5 min':
        return [1, 5]; 
      case '10-20 min':
        return [10, 20];
      case '30-45 min':
        return [30, 45];
      case '60+ min':
        return [60, Infinity];
      default:
        return [0, Infinity]; 
    }
  };



  const cargarMisComidas = async () => {
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
      llamarFiltrosMisComidas(recetasUsuario);
      
    });
    
    return () => unsubscribe();
  }
    
  const obtenerSugerencias = async () => {
    const sugerenciasRef = doc(FIREBASE_DB, 'Sugerencias', 'comidas');
    try {
      const docSnap = await getDoc(sugerenciasRef);
      if (docSnap.exists()) {
        const data = docSnap.data(); 
        const todasLasSugerencias = data.sugerencias || [];
        
        llamarFiltrosMisSugerencias(todasLasSugerencias);
        setSugerenciasCargadas(true);
      } else {
        console.log('El documento de sugerencias no existe');
        setSugerencias([]);
      }
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  };


  const obtenerSugerenciasAleatorias = (sugerencias, cantidad) => {
    const mezcladas = [...sugerencias].sort(() => Math.random() - 0.5);
    return mezcladas.slice(0, cantidad);
  };

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


  const recetasMostradas = filter === 'todas' ? recetas : sugerenciasAleatorias;

  const recetasFiltradas = recetasMostradas.filter(r =>
    r.title.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
      <View style={styles.container}>
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
            <TouchableOpacity style={styles.filtroBtn} onPress={() => setModalVisible(true)}>
              <Icon name="filter" size={20} color="#fff" />
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
        <View style={styles.separator} />

        <Modal animationType="slide" visible={modalVisible} transparent>
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <ScrollView contentContainerStyle={{ paddingBottom: 20 }} style={styles.scrollableModal}>
                <Text style={styles.seccionTitulo}>Tipo de comida</Text>
                {FILTERS.tipoComida.map((opcion) => (
                  <TouchableOpacity
                    key={opcion}
                    onPress={() => toggleTempFilter('tipoComida', opcion)}
                    style={[
                      styles.opcionBtn,
                      tempSelectedFilters.tipoComida.includes(opcion) && styles.opcionSeleccionada
                    ]}
                  >
                    <Text>{opcion}</Text>
                  </TouchableOpacity>
                ))}

                <Text style={[styles.seccionTitulo, { marginTop: 20 }]}>Objetivos</Text>
                {FILTERS.objetivos.map((opcion) => (
                  <TouchableOpacity
                    key={opcion}
                    onPress={() => toggleTempFilter('objetivos', opcion)}
                    style={[
                      styles.opcionBtn,
                      tempSelectedFilters.objetivos.includes(opcion) && styles.opcionSeleccionada
                    ]}
                  >
                    <Text>{opcion}</Text>
                  </TouchableOpacity>
                ))}

                <Text style={[styles.seccionTitulo, { marginTop: 20 }]}>Tiempo de preparación</Text>
                {FILTERS.duración.map((opcion) => (
                  <TouchableOpacity
                    key={opcion}
                    onPress={() => toggleTempFilter('duración', opcion)}
                    style={[
                      styles.opcionBtn,
                      tempSelectedFilters.duración.includes(opcion) && styles.opcionSeleccionada
                    ]}
                  >
                    <Text>{opcion}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

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
          {recetasFiltradas.length === 0 ? (
            <View style={styles.textReceiptContainer}>
              <Text style={styles.textReceipt}>
                {filter === 'todas' ? 'Crea tu primera receta' : 'No hay sugerencias disponibles'}
              </Text>
            </View>
          ) : (
            recetasFiltradas.map((receta) => (
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
                        <Image source={{ uri: receta.image }} style={styles.image} />
                      ) : (
                        <Image source={platoDefecto}  style={styles.image} />
                      )}
                    </View>
                    <View style={styles.textContainer}>
                      <Text style={styles.recetaTitle}>{receta.title || 'Sin título'}</Text>
                      <Text style={styles.recetaSubtitle}>{receta.description || 'Sin descripción'}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          )}
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
    marginBottom: 50
  },
  crearButton: {
    backgroundColor: '#C7F2E6',
    padding: 5,
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 1,
    marginTop: 5,
    marginLeft: 30,
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
    marginTop: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    width: '50%',
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
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',  
    justifyContent: 'space-between', 
    marginBottom: 8,
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
    padding: 10,
    borderRadius: 10,
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
    padding: 20,
    height: '80%',

  },
  scrollableModal: {
  },
  seccionTitulo: {
    fontSize: 16,
    color: '#2F5D8C',
    fontWeight: 'bold',
    marginBottom: 10
  },
  opcionBtn: {
    padding: 10,
    backgroundColor: '#eee',
    marginBottom: 8,
    borderRadius: 8,
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
  },
  separator: {
    height: 0.5,
    backgroundColor: '#2F5D8C',
    marginVertical: 12,
    borderRadius: 1,
  },
});
