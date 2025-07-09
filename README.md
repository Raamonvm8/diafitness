Este proyecto ha sido desarrollado como Trabajo de Fin de Grado (TFG) para el Grado en Ingeniería Informatica en la Universidad de Las Palmas de Gran Canaria, curso 2024/2025.

Autor: Ramón Valls Martin

# App de Control de Glucosa DiaFitness

Aplicación móvil desarrollada como Trabajo de Fin de Grado (TFG) que permite registrar y visualizar los niveles de glucosa en sangre de un paciente a lo largo del tiempo. La app incluye filtros por día, semana y mes, y representa los datos mediante gráficos de líneas para facilitar el seguimiento de la evolución.

## Características

- Registro manual de niveles de glucosa (mg/dL).
- Visualización de datos mediante gráficos:
  - Filtro por **día**, **semana** y **mes**.
- Almacenamiento de datos como autenticación, dietas, glucosa, objetivos, recetas, etc.
- Interfaz intuitiva y accesible.

## Tecnologías utilizadas

- **React Native**
- **Expo**
- **React Native Charts Wrapper** (o `react-native-chart-kit`)
- **AsyncStorage** (para almacenamiento local)
- **TypeScript** 

### Requisitos previos
- Node.js
- Expo CLI (`npm install -g expo-cli`)

### Instalación y ejecución


git clone https://github.com/Raamonvm8/diafitness.git
cd diafitness
npm install

- Si es con emulador Android:
npx expo run:android

- Si es con la aplicación expo Go:
npx expo start
