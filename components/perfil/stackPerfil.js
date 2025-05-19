import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from './perfil';
import GestionarObjetivos from './gestionarObjetivos';

const Stack = createNativeStackNavigator();

export default function StackGlucosa() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Perfil" component={Perfil} options={{ headerShown: false }}  />
            <Stack.Screen 
                name="GestionarObjetivos"
                component={GestionarObjetivos} 
                options={{
                    presentation: 'modal',
                    title: 'Gestionar Objetivos',
                    headerStyle: { backgroundColor: '#2F5D8C' },
                    headerTintColor: '#fff',
                }} 
            />
          
        </Stack.Navigator>
    );

}
