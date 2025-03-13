import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function HomePage() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Inicio</Text>
        </View>
    );

}

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});