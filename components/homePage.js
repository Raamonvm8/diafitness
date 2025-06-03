import React, { useEffect, useState, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Animated, Easing, LayoutAnimation, UIManager, Platform, TextInput } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import Fondo from './fondo';
import { getAuth } from 'firebase/auth';
import { FIREBASE_DB  } from '../FirebaseConfig';
import { collection, onSnapshot, snapshotEqual, doc, where, query } from 'firebase/firestore';
import { FontAwesome } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faMugSaucer } from '@fortawesome/free-solid-svg-icons';
import { MaterialCommunityIcons } from 'react-native-vector-icons';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Header from './header';
import { Picker } from '@react-native-picker/picker';




export default function HomePage() {
  const [waterCups, setWaterCups] = useState(Array(8).fill(false));
  const [peso, setPeso] = useState(null);
  const [altura, setAltura] = useState(null);
  const [género, setGénero] = useState('');
  const [años, setAños] = useState(null);
  const [dietas, setDietas] = useState([]);
  const [checkedComidas, setCheckedComidas] = useState({});

  const [caloriasConsumidas, setCaloriasConsumidas] = useState(0);
  const [caloriasEstimadas, setCaloriasEstimadas] = useState({});

  const [actividad, setActividad] = useState('');
  const [duracion, setDuracion] = useState('');
  const [intensidad, setIntensidad] = useState('');
  const [caloriasQuemadas, setCaloriasQuemadas] = useState(0);
  const [balanceCalorico, setBalanceCalorico] = useState(0);



  const diasSemana = ['D', 'L', 'M', 'X', 'J', 'V', 'S'];
  const diaActualLetra = diasSemana[new Date().getDay()];


  const [expandedSections, setExpandedSections] = useState({
    desayuno: false,
    media_mañana: false,
    almuerzo: false,
    merienda: false,
    cena: false,
    ejercicio: false,
    snacks: false,
  });
  const animatedValues = useRef({
    desayuno: new Animated.Value(0),
    media_mañana: new Animated.Value(0),
    almuerzo: new Animated.Value(0),
    merienda: new Animated.Value(0),
    cena: new Animated.Value(0),
    ejercicio: new Animated.Value(0),
    snacks: new Animated.Value(0),
  }).current;


  const METS = {
    Correr: { Baja: 7, Media: 9, Alta: 11 },
    Caminar: { Baja: 2.5, Media: 3.5, Alta: 4.5 },
    Natación: { Baja: 6, Media: 8, Alta: 10 },
    Bicicleta: { Baja: 4, Media: 6, Alta: 8 },
    Pesas: { Baja: 3, Media: 4.5, Alta: 6 },
  };

  useEffect(() => {
    if (!actividad || !duracion || !intensidad) return;


    const met = METS[actividad]?.[intensidad] || 0;

    if (!peso || isNaN(peso) || isNaN(duracion) || !met) return;

    const duracionMin = parseFloat(duracion);
    const caloriasQuemadas = ((met * peso * 3.5) / 200) * duracionMin;

    setCaloriasQuemadas(caloriasQuemadas.toFixed(0)); 

  }, [actividad, duracion, intensidad, peso, caloriasEstimadas]);

  useEffect(() => {
    if (!caloriasEstimadas || typeof caloriasEstimadas !== 'object') return;

    let totalEstimadas = 0;

    for (const tipo of Object.keys(checkedComidas)) {
      const comidasTipo = checkedComidas[tipo];
      for (const index in comidasTipo) {
        if (comidasTipo[index] && caloriasEstimadas[tipo]?.[index]) {
          totalEstimadas += caloriasEstimadas[tipo][index];
        }
      }
    }

    const balance = totalEstimadas - (caloriasQuemadas || 0);
    setBalanceCalorico(balance);
    console.log(caloriasEstimadas);

  }, [caloriasEstimadas, caloriasQuemadas, checkedComidas]);



  const toggleCup = (index) => {
    const newCups = [...waterCups];
    newCups[index] = !newCups[index];
    setWaterCups(newCups);
  };

  const toggleSection = (section) => {
    const isExpanding = !expandedSections[section];
    setExpandedSections((prev) => ({
      ...prev,
      [section]: isExpanding,
    }));

    Animated.timing(animatedValues[section], {
      toValue: isExpanding ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  };

  const toggleChecked = (tipo, index) => {
    setCheckedComidas(prev => {
      const nuevoEstado = { ...prev };
      nuevoEstado[tipo] = nuevoEstado[tipo] || [];
      nuevoEstado[tipo][index] = !nuevoEstado[tipo][index];

      calcularCaloriasTotales(nuevoEstado); 
      return nuevoEstado;
    });
  };



  const heightDesayuno = animatedValues.desayuno.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], 
  });
  const opacityDesayuno = animatedValues.desayuno.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const heightMediaMañana = animatedValues.media_mañana.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], 
  });
  const opacityMediaMañana = animatedValues.media_mañana.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const heightAlmuerzo = animatedValues.almuerzo.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], 
  });
  const opacityAlmuerzo = animatedValues.almuerzo.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const heightMerienda = animatedValues.merienda.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], 
  });
  const opacityMerienda = animatedValues.merienda.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const heightCena = animatedValues.cena.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 100], 
  });
  const opacityCena = animatedValues.cena.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const heightEjercicio = animatedValues.ejercicio.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 330], 
  });
  const opacityEjercicio = animatedValues.ejercicio.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  useEffect(() => {
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);


  useEffect(()=>{
    const auth = getAuth();
    const user = auth.currentUser;
    const hoy = new Date();
    if (!user) return;
    const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
    const unsubscribe = onSnapshot(userDocRef, (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        setPeso(Number(data.peso));
        setAltura(Number(data.altura));
        setGénero(data.género);
        const [dia, mes, año] = data.nacimiento.split('/').map(Number);
        const fechaNacimiento = new Date(año, mes - 1, dia);
        const diferenciaMs = hoy - fechaNacimiento;
        setAños(Math.floor(diferenciaMs / (1000 * 60 * 60 * 24 * 365.25)));

      } else {
        console.log("El usuario no existe en Firestore");
      }
    })

    
  })

  const calcularCaloriasTotales = () => {
    let total = 0;

    for (const tipoComida of Object.keys(checkedComidas)) {
      const comidasCheckeadas = checkedComidas[tipoComida];

      for (const index in comidasCheckeadas) {
        if (comidasCheckeadas[index] && caloriasEstimadas?.[tipoComida]?.[index]) {
          total += caloriasEstimadas[tipoComida][index];
        }
      }
    }

    setCaloriasConsumidas(total);
  };

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

  useEffect(() => {
    calcularCaloriasTotales();
  }, [checkedComidas, caloriasEstimadas]);

  const dietaActual = dietas?.find(d => d.isCurrent);

  useEffect(() => {
    estimarCaloriasDelDia();
  }, [dietaActual]);

  const estimarCaloriasDelDia = async () => {
    if (!dietaActual) return;

    const comidas = dietaActual.dieta?.[diaActualLetra];
    if (!comidas) return;

    const nuevasEstimaciones = {};
    const nuevasChecks = {};

    for (const tipo in comidas) {
      nuevasEstimaciones[tipo] = comidas[tipo].map(comida => {
        return comida.kcal ?? Math.floor(Math.random() * (522 - 250 + 1)) + 250;
      });

    }
    
    setCaloriasEstimadas(nuevasEstimaciones);
    setCheckedComidas(nuevasChecks); 
  };



  const comidasDelDia = dietaActual?.dieta?.[diaActualLetra] || {};


  const calculoTMB = () => {
    if(género === 'Masculino'){
      //(10 x peso en kg) + (6,25 x altura en cm) - (5 x edad en años) + 5
      return (10 * peso + 6.25 * altura * 100 - 5 * años + 5);
      
    }else if (género === 'Femenino'){
      //(10 x peso en kg) + (6,25 x altura en cm) - (5 x edad en años) - 161
      return 10 * peso + 6.25 * altura*100 - 5 * años - 161;
    }else{
      return peso / altura;
    }
  }

  const objetive = calculoTMB() || 2000;
  const progreso = Math.min((balanceCalorico / objetive) * 100, 100);

  return (
    <Fondo>
      <Header />
      <View style={styles.container}>
        
          <View style={styles.caloriasContainer}>
            <AnimatedCircularProgress
              size={150}
              width={15}
              fill={progreso}
              tintColor= {balanceCalorico<calculoTMB() ? "#2F5D8C" : "#ea4440"}
              backgroundColor={balanceCalorico<0 ? "#f23026" : "#6e9ecf"}
              rotation={0}
              lineCap="round"
            >
              {
                () => (
                  <View style={styles.innerCircle}>
                    <Text style={styles.caloriasTexto}>{balanceCalorico.toFixed(0)} kcal</Text>
                    <Text style={styles.objetivoTexto}>de {Math.round(objetive)} kcal</Text>
                  </View>
                )
              }
            </AnimatedCircularProgress>
          </View>


          <View style={styles.waterContainer}>
            {waterCups.map((filled, i) => (
              <TouchableOpacity key={i} onPress={() => toggleCup(i)} style={styles.cupWrapper}>
                <FontAwesome5
                  name="glass-whiskey"
                  size={39}
                  color={filled ? '#2F5D8C' : 'gray'}
                />
                <Text style={styles.cupText}>0.25L</Text>
              </TouchableOpacity>
            ))}
          </View>

        <ScrollView contentContainerStyle={styles.main}>

          <TouchableOpacity style={styles.card} onPress={() => toggleSection('desayuno')}>
            <Text style={styles.cardText}>
              {expandedSections.desayuno ? <><MaterialCommunityIcons name="coffee" size={20} color="#2F5D8C" /><Text> Desayuno</Text></>  : <><MaterialCommunityIcons name="coffee-outline" size={20} color="#2F5D8C" /><Text> Desayuno</Text></> }
            </Text>

            <Animated.View
              style={[
                styles.cardContent,
                {
                  height: heightDesayuno,
                  opacity: opacityDesayuno,
                  marginTop: heightDesayuno.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  paddingTop: heightDesayuno.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  overflow: 'hidden',
                }
              ]}
            >
              {comidasDelDia?.Desayuno?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.checkboxRow}
                  onPress={() => toggleChecked('Desayuno', index)}
                >
                  <Text style={styles.checkbox}>
                    {checkedComidas?.Desayuno?.[index] ? '☑' : '☐'}
                  </Text>
                  <Text>{item.title || '—'}</Text>
                </TouchableOpacity>
              ))}

            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => toggleSection('media_mañana')}>
            <Text style={styles.cardText}>
              {expandedSections.media_mañana ? <><MaterialCommunityIcons name="food-apple" size={20} color="#2F5D8C" /><Text> Media Mañana</Text></>  : <><MaterialCommunityIcons name="food-apple-outline" size={20} color="#2F5D8C" /><Text> Media Mañana</Text></> }
            </Text>

            <Animated.View
              style={[
                styles.cardContent,
                {
                  height: heightMediaMañana,
                  opacity: opacityMediaMañana,
                  marginTop: heightMediaMañana.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  paddingTop: heightMediaMañana.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  overflow: 'hidden',
                }
              ]}
            >
              {comidasDelDia?.["Media Mañana"]?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.checkboxRow}
                  onPress={() => toggleChecked('Media Mañana', index)}
                >
                  <Text style={styles.checkbox}>
                    {checkedComidas?.["Media Mañana"]?.[index] ? '☑' : '☐'}
                  </Text>
                  <Text>{item.title || '—'}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableOpacity>


          <TouchableOpacity style={styles.card} onPress={() => toggleSection('almuerzo')}>
            <Text style={styles.cardText}>
              {expandedSections.almuerzo ? <><MaterialCommunityIcons name="food" size={20} color="#2F5D8C" /><Text> Almuerzo</Text></>   : <><MaterialCommunityIcons name="food-outline" size={20} color="#2F5D8C" /><Text> Almuerzo</Text></> }
            </Text>

            <Animated.View
              style={[
                styles.cardContent,
                {
                  height: heightAlmuerzo,
                  opacity: opacityAlmuerzo,
                  marginTop: heightAlmuerzo.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  paddingTop: heightAlmuerzo.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  overflow: 'hidden',
                }
              ]}
            >
              {comidasDelDia?.Comida?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.checkboxRow}
                  onPress={() => toggleChecked('Comida', index)}
                >
                  <Text style={styles.checkbox}>
                    {checkedComidas?.Comida?.[index] ? '☑' : '☐'}
                  </Text>
                  <Text>{item.title || '—'}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => toggleSection('merienda')}>
            <Text style={styles.cardText}>
              {expandedSections.merienda ? <><MaterialCommunityIcons name="cookie" size={20} color="#2F5D8C" /><Text> Merienda</Text></>  : <><MaterialCommunityIcons name="cookie-outline" size={20} color="#2F5D8C" /><Text> Merienda</Text></>}
            </Text>

            <Animated.View
              style={[
                styles.cardContent,
                {
                  height: heightMerienda,
                  opacity: opacityMerienda,
                  marginTop: heightMerienda.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  paddingTop: heightMerienda.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  overflow: 'hidden',
                }
              ]}
            >
              {comidasDelDia?.Merienda?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.checkboxRow}
                  onPress={() => toggleChecked('Merienda', index)}
                >
                  <Text style={styles.checkbox}>
                    {checkedComidas?.Merienda?.[index] ? '☑' : '☐'}
                  </Text>
                  <Text>{item.title || '—'}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.card} onPress={() => toggleSection('cena')}>
            <Text style={styles.cardText}>
              {expandedSections.cena ? <><MaterialCommunityIcons name="food-drumstick" size={20} color="#2F5D8C" /><Text> Cena</Text></>  : <><MaterialCommunityIcons name="food-drumstick-outline" size={20} color="#2F5D8C" /><Text> Cena</Text></>}
            </Text>

            <Animated.View
              style={[
                styles.cardContent,
                {
                  height: heightCena,
                  opacity: opacityCena,
                  marginTop: heightCena.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  paddingTop: heightCena.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  overflow: 'hidden',
                }
              ]}
            >
              {comidasDelDia?.Cena?.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.checkboxRow}
                  onPress={() => toggleChecked('Cena', index)}
                >
                  <Text style={styles.checkbox}>
                    {checkedComidas?.Cena?.[index] ? '☑' : '☐'}
                  </Text>
                  <Text>{item.title || '—'}</Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          </TouchableOpacity>

          <View style={{borderBottomWidth: 1, marginTop: 10, marginBottom: 10, borderColor: '#2F5D8C', height:0.5, width: '85%'}} ></View>

          <TouchableOpacity style={styles.card} onPress={() => toggleSection('ejercicio')}>
            <Text style={styles.cardText}>
              {expandedSections.ejercicio ? <><MaterialCommunityIcons name="heart" size={20} color="#2F5D8C" /><Text> Ejercicio</Text></>  : <><MaterialCommunityIcons name="heart-outline" size={20} color="#2F5D8C" /><Text> Ejercicio</Text></>}
            </Text>

            <Animated.View
              style={[
                styles.cardContent,
                {
                  height: heightEjercicio,
                  opacity: opacityEjercicio,
                  marginTop: heightEjercicio.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  paddingTop: heightEjercicio.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 10],
                    extrapolate: 'clamp',
                  }),
                  overflow: 'hidden',
                }
              ]}
            >
              <Text style={styles.label}>Actividad:</Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={actividad}
                  onValueChange={(itemValue) => setActividad(itemValue)}
                  style={styles.picker}
                >
                  <Picker.Item label="Selecciona actividad" value="" />
                  <Picker.Item label="Correr" value="Correr" />
                  <Picker.Item label="Caminar" value="Caminar" />
                  <Picker.Item label="Natación" value="Natación" />
                  <Picker.Item label="Bicicleta" value="Bicicleta" />
                  <Picker.Item label="Pesas" value="Pesas" />
                </Picker>
              </View>

              <Text style={styles.label}>Duración:</Text>
              <TextInput
                placeholder="minutos"
                keyboardType="numeric"
                style={styles.input}
                value={duracion}
                onChangeText={(text) => setDuracion(text)}
              />

              <Text style={styles.label}>Intensidad:</Text>
              <View style={styles.intensidadContainer}>
                {['Baja', 'Media', 'Alta'].map((nivel) => (
                  <TouchableOpacity
                    key={nivel}
                    style={[
                      styles.intensidadButton,
                      intensidad === nivel && styles.intensidadButtonSelected,
                    ]}
                    onPress={() => setIntensidad(nivel)}
                  >
                    <Text
                      style={[
                        styles.intensidadText,
                        intensidad === nivel && styles.intensidadTextSelected,
                      ]}
                    >
                      {nivel}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity style={styles.intensidadButtonClear} onPress={()=> {setIntensidad(''), setActividad(''), setDuracion(''), setCaloriasQuemadas(0)}}>
                <Text style={styles.intensidadText} >Clear</Text>
              </TouchableOpacity>
            </Animated.View>

          </TouchableOpacity>
          
        </ScrollView>
      </View>
    </Fondo>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginBottom: 80 },
  main: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  caloriesContainer: {
    marginBottom: 20,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#2F5D8C',
    justifyContent: 'center',
    alignItems: 'center',
  },
  kcalMain: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  kcalSub: {
    fontSize: 16,
    color: 'white',
  },
  waterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
  },
  cupWrapper: {
    marginHorizontal: 4,
    position: 'relative', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  cupText: {
    position: 'absolute',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 11,
    top: '50%',
    left: '50%',
    transform: [{ translateX: -13.7}, {translateY: +1.5}], 
    pointerEvents: 'none', 
  },
  card: {
    backgroundColor: '#fff',
    width: '85%',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    elevation: 3,
  },
  cardText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionContent: {
    backgroundColor: '#f2f2f2',
    width: '80%',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  

  cardExpanded: {
    backgroundColor: '#fff',
  },

  cardContent: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkbox: {
    fontSize: 18,
    marginRight: 8,
    color: '#2F5D8C',
  },
  caloriasContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  caloriasTexto: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  objetivoTexto: {
    fontSize: 14,
    color: '#666',
  },
  label: {
    fontSize: 16,
    marginTop: 10,
    color: '#2F5D8C',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 10,
  },
  picker: {
    height: 50,
    marginTop: -5,
    width: '100%',
  },
  intensidadContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  intensidadButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  intensidadButtonClear: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 5,
  },
  intensidadButtonSelected: {
    backgroundColor: '#2F5D8C',
    borderColor: '#2F5D8C',
  },
  intensidadText: {
    color: '#2F5D8C',
  },
  intensidadTextSelected: {
    color: '#fff',
  },


});
