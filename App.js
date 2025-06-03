import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from './components/header';
import NavBottons from './navMenu/navBottons';
import StackPerfil from './components/perfil/stackPerfil'
import Login from './components/login/login';
import Register from './components/login/register';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { FIREBASE_AUTH } from './FirebaseConfig';
import { agregarSugerenciasComidaGlobales } from './components/dieta/cargarSugerencias';

const AuthStack = createNativeStackNavigator();
const AppStack = createNativeStackNavigator();

function AuthStackScreen() {
  useEffect(() => {
  }, []);
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
      <AuthStack.Screen
        name="Register"
        component={Register}
        options={{
          title: 'Crear cuenta', 
          headerStyle: {
            backgroundColor: '#2F5D8C',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      />
    </AuthStack.Navigator>
  );
}


function AppStackScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <StatusBar style="light" />
      <AppStack.Navigator screenOptions={{ headerShown: false }}>
        <AppStack.Screen name="MainTabs" component={NavBottons} />
        <AppStack.Screen name="Perfil" component={StackPerfil} />
      </AppStack.Navigator>
    </SafeAreaView>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
      setLoadingAuth(false);
    });
    return unsubscribe;
  }, []);

  if (loadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#2F5D8C" />
      </View>
    );
  }

  return (
    
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <NavigationContainer>
          {user ? <AppStackScreen /> : <AuthStackScreen />}
        </NavigationContainer>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2F5D8C',
  },
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
