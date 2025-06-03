// navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../components/homePage';
//import Dieta from '../components/dieta/dieta';
//import Glucosa from '../components/glucosa/glucosa';
//import Perfil from '../components/perfil/perfil';
import Calendar from '../components/calendar/calendar';
import DietaStack from '../components/dieta/dietaStack';
import StackGlucosa from '../components/glucosa/stackGlucosa';
import StackPerfil from '../components/perfil/stackPerfil';

const Tab = createBottomTabNavigator();

export default function NavBottons() {
  return (
    <Tab.Navigator
      initialRouteName="Hoy"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: '#2F5D8C',
          height: 70,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingBottom: Platform.OS === 'ios' ? 20 : 10,
          paddingTop: 5,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarActiveTintColor: '#E0F0FF',
        tabBarInactiveTintColor: '#B0CDE0',
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Hoy':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Calendario':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Alimentación':
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              break;
            case 'Glucosa':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            
          }

          return <Ionicons name={iconName} size={26} color={color} />;
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
      })}
    >
      <Tab.Screen name="Hoy" component={HomePage} />
      <Tab.Screen name="Glucosa" component={StackGlucosa} />
      <Tab.Screen name="Alimentación" component={DietaStack} />
      <Tab.Screen name="Calendario" component={Calendar} />
      <Tab.Screen
        name="Perfil"
        component={StackPerfil}
        options={{
          tabBarButton: () => null, 
          tabBarVisible: false, 
        }}
      />

    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
