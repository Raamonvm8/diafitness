import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Fondo from "../fondo";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { getAuth } from "firebase/auth";
import MonthYearPicker from 'react-native-month-year-picker';


export default function Glucosa() {
  const [mostrarDatos, setMostrarDatos] = useState(true);
  const [filtro, setFiltro] = useState("dia");
  const [diaMostrado, setDiaMostrado] = useState("");
  const [semanaMostrada, setSemanaMostrada] = useState(moment().startOf("isoWeek"));
  const [datosGlucosa, setDatosGlucosa] = useState([]);
  const [mesMostrado, setMesMostrado] = useState(moment().startOf("month"));

  const [mostrarSelectorMes, setMostrarSelectorMes] = useState(false);

  const navigation = useNavigation();

  const obtenerUltimaFecha = () => {
    return moment.max(datosGlucosa.map(d => moment(d.fecha, "DD/MM/YYYY")));
  };

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) return;
  
    const q = query(
      collection(FIREBASE_DB, "glucosa"),
      orderBy("createdAt", "desc")
    );
  
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const datos = snapshot.docs
        .map((doc) => {
          const data = doc.data();
          if (data.userId !== user.uid) return null;
  
          const fechaFormateada = moment(data.fecha).format("DD/MM/YYYY");
  
          return {
            id: doc.id,
            fecha: fechaFormateada,
            hora: data.hora,
            nivel: data.nivelGlucosa,
            nota: data.nota,
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : new Date(),
          };
        })
        .filter(Boolean);
  
      setDatosGlucosa(datos);
  
      
      if (filtro === "dia" && datos.length > 0 && diaMostrado === "") {
        const fechaMasReciente = moment(datos[0].fecha, "DD/MM/YYYY").format("dddd, DD [de] MMMM");
        setDiaMostrado(fechaMasReciente);
      }
      
    });
  
    return () => unsubscribe();
  }, [filtro, diaMostrado]);
  

  const procesarDatos = () => {
    const ultimaFechaRegistrada = obtenerUltimaFecha();
    const fechaActual = moment();
  
    if (filtro === "dia") {
      const fechaSeleccionada = moment(diaMostrado, "dddd, DD [de] MMMM");
     
  
      const datosDelDia = datosGlucosa
      .filter(d => moment(d.fecha, "DD/MM/YYYY").isSame(fechaSeleccionada, "day"))
      .sort((a, b) => moment(a.hora, "HH:mm").isBefore(moment(b.hora, "HH:mm")) ? -1 : 1);
      
      const labels = datosDelDia.map(d => moment(d.hora, "HH:mm").format("HH:mm"));
  
      const dataset = datosDelDia.map(d => {
        const nivel = parseFloat(d.nivel);
        return isNaN(nivel) ? 0 : nivel; 
      });
  
      return {
        labels: labels,
        datasets: [{
          data: dataset.length > 0 ? dataset : [0],
        }],
      };
  
    } else if (filtro === "semana") {
      moment.updateLocale('es', { week: { dow: 1 } });
  
      const ultimaFechaConDatos = datosGlucosa
        .filter(d => moment(d.fecha, "DD/MM/YYYY").month() === ultimaFechaRegistrada.month())
        .sort((a, b) => moment(b.fecha, "DD/MM/YYYY").isBefore(moment(a.fecha, "DD/MM/YYYY")) ? 1 : -1)[0]; 
  
      if (!ultimaFechaConDatos) {
        return {
          labels: [],
          datasets: [{ data: [] }],
        };
      }
  
      const fechaUltimaConDatos = moment(ultimaFechaConDatos.fecha, "DD/MM/YYYY");
      const fechaInicioSemana = fechaUltimaConDatos.startOf('week');
  
      const semanaLabels = [];
      const semanaData = [];
  
      const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];
  
      for (let i = 0; i < 7; i++) {
        const dia = moment(semanaMostrada).add(i, "days");
        semanaLabels.push(dia.format("dd (D)"));
  
        const valoresDia = datosGlucosa.filter(d => moment(d.fecha, "DD/MM/YYYY").isSame(dia, "day"));
        const promedioDia = valoresDia.length ? valoresDia.reduce((a, b) => a + parseFloat(b.nivel), 0) / valoresDia.length : 0;
  
        semanaData.push(promedioDia);
      }
      
  
      return {
        labels: semanaLabels,
        datasets: [{ data: semanaData }],
      };
  
    } else if (filtro === "mes") {
      const primerDiaDelMes = ultimaFechaRegistrada.startOf('month');
      let fechaInicioMes = primerDiaDelMes;
  
      const diasDelMes = {};
      datosGlucosa.forEach(d => {
        const diaNum = parseInt(d.fecha.split("/")[0]);
        if (!diasDelMes[diaNum]) diasDelMes[diaNum] = [];
        diasDelMes[diaNum].push(d.nivel);
      });
  
      const diasLabels = Object.keys(diasDelMes).map(num => num.toString());
      const diasData = Object.values(diasDelMes).map(arr => {
        const suma = arr.reduce((a, b) => a + parseFloat(b), 0);
        const promedio = suma / arr.length;
        return isNaN(promedio) ? 0 : promedio; 
      });
  
      return {
        labels: diasLabels,
        datasets: [{ data: diasData }],
      };
    }
  };
  

  const cambiarFechaAnterior = () => {
    if (filtro === "dia") {
      setDiaMostrado(prev => moment(prev, "dddd, DD [de] MMMM").subtract(1, "days").format("dddd, DD [de] MMMM"));
    } else if (filtro === "semana") {
      setSemanaMostrada(prev => moment(prev).subtract(1, "week"));
    }
  };

  const cambiarFechaSiguiente = () => {
    if (filtro === "dia") {
      setDiaMostrado(prev => moment(prev, "dddd, DD [de] MMMM").add(1, "days").format("dddd, DD [de] MMMM"));
    } else if (filtro === "semana") {
      setSemanaMostrada(prev => moment(prev).add(1, "week"));
    } 
  };
  

  return (
    <Fondo>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.main}>
        <TouchableOpacity onPress={() => setMostrarSelectorMes(true)} style={styles.botonMes}>
            <Text style={styles.textoBoton}>{mesMostrado.format("MMMM YYYY")}</Text>
          </TouchableOpacity>

          {mostrarSelectorMes && (
            <MonthYearPicker
              onChange={(event, date) => {
                setMostrarSelectorMes(false);
                if (date) {
                  setMesMostrado(moment(date));
                }
              }}
              value={mesMostrado.toDate()}
              minimumDate={new Date(2020, 0)} 
              maximumDate={new Date(2030, 11)} 
            />
          )}
  
          {mostrarDatos && (
            <>
              <View style={styles.fechaNavigationContainer}>
                <View style={styles.fechaNavigation}>
                  {filtro !== "mes" && (
                    <TouchableOpacity onPress={cambiarFechaAnterior} style={styles.arrowButton}>
                      <Text style={styles.arrowText}>←</Text>
                    </TouchableOpacity>
                  )}
                  <Text style={[styles.textoFiltro, { marginTop: 10, marginBottom: -10 }]}>
                    {filtro === "dia" ? diaMostrado : filtro === "semana" ? `Semana del ${semanaMostrada.format("DD/MM/YYYY")}` : mesMostrado.format("MMMM YYYY")}
                  </Text>
                  {filtro !== "mes" && (
                    <TouchableOpacity onPress={cambiarFechaSiguiente} style={styles.arrowButton}>
                      <Text style={styles.arrowText}>→</Text>
                    </TouchableOpacity>
                  )}
                </View>
                <TouchableOpacity style={styles.botonMedir} onPress={() => navigation.navigate('MedirGlucosa')}>
                  <Text style={styles.textoBoton}>+ Medir</Text>
                </TouchableOpacity>
              </View>
  
              {procesarDatos() && (
                <LineChart
                  data={procesarDatos()}
                  width={Dimensions.get("window").width - 40}
                  height={230}
                  chartConfig={{
                    backgroundColor: "#FFFFFF",
                    backgroundGradientFrom: "#E0F0FF",
                    backgroundGradientTo: "#C7F2E6",
                    decimalPlaces: 1,
                    propsForLabels: {
                      fontSize: 12,
                      fontWeight: "bold",
                    },
                    color: (opacity = 1) => `rgba(47, 93, 140, ${opacity})`,
                  }}
                  bezier
                  style={styles.grafica}
                />
              )}
            </>
          )}
  
          <View style={styles.filtrosContainer}>
            {["dia", "semana", "mes"].map((tipo) => (
              <TouchableOpacity
                key={tipo}
                onPress={() => setFiltro(tipo)}
                style={[
                  styles.botonFiltro,
                  filtro === tipo && styles.botonFiltroActivo,
                ]}
              >
                <Text
                  style={[
                    styles.textoFiltro,
                    { color: filtro === tipo ? "#FFFFFF" : "#2F5D8C" },
                  ]}
                >
                  {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
  
          <View style={{ height: 1, backgroundColor: "#ffffff", marginVertical: 10, zIndex: 1 }} />
  
          <View style={styles.tabla}>
            <View style={styles.filaHeader}>
              <Text style={styles.celdaHeader}>Día</Text>
              <Text style={styles.celdaHeader}>Hora</Text>
              <Text style={styles.celdaHeader}>Nivel (mg/dL)</Text>
              <Text style={styles.celdaHeader}>Notas</Text>
            </View>
            <ScrollView style={styles.scrollTabla} nestedScrollEnabled={true}>
              {datosGlucosa?.map((item, index) => (
                <View key={index} style={styles.fila}>
                  <Text style={styles.celda}>{item.fecha}</Text>
                  <Text style={styles.celda}>{item.hora}</Text>
                  <Text style={styles.celda}>{item.nivel}</Text>
                  <Text style={styles.celda}>{item.nota}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          
          

        </ScrollView>
      </View>
    </Fondo>
  );
  
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: "center", backgroundColor: "#E0F0FF" },
  main: { alignItems: "center", paddingVertical: 20 },

  titulo: { fontSize: 22, fontWeight: "bold", color: "#2F5D8C", marginBottom: 10 },
  subtitulo: { fontSize: 18, fontWeight: "bold", color: "#2F5D8C", marginTop: 20 },

  botonMedir: { backgroundColor: "#rgb(238, 148, 148)", padding: 5, borderRadius: 9, marginBottom: 7, marginTop: 15 },
  textoBoton: { color: "#FFFFFF", fontSize: 12, fontWeight: "bold" },

  scrollTabla: { maxHeight: 160, width: "100%", backgroundColor: "#FFFFFF", borderBottomEndRadius: 10, borderBottomLeftRadius: 10 },

  tabla: { width: "100%" },

  filaHeader: { flexDirection: "row", backgroundColor: "#2F5D8C", padding: 8, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  fila: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc", padding: 8 },

  celdaHeader: { flex: 1, fontWeight: "bold", color: "#FFFFFF", textAlign: "center" },
  celda: { flex: 1, textAlign: "center", color: "#2F5D8C" },

  grafica: { marginTop: 20, borderRadius: 10 },
  filtrosContainer: { flexDirection: "row", justifyContent: "center", marginTop: 10, marginBottom:10 },
  botonFiltro: { padding: 8, marginHorizontal: 5, borderRadius: 5, backgroundColor: "#C7F2E6" },
  botonFiltroActivo: { backgroundColor: "#2F5D8C" },
  textoFiltro: { color: "#2F5D8C", fontWeight: "bold" },

  botonMes: { padding: 10, borderRadius: 5, marginTop: 10, width: "100%", alignItems: "center", backgroundColor: '#2F5D8C' },

  fechaNavigationContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  
  fechaNavigation: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  
  arrowButton: { padding: 10 },
  arrowText: { marginTop: 20, fontSize: 20, fontWeight: "bold", color: "#2F5D8C" },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 15,
  }
});
