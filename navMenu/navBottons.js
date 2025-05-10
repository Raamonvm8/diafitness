// navigation/BottomTabs.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, Platform } from 'react-native';

import HomePage from '../components/homePage';
//import Dieta from '../components/dieta/dieta';
//import Glucosa from '../components/glucosa/glucosa';
import Perfil from '../components/perfil/perfil';
import Calendar from '../components/calendar/calendar';
import DietaStack from '../components/dieta/dietaStack';
import StackGlucosa from '../components/glucosa/stackGlucosa';

const Tab = createBottomTabNavigator();

export default function NavBottons() {
  return (
    <Tab.Navigator
      initialRouteName="Inicio"
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
            case 'Inicio':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'Calendar':
              iconName = focused ? 'calendar' : 'calendar-outline';
              break;
            case 'Dieta':
              iconName = focused ? 'restaurant' : 'restaurant-outline';
              break;
            case 'Glucosa':
              iconName = focused ? 'stats-chart' : 'stats-chart-outline';
              break;
            case 'Perfil':
              iconName = focused ? 'person' : 'person-outline';
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
      <Tab.Screen name="Inicio" component={HomePage} />
      <Tab.Screen name="Dieta" component={DietaStack} />
      <Tab.Screen name="Glucosa" component={StackGlucosa} />
      <Tab.Screen name="Calendar" component={Calendar} />
      <Tab.Screen name="Perfil" component={Perfil} />
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
