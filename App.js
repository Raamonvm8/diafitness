import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import NavBottons from './navMenu/navBottons'
import { NavigationContainer, useNavigationState } from '@react-navigation/native';
import Header from './components/header';
import Fondo from './components/fondo';
import { GestureHandlerRootView } from 'react-native-gesture-handler';



export default function App() {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <SafeAreaView style={styles.safeArea} edges={['top']}>
          <StatusBar style="light" />
          <Header />
          <View style={styles.container}>
            <NavBottons />
          </View>
        </SafeAreaView>
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
});
