import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dieta from './dieta';
import CrearReceta from './CrearReceta';
import CrearDieta from './CrearDieta';
import DetalleReceta from './DetalleReceta';
import DetalleDieta from './DetalleDieta';

const Stack = createNativeStackNavigator();

export default function DietaStack() {
  return (
    <Stack.Navigator >
      <Stack.Screen 
        name="DietaScreen" 
        component={Dieta} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="CrearReceta" 
        component={CrearReceta} 
        options={{
          presentation: 'modal',
          title: 'Crear Comida',
          headerStyle: { backgroundColor: '#2F5D8C' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="CrearDieta" 
        component={CrearDieta} 
        options={{
          presentation: 'modal',
          title: 'Crear Dieta',
          headerStyle: { backgroundColor: '#2F5D8C' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="DetalleReceta" 
        component={DetalleReceta} 
        options={{
          presentation: 'modal',
          title: 'Detalle Comida',
          headerStyle: { backgroundColor: '#2F5D8C' },
          headerTintColor: '#fff',
        }} 
      />
      <Stack.Screen 
        name="DetalleDieta" 
        component={DetalleDieta} 
        options={{
          presentation: 'modal',
          title: 'Detalle Dieta',
          headerStyle: { backgroundColor: '#2F5D8C' },
          headerTintColor: '#fff',
        }} 
      />
      
    </Stack.Navigator>
  );
}
