import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Fondo from "../fondo";
import moment from "moment";


export default function Glucosa() {
  const [mostrarDatos, setMostrarDatos] = useState(true); 
  const [filtro, setFiltro] = useState("dia");
  const [diaMostrado, setDiaMostrado] = useState("");
  const [esDia, setDia] = useState(false);

  
  const datosGlucosa = [
    { fecha: "12/03/2025", hora: "10:00", nivel: 100, notas: "recién levantado" },
    { fecha: "12/03/2025", hora: "13:00", nivel: 163, notas: "caminata 1km" },
    { fecha: "12/03/2025", hora: "18:00", nivel: 130, notas: "merienda" },
    { fecha: "11/03/2025", hora: "10:00", nivel: 120, notas: "---" },
    { fecha: "11/03/2025", hora: "13:00", nivel: 133, notas: "---" },
    { fecha: "11/03/2025", hora: "18:00", nivel: 110, notas: "---" },
    { fecha: "11/03/2025", hora: "20:00", nivel: 90, notas: "---" },
  ];

  const obtenerUltimaFecha = () => {
    return moment.max(datosGlucosa.map(d => moment(d.fecha, "DD/MM/YYYY")));
  };

  useEffect(() => {
    const ultimaFechaRegistrada = obtenerUltimaFecha();
    if (filtro === "dia" && ultimaFechaRegistrada) {
      setDiaMostrado(moment(ultimaFechaRegistrada, "DD/MM/YYYY").format("dddd, DD [de] MMMM"));
      setDia(true);
    } else {
      setDia(false);
    }
  }, [filtro]);

  const procesarDatos = () => {
    const ultimaFechaRegistrada = obtenerUltimaFecha();
    const fechaActual = moment();

    if (filtro === "dia") {
      const fechaSeleccionada = moment(diaMostrado, "dddd, DD [de] MMMM");  // Fecha seleccionada en formato día

    const datosDelDia = datosGlucosa.filter(d => moment(d.fecha, "DD/MM/YYYY").isSame(fechaSeleccionada, "day"));

    const labels = datosDelDia.map(d => moment(d.hora, "HH:mm").format("HH:mm"));
    
    return {
        labels: labels,
        
        datasets: [{
          data: datosDelDia.length > 0 ? datosDelDia.map(d => d.nivel) : [0],
          
        }],
    };
    }


    else if (filtro === "semana") {
      moment.updateLocale('es', { week: { dow: 1 } });

      const ultimaFechaConDatos = datosGlucosa
          .filter(d => moment(d.fecha, "DD/MM/YYYY").month() === ultimaFechaRegistrada.month()) // Filtrar por mes actual
          .sort((a, b) => moment(b.fecha, "DD/MM/YYYY").isBefore(moment(a.fecha, "DD/MM/YYYY")) ? 1 : -1)[0]; // Último registro

      if (!ultimaFechaConDatos) {
          return {
              labels: [],
              datasets: [{ data: [] }]
          };
      }

      const fechaUltimaConDatos = moment(ultimaFechaConDatos.fecha, "DD/MM/YYYY");
      const fechaInicioSemana = fechaUltimaConDatos.startOf('week');

      const semanaLabels = [];
      const semanaData = [];

      const diasSemana = ['L', 'M', 'X', 'J', 'V', 'S', 'D'];

      for (let i = 0; i < 7; i++) {
          const dia = fechaInicioSemana.clone().add(i, 'days');  
          semanaLabels.push(`${diasSemana[i]} (${dia.date()})`);

          const valoresDia = datosGlucosa.filter(d => moment(d.fecha, "DD/MM/YYYY").isSame(dia, "day"));

          if (valoresDia.length > 0) {
              semanaData.push(valoresDia.reduce((a, b) => a + b.nivel, 0) / valoresDia.length);
          } else {
              semanaData.push(0); 
          }
      }

      return {
          labels: semanaLabels,  
          datasets: [{ data: semanaData }],
      };
    }
  
  

    // Filtro por mes
    else if (filtro === "mes") {
      const primerDiaDelMes = ultimaFechaRegistrada.startOf('month');
      let fechaInicioMes = primerDiaDelMes;

      const diasDelMes = {};
      datosGlucosa.forEach(d => {
        const diaNum = parseInt(d.fecha.split("/")[0]);
        if (!diasDelMes[diaNum]) diasDelMes[diaNum] = [];
        diasDelMes[diaNum].push(d.nivel);
      });

      const diasLabels = Object.keys(diasDelMes).map(num => num.toString());
      const diasData = Object.values(diasDelMes).map(arr => arr.reduce((a, b) => a + b, 0) / arr.length);

      return {
        labels: diasLabels,
        datasets: [{ data: diasData }]
      };
    }
  };

  const cambiarDiaAnterior = () => {
    const nuevaFecha = moment(diaMostrado, "dddd, DD [de] MMMM").subtract(1, 'days');
    setDiaMostrado(nuevaFecha.format("dddd, DD [de] MMMM"));
  };
  
  const cambiarDiaSiguiente = () => {
    const nuevaFecha = moment(diaMostrado, "dddd, DD [de] MMMM").add(1, 'days');
    setDiaMostrado(nuevaFecha.format("dddd, DD [de] MMMM"));
  };
  

  return (
    <Fondo>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.main}>
          <TouchableOpacity 
            style={[styles.botonMes, { backgroundColor: mostrarDatos ? "#C7F2E6" : "#2F5D8C", width: mostrarDatos ? "60%" : "100%" }]} 
            onPress={() => setMostrarDatos(!mostrarDatos)}
          >
            <Text style={[styles.textoBoton, { color: mostrarDatos ? "#2F5D8C" : "#FFFFFF" }]}>
              Marzo 2025 {mostrarDatos ? "👆" : "👇"}
            </Text>
          </TouchableOpacity>

          {mostrarDatos && (
            <>
              <TouchableOpacity style={styles.botonMedir}>
                <Text style={styles.textoBoton}>+ Medir</Text>
              </TouchableOpacity>

              <View style={styles.tabla}>
                <View style={styles.filaHeader}>
                  <Text style={styles.celdaHeader}>Día</Text>
                  <Text style={styles.celdaHeader}>Hora</Text>
                  <Text style={styles.celdaHeader}>Nivel</Text>
                  <Text style={styles.celdaHeader}>Notas</Text>
                </View>
                <ScrollView style={styles.scrollTabla} nestedScrollEnabled={true}>
                  {datosGlucosa.map((item, index) => (
                    <View key={index} style={styles.fila}>
                      <Text style={styles.celda}>{item.fecha}</Text>
                      <Text style={styles.celda}>{item.hora}</Text>
                      <Text style={styles.celda}>{item.nivel}</Text>
                      <Text style={styles.celda}>{item.notas}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
              
              <View style={styles.filtrosContainer}>
                <TouchableOpacity onPress={() => setFiltro("dia")} style={[styles.botonFiltro, filtro === "dia" && styles.botonFiltroActivo]}>
                  <Text style={[styles.textoFiltro, {color: filtro==='dia' ? "#FFFFFF" : "#2F5D8C" } ]}>Día</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFiltro("semana")} style={[styles.botonFiltro, filtro === "semana" && styles.botonFiltroActivo]}>
                  <Text style={[styles.textoFiltro, {color: filtro==='semana' ? "#FFFFFF" : "#2F5D8C" } ]}>Semana</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFiltro("mes")} style={[styles.botonFiltro, filtro === "mes" && styles.botonFiltroActivo]}>
                  <Text style={[styles.textoFiltro, {color: filtro==='mes' ? "#FFFFFF" : "#2F5D8C" } ]}>Mes</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.fechaNavigation}>
                <TouchableOpacity onPress={cambiarDiaAnterior} style={styles.arrowButton}>
                  <Text style={styles.arrowText}>←</Text>
                </TouchableOpacity>
                <Text style={[styles.textoFiltro, {marginTop: 10, marginBottom: -10}]}>{esDia ? diaMostrado : ""}</Text>
                <TouchableOpacity onPress={cambiarDiaSiguiente} style={styles.arrowButton}>
                  <Text style={styles.arrowText}>→</Text>
                </TouchableOpacity>
              </View>             
              <LineChart
                data={procesarDatos()}
                width={Dimensions.get("window").width - 40}
                height={230}
                chartConfig={{
                  backgroundColor: "#FFFFFF",
                  backgroundGradientFrom: "#E0F0FF",
                  backgroundGradientTo: "#C7F2E6",
                  decimalPlaces: 1,
                  propsForLabels: { // Personaliza las etiquetas de los ejes
                    fontSize: 12,
                    fontWeight: "bold",
                  },
                  color: (opacity = 1) => `rgba(47, 93, 140, ${opacity})`,
                }}
                bezier
                style={styles.grafica}
              />
            </>
          )}

          {/* Otros meses */}
          <Text style={styles.subtitulo}>Meses anteriores</Text>
          <TouchableOpacity style={styles.botonMes}>
            <Text style={styles.textoBoton}>Enero 2025</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonMes}>
            <Text style={styles.textoBoton}>Diciembre 2024</Text>
          </TouchableOpacity>
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

  botonMedir: { backgroundColor: "#2F5D8C", padding: 10, borderRadius: 5, marginBottom: 15, marginTop: 15 },
  textoBoton: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },

  scrollTabla: { maxHeight: 160, width: "100%", backgroundColor: "#FFFFFF", borderBottomEndRadius: 10, borderBottomLeftRadius: 10 },

  tabla: { width: "100%" },

  filaHeader: { flexDirection: "row", backgroundColor: "#2F5D8C", padding: 8, borderTopLeftRadius: 10, borderTopRightRadius: 10 },
  fila: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: "#ccc", padding: 8 },

  celdaHeader: { flex: 1, fontWeight: "bold", color: "#FFFFFF", textAlign: "center" },
  celda: { flex: 1, textAlign: "center", color: "#2F5D8C" },

  grafica: { marginTop: 20, borderRadius: 10 },
  filtrosContainer: { flexDirection: "row", justifyContent: "center", marginTop: 10 },
  botonFiltro: { padding: 8, marginHorizontal: 5, borderRadius: 5, backgroundColor: "#C7F2E6" },
  botonFiltroActivo: { backgroundColor: "#2F5D8C" },
  textoFiltro: { color: "#2F5D8C", fontWeight: "bold" },

  botonMes: { padding: 10, borderRadius: 5, marginTop: 10, width: "100%", alignItems: "center", backgroundColor: '#2F5D8C' },

  fechaNavigation: { flexDirection: "row", justifyContent: "center", alignItems: "center" },
  arrowButton: { padding: 10 },
  arrowText: { fontSize: 20, fontWeight: "bold", color: "#2F5D8C" },
});
