import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Perfil from './perfil';
import GestionarObjetivos from './gestionarObjetivos';
import Header from '../header';
import { faL } from '@fortawesome/free-solid-svg-icons';

const Stack = createNativeStackNavigator();

export default function StackPerfil() {
    return (
        <Stack.Navigator >
            <Stack.Screen
                name="Perfil"
                component={Perfil}
                options={{
                headerStyle: {
                    backgroundColor: '#2F5D8C',
                },
                headerShown: false,
                headerTintColor: '#fff',
                }}
            />

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
