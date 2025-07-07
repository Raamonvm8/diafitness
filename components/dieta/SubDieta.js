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


export default function SubDieta({ showOnlyCreateButton = false }) {
  const [dietas, setDietas] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filter, setFilter] = useState('todas');
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0, width: 0 });
  const navigation = useNavigation();
  const daysWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const currentNumberDay = new Date().getDay();
  const currentDay = daysWeek[currentNumberDay];

  const diasSemana = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const diaActualLetra = diasSemana[new Date().getDay()];

  if (showOnlyCreateButton) {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('CrearDieta')}
        style={styles.crearButton}
      >
        <Text style={styles.crearButtonText}>+ Crear</Text>
      </TouchableOpacity>
    );
  }

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

  const dietaActual = dietas?.find(d => d.isCurrent);
  const comidasDelDia = dietaActual?.dieta?.[diaActualLetra] || {};

  return (
    <TouchableWithoutFeedback onPress={closeDropdown}>
    <View style={styles.container}>
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
      <View style={styles.separator2} />

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
              {dieta.isCurrent && (
                <View style={styles.diaActualDieta}>
                  <Text style={styles.currentTitle}>{currentDay} </Text>
                  <View style={styles.tableContainer}>

                    <View style={[styles.row, styles.header]}>
                      <Text style={[styles.cell, styles.headerText, styles.cellBorder]}>Desayuno</Text>
                      <Text style={[styles.cell, styles.mediaMañanaHeaderText, styles.cellBorder]}>Media Mañana</Text>
                      <Text style={[styles.cell, styles.headerText, styles.cellBorder]}>Comida</Text>
                      <Text style={[styles.cell, styles.headerText, styles.cellBorder]}>Merienda</Text>
                      <Text style={[styles.cell, styles.headerText]}>Cena</Text>
                    </View> 
                      
                    {(() => {
                      const comidas = ['Desayuno', 'Media Mañana', 'Comida', 'Merienda', 'Cena'];

                      const comidasArrays = comidas.map(comida => comidasDelDia?.[comida] || []);
                      const maxLength = Math.max(...comidasArrays.map(arr => arr.length));

                      const filas = Array.from({ length: maxLength }, (_, rowIndex) => {
                        return (
                          <View key={`row-${rowIndex}`} style={styles.row}>
                            {comidasArrays.map((comidaArray, colIndex) => (
                              <Text
                                key={`cell-${rowIndex}-${colIndex}`}
                                style={[
                                  styles.cell,
                                  styles.cellText,
                                  colIndex < comidas.length - 1 ? styles.cellBorder : null,
                                ]}
                              >
                                {comidaArray[rowIndex]?.title || '—'}
                              </Text>
                            ))}
                          </View>
                        );
                      });

                      return filas;
                    })()}
                  </View>         
                </View>
              )}
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
    width: 80,
    marginTop: 5,
    marginLeft: 30
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
  diaActualDieta:{
    paddingRight: 5,
    paddingLeft: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 10
  },
  dietaTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  currentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F5D8C',
    alignSelf: 'center',
    marginTop: 2
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
    marginBottom: 10,
    marginTop: 15
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
  separator2: {
    height: 0.5,
    backgroundColor: '#2F5D8C',
    marginVertical: 18,
    borderRadius: 1,
  },
  row: {
    flexDirection: 'column',
    overflow: 'hidden',
  },
  row_comidas: {
    flexDirection: 'column',
    borderColor: 'white',
    overflow: 'hidden',
    textAlign: 'left'
  },

  
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mediaMañanaHeaderText: {
    color: '#fff',
    fontWeight: 'bold',
    marginTop: -6
  },
  headerTextBlue: {
    color: '#2F5D8C',
    fontWeight: 'bold',
  },
  mediaMañanaHeaderTextBlue: {
    color: '#2F5D8C',
    fontWeight: 'bold',
    marginTop: -6
  },
  header: {
    backgroundColor: '#2F5D8C',
    borderTopLeftRadius: 8,
    borderBottomLeftRightRadius: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
    paddingVertical: 8,
  },
  cellBorder: {
    borderRightWidth: 1,
    borderRightColor: '#ddd',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#2F5D8C',
    marginVertical: 12,
    borderRadius: 1,
  },
  headerText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
  cellText: {
    flexWrap: 'wrap',
    textAlign: 'left',
    minWidth: 230, 
    maxWidth: 200,
    color: '#2F5D8C',
    marginLeft: 10
  },

  currentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2F5D8C',
    alignSelf: 'center',
    marginVertical: 10,
  },
  tableContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: '#2F5D8C',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4, 
  },

});
