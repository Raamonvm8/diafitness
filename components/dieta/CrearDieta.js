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
  collection
} from 'firebase/firestore';
import { FIREBASE_DB } from '../../FirebaseConfig';
import { useNavigation } from '@react-navigation/native';

const DIAS = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
const SECCIONES = ['Desayuno', 'Almuerzo', 'Comida', 'Merienda', 'Cena'];

export default function CrearDieta() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dieta, setDieta] = useState({});
  const [comidaInput, setComidaInput] = useState('');
  const [detalleInput, setDetalleInput] = useState('');
  const [diaActualIndex, setDiaActualIndex] = useState(0);
  const [seccionActual, setSeccionActual] = useState(SECCIONES[0]);
  const [mostrarMisComidas, setMostrarMisComidas] = useState(false);
  const [comidas, setComidas] = useState([]);
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

    return () => unsubscribe();
  }, []);

  const handleDiaChange = (index) => {
    setDiaActualIndex(index);
    setSeccionActual(SECCIONES[0]);
    setComidaInput('');
    setDetalleInput('');
    setMostrarMisComidas(false);
  };

  const agregarComida = () => {
    if (!comidaInput) {
      Alert.alert("Error", "Introduce el nombre de la comida.");
      return;
    }

    const dia = DIAS[diaActualIndex];
    const nuevaDieta = { ...dieta };
    if (!nuevaDieta[dia]) nuevaDieta[dia] = {};
    if (!nuevaDieta[dia][seccionActual]) nuevaDieta[dia][seccionActual] = [];

    nuevaDieta[dia][seccionActual].push({ nombre: comidaInput, detalle: detalleInput });

    setDieta(nuevaDieta);
    setComidaInput('');
    setDetalleInput('');
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

    nuevaDieta[dia][seccionActual].push({
      nombre: receta.title,
      detalle: receta.description || ''
    });

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

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasContainer}>
        {DIAS.map((dia, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleDiaChange(index)}
            style={[styles.diaBtn, diaActualIndex === index && styles.diaActivo]}>
            <Text style={[styles.diaTexto, diaActualIndex === index && styles.diaActivo]}>{dia}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.tituloDia}>{DIAS[diaActualIndex]}</Text>
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

      <View style={styles.inputRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Nombre comida"
          value={comidaInput}
          onChangeText={setComidaInput}
        />
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Detalle (opcional)"
          value={detalleInput}
          onChangeText={setDetalleInput}
        />
        <TouchableOpacity style={styles.botonVerde} onPress={agregarComida}>
          <Text style={styles.diaTexto}>Añadir</Text>
        </TouchableOpacity>
      </View>

      {dieta[DIAS[diaActualIndex]]?.[seccionActual]?.map((comida, i) => (
        <View key={i} style={[styles.comidaItem, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
          <Text style={{ color: '#2F5D8C' }}>🍽 {comida.nombre} - {comida.detalle}</Text>
          <TouchableOpacity onPress={() => eliminarComida(i)}>
            <Text style={{ color: 'red', fontWeight: 'bold' }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      ))}
      <View style={{flexDirection: 'row', justifyContent: 'center', gap:10}} >
        <TouchableOpacity style={styles.botonAzul} onPress={() => setMostrarMisComidas(!mostrarMisComidas)}>
          <Text style={styles.botonTexto}>Ver mis comidas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botonAzul}>
          <Text style={styles.botonTexto}>Historial desayunos</Text>
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

          {comidas
            .filter(receta =>
              receta.title.toLowerCase().includes(searchText.toLowerCase())
            )
            .map((receta) => (
              <TouchableOpacity key={receta.id} onPress={() => {añadirComidaDesdeReceta(receta); setMostrarMisComidas(!mostrarMisComidas);} }>
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
  botonAzul: { backgroundColor: '#2F5D8C', padding: 12, borderRadius: 10, alignItems: 'center', marginBottom: 10 },
  botonSiguiente: { backgroundColor: '#2F5D8C', padding: 15, borderRadius: 12, alignItems: 'center', marginTop: 20 },
  botonTexto: { color: '#FFFFFF', fontWeight: 'bold' },
  comidaItem: { backgroundColor: '#E0F0FF', padding: 8, borderRadius: 6, marginBottom: 5 },
  recetaItem: { backgroundColor: '#F5F5F5', borderRadius: 10, marginBottom: 10, overflow: 'hidden' },
  recetaContent: { flexDirection: 'row' },
  imageContainer: { width: 100, height: 100, backgroundColor: '#CCC', justifyContent: 'center', alignItems: 'center' },
  image: { width: '100%', height: '100%' },
  imageText: { color: '#888' },
  textContainer: { flex: 1, padding: 10 },
  recetaTitle: { fontWeight: 'bold', fontSize: 16, color: '#2F5D8C' },
  recetaSubtitle: { fontSize: 14, color: '#555' },
});
