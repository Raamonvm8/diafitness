import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  StyleSheet,
  Image
} from 'react-native';
import { getAuth } from 'firebase/auth';
import {
  addDoc,
  where,
  query,
  onSnapshot,
  collection,
  doc,
  getDoc
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';
import CrearRecetaScreen from './CrearReceta';

const DIAS = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
const SECCIONES = ['Desayuno', 'Media Mañana', 'Comida', 'Merienda', 'Cena'];

export default function CrearDieta() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dieta, setDieta] = useState({});
  const [comidaInput, setComidaInput] = useState('');
  const [detalleInput, setDetalleInput] = useState('');
  const [diaActualIndex, setDiaActualIndex] = useState(0);
  const [seccionActual, setSeccionActual] = useState(SECCIONES[0]);
  const [mostrarMisComidas, setMostrarMisComidas] = useState(false);
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false);

  const [comidas, setComidas] = useState([]);
  const [sugerencias, setSugerencias] = useState([]);

  const [searchText, setSearchText] = useState('');

  const navigation = useNavigation();

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    const comidasRef = collection(FIREBASE_DB, 'recetas');
    const q = query(comidasRef, where('userId', '==', user.uid));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const comidasUsuario = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComidas(comidasUsuario);
    });
    cargarSugerencias();
    return () => unsubscribe();
  }, []);

  const cargarSugerencias = async ()  => {
    const sugerenciasRef = doc(FIREBASE_DB, 'Sugerencias', 'comidas');
    try {
      const docSnap = await getDoc(sugerenciasRef);
      if (docSnap.exists()) {
        const data = docSnap.data(); 
        const todasLasSugerencias = data.sugerencias || [];
        
        setSugerencias(todasLasSugerencias);
      } else {
        console.log('El documento de sugerencias no existe');
        setSugerencias([]);
      }
    } catch (error) {
      console.error('Error al obtener sugerencias:', error);
    }
  }
  

  const mostrarComidasPorTipos = () => {
    return comidas.filter(
      (comida) =>
        seccionActual.toLowerCase() === (comida.tipo?.toLowerCase() || '')
    );
  };

  const mostrarSugerenciasPorTipos = () => {
    return sugerencias.filter(
      (comida) =>
        seccionActual.toLowerCase() === (comida.tipo?.toLowerCase() || '')
    );
  };


  const eliminarComida = (index) => {
    const dia = DIAS[diaActualIndex];
    const nuevaDieta = { ...dieta };
    nuevaDieta[dia][seccionActual].splice(index, 1);

    if (nuevaDieta[dia][seccionActual].length === 0) {
      delete nuevaDieta[dia][seccionActual];
    }

    setDieta(nuevaDieta);
  };

  const añadirComidaDesdeReceta = (receta) => {
    const dia = DIAS[diaActualIndex];
    const nuevaDieta = { ...dieta };

    if (!nuevaDieta[dia]) nuevaDieta[dia] = {};
    if (!nuevaDieta[dia][seccionActual]) nuevaDieta[dia][seccionActual] = [];

    nuevaDieta[dia][seccionActual].push({ ...receta });

    setDieta(nuevaDieta);
    setSearchText('');
  };

  const añadirComidaDesdeSugerencia = (sugerencia) => {
    const dia = DIAS[diaActualIndex];
    const nuevaDieta = { ...dieta };

    if (!nuevaDieta[dia]) nuevaDieta[dia] = {};
    if (!nuevaDieta[dia][seccionActual]) nuevaDieta[dia][seccionActual] = [];

    nuevaDieta[dia][seccionActual].push({ ...sugerencia });

    setDieta(nuevaDieta);
    setSearchText('');
  };



  const guardarDieta = async () => {
    if (Object.keys(dieta).length < 7) {
      Alert.alert("Incompleto", "Debes completar los 7 días.");
      return;
    }
    if (title === '') {
      Alert.alert("Incompleto", "Añade un título a la dieta");
      return;
    }

    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      await addDoc(collection(FIREBASE_DB, 'dietas'), {
        title,
        description,
        dieta,
        createdAt: new Date(),
        userId: user.uid,
      });

      Alert.alert("Éxito", "Dieta guardada correctamente.");
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Hubo un problema al guardar la dieta.");
    }
  };

  const siguienteDia = () => {
    if (diaActualIndex < 6) {
      setDiaActualIndex(diaActualIndex + 1);
      setSeccionActual(SECCIONES[0]);
      setComidaInput('');
      setDetalleInput('');
    } else {
      guardarDieta();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Título de la dieta"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción (Opcional)"
        value={description}
        onChangeText={setDescription}
      />

      <View style={styles.selectorContainer}>
        <TouchableOpacity onPress={() => setDiaActualIndex((prev) => (prev - 1 + DIAS.length) % DIAS.length)}>
          <Text style={styles.flecha}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.selectorTexto}>{['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'][diaActualIndex]}</Text>
        <TouchableOpacity onPress={() => setDiaActualIndex((prev) => (prev + 1) % DIAS.length)}>
          <Text style={styles.flecha}>▶</Text>
        </TouchableOpacity>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.seccionesContainer}>
        {SECCIONES.map((seccion, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => setSeccionActual(seccion)}
            style={[styles.seccionBtn, seccionActual === seccion && styles.seccionActiva]}>
            <Text style={[styles.seccionTexto, seccionActual === seccion && styles.seccionActiva]}>{seccion}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      

      {dieta[DIAS[diaActualIndex]]?.[seccionActual]?.map((comida, i) => (
        <View key={i} style={styles.comidaItem}>
          <Text style={styles.comidaTexto}>🍽 {comida.title} - {comida.description}</Text>
          <TouchableOpacity style={styles.botonEliminar} onPress={() => eliminarComida(i)}>
            <Text style={styles.textoEliminar}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}


      <View style={{marginVertical: 30, flexDirection: 'row', justifyContent: 'center', gap:10}} >
        <TouchableOpacity style={styles.botonAzul} onPress={() => setMostrarMisComidas(!mostrarMisComidas)}>
          <Text style={styles.botonTexto}>Mis {seccionActual}s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonAzul} onPress={() => setMostrarSugerencias(!mostrarSugerencias)}>
          <Text style={styles.botonTexto}>Sugerencias de {seccionActual}s</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.crearDesayuno} onPress={ () => navigation.navigate('CrearReceta')}>
          <Text style={styles.diaTexto}> + Crear</Text>
        </TouchableOpacity>
      </View>
      
      

      {mostrarMisComidas && (
        <View style={styles.misComidas}>
          <TextInput
            style={styles.input}
            placeholder="Buscar comida..."
            value={searchText}
            onChangeText={setSearchText}
          />

          {mostrarComidasPorTipos()
            .filter(receta =>
              receta.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((receta) => (
              <TouchableOpacity key={receta.id} onPress={() => {añadirComidaDesdeReceta(receta); setMostrarMisComidas(!mostrarMisComidas) }}>
                <View style={styles.recetaItem}>
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
              </TouchableOpacity>
            ))}
        </View>
      )}

      {mostrarSugerencias && (
        <View style={styles.misComidas}>
          <TextInput
            style={styles.input}
            placeholder="Buscar comida..."
            value={searchText}
            onChangeText={setSearchText}
          />

          {mostrarSugerenciasPorTipos()
            .filter(receta =>
              receta.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((receta) => (
              <TouchableOpacity key={receta.id} onPress={() => {añadirComidaDesdeSugerencia(receta); setMostrarSugerencias(!mostrarSugerencias)} }>
                <View style={styles.recetaItem}>
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
              </TouchableOpacity>
            ))}
        </View>
      )}

      <TouchableOpacity style={styles.botonSiguiente} onPress={siguienteDia}>
        <Text style={styles.botonTexto}>
          {diaActualIndex < 6 ? 'Guardar día y continuar →' : 'Guardar dieta completa'}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#FFFFFF' },
  input: { backgroundColor: '#E0F0FF', padding: 10, marginBottom: 10, borderRadius: 10 },
  diasContainer: { flexDirection: 'row', marginBottom: 10 },
  diaBtn: { backgroundColor: '#C7F2E6', padding: 10, marginRight: 8, borderRadius: 10 },
  diaActivo: { backgroundColor: '#2F5D8C', color: 'white' },
  diaTexto: { color: '#2F5D8C', fontWeight: 'bold' },
  tituloDia: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: '#2F5D8C' },
  seccionesContainer: { flexDirection: 'row', marginBottom: 10 },
  seccionBtn: { backgroundColor: '#E0F0FF', padding: 10, marginRight: 8, borderRadius: 10 },
  seccionActiva: { backgroundColor: '#2F5D8C', color: 'white' },
  seccionTexto: { color: '#2F5D8C', fontWeight: 'bold' },
  inputRow: { flexDirection: 'row', gap: 5, marginBottom: 10 },
  botonVerde: { backgroundColor: '#C7F2E6', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  botonAzul: { backgroundColor: '#2F5D8C', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10, maxWidth: 150 },
  botonSiguiente: { backgroundColor: '#2F5D8C', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  botonTexto: { color: '#FFFFFF', fontWeight: 'bold', textAlign: 'center', alignItems: 'center' },
  comidaItem: {
    backgroundColor: '#F0F8FF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },  
  comidaTexto: {
    flex: 1,
    color: '#2F5D8C',
    marginRight: 10,
    fontSize: 14,
  },

  botonEliminar: {
    backgroundColor: '#FF6B6B',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },

  textoEliminar: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  recetaItem: { backgroundColor: '#F5F5F5', borderRadius: 10, marginBottom: 10, overflow: 'hidden' },
  recetaContent: { flexDirection: 'row' },
  imageContainer: { width: 100, height: 100, backgroundColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
  imageText: { color: '#888' },
  textContainer: { flex: 1, padding: 10 },
  recetaTitle: { fontWeight: 'bold', fontSize: 16, color: '#2F5D8C' },
  recetaSubtitle: { fontSize: 14, color: '#555' },
  selectorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    marginTop: 10,
    gap: 15,
  },
  flecha: {
    fontSize: 24,
    color: '#2F5D8C',
    marginHorizontal: 50,
  },
  selectorTexto: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2F5D8C',
  },
  crearDesayuno: {
    backgroundColor: '#C7F2E6', padding: 12, borderRadius: 10, alignItems: 'center', alignSelf: 'center', marginBottom: 10, width: '20%'
  }
  
});
