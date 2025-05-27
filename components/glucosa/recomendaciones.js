import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Glucosa from './glucosa';
import MedirGlucosa from './medirGlucosa';

import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import Fondo from "../fondo";
import moment from "moment";
import { useNavigation } from '@react-navigation/native';
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { FIREBASE_DB } from "../../FirebaseConfig";
import { getAuth } from "firebase/auth";
import MonthYearPicker from 'react-native-month-year-picker';


export default function Recomendaciones() {
    return(
        <Text>Componente recomendaciones</Text>
    );

}
