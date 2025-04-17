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
  const [semanaMostrada, setSemanaMostrada] = useState(moment().startOf("isoWeek"));
  const [esSemana, setSemana] = useState(false);
  const [esDia, setDia] = useState(false);


  const cambiarSemanaAnterior = () => {
    setSemanaMostrada((prev) => moment(prev).subtract(1, "week"));
  };
  
  const cambiarSemanaSiguiente = () => {
    const ultimaFecha = obtenerUltimaFecha();
    const nuevaSemana = moment(semanaMostrada).add(1, "week");
  
    // Asegurar que no pase del mes actual
    if (nuevaSemana.month() === ultimaFecha.month()) {
      setSemanaMostrada(nuevaSemana);
    }
  };
  
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
    if (filtro === "semana" && ultimaFechaRegistrada) {
      setSemanaMostrada(moment(ultimaFechaRegistrada, "DD/MM/YYYY"));
      setSemana(true);
    } else {
      setSemana(false);
    }
  }, [filtro]);

  const procesarDatos = () => {
    const ultimaFechaRegistrada = obtenerUltimaFecha();
    const fechaActual = moment();

    if (filtro === "dia") {
      const fechaSeleccionada = moment(diaMostrado, "dddd, DD [de] MMMM");

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

  const cambiarFechaAnterior = () => {
    if (filtro === "dia") {
      const nuevaFecha = moment(diaMostrado, "dddd, DD [de] MMMM").subtract(1, "days");
      setDiaMostrado(nuevaFecha.format("dddd, DD [de] MMMM"));
    } else if (filtro === "semana") {
      cambiarSemanaAnterior();
    }
  };
  
  const cambiarFechaSiguiente = () => {
    if (filtro === "dia") {
      const nuevaFecha = moment(diaMostrado, "dddd, DD [de] MMMM").add(1, "days");
      setDiaMostrado(nuevaFecha.format("dddd, DD [de] MMMM"));
    } else if (filtro === "semana") {
      cambiarSemanaSiguiente();
    }
  };
  
  

  return (
    <Fondo>
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.main}>
          {/* Botón para mostrar/ocultar datos */}
          {/*<TouchableOpacity
            style={[
              styles.botonMes,
              {
                backgroundColor: mostrarDatos ? "#C7F2E6" : "#2F5D8C",
                width: mostrarDatos ? "60%" : "100%",
              },
            ]}
            onPress={() => setMostrarDatos(!mostrarDatos)}
          >
            <Text
              style={[
                styles.textoBoton,
                { color: mostrarDatos ? "#2F5D8C" : "#FFFFFF" },
              ]}
            >
              Marzo 2025 {mostrarDatos ? "👆" : "👇"}
            </Text> 
          </TouchableOpacity>*/ }
  
          {mostrarDatos && (
            <>
              

              <View style={styles.fechaNavigationContainer}>
                <View style={styles.fechaNavigation}>
                  <TouchableOpacity onPress={cambiarFechaAnterior} style={styles.arrowButton}>
                    <Text style={styles.arrowText}>←</Text>
                  </TouchableOpacity>
                  <Text style={[styles.textoFiltro, { marginTop: 10, marginBottom: -10 }]}>
                    {filtro === "dia" ? diaMostrado : filtro === "semana" ? `Semana del ${semanaMostrada.format("DD/MM/YYYY")}` : ""}
                  </Text>
                  <TouchableOpacity onPress={cambiarFechaSiguiente} style={styles.arrowButton}>
                    <Text style={styles.arrowText}>→</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.botonMedir}>
                  <Text style={styles.textoBoton}>+ Medir</Text>
                </TouchableOpacity>
              </View>

      
  
              {/* Gráfico */}
              {procesarDatos && (
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
                  <Text style={styles.celdaHeader}>Nivel</Text>
                  <Text style={styles.celdaHeader}>Notas</Text>
                </View>
                <ScrollView style={styles.scrollTabla} nestedScrollEnabled={true}>
                  {datosGlucosa?.map((item, index) => (
                    <View key={index} style={styles.fila}>
                      <Text style={styles.celda}>{item.fecha}</Text>
                      <Text style={styles.celda}>{item.hora}</Text>
                      <Text style={styles.celda}>{item.nivel}</Text>
                      <Text style={styles.celda}>{item.notas}</Text>
                    </View>
                  ))}
                </ScrollView>
              </View>
  
          {/* Meses anteriores */}
          <Text style={styles.subtitulo}>Meses anteriores</Text>
          {["Enero 2025", "Diciembre 2024"].map((mes, index) => (
            <TouchableOpacity key={index} style={styles.botonMes}>
              <Text style={styles.textoBoton}>{mes}</Text>
            </TouchableOpacity>
          ))}
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
  arrowText: { fontSize: 20, fontWeight: "bold", color: "#2F5D8C" },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 15,
  }
});
