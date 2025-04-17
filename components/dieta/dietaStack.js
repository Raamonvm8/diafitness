import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dieta from './dieta';
import CrearReceta from './CrearReceta';

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
          title: 'Crear Receta',
          headerStyle: { backgroundColor: '#2F5D8C' },
          headerTintColor: '#fff',
        }} 
      />
    </Stack.Navigator>
  );
}
