import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Glucosa from './glucosa';
import MedirGlucosa from './medirGlucosa';

const Stack = createNativeStackNavigator();

export default function StackGlucosa() {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Glucosa" component={Glucosa} options={{ headerShown: false }}  />
            <Stack.Screen 
                name="MedirGlucosa"
                component={MedirGlucosa} 
                options={{
                presentation: 'modal',
                title: 'Medir Glucosa',
                headerStyle: { backgroundColor: '#2F5D8C' },
                headerTintColor: '#fff',
                }} 
            />
          
        </Stack.Navigator>
    );

}
