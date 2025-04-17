import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { setDoc, doc } from 'firebase/firestore';


export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [peso, setPeso] = useState(null);
    const [altura, setAltura] = useState(null);

    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const handleRegister = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            const user = response.user;

            await setDoc(doc(FIREBASE_DB, 'users', user.uid), {
                nombre: name,
                email: email,
                altura: altura,
                peso: peso,
                creado: new Date(),
            });


            console.log('User created:', response);
            navigation.replace('HomePage'); 
        } catch (error) {
            console.error('Register error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Nombre & Apellido" style={styles.input} value={name} onChangeText={setName} />
            <TextInput placeholder="Altura" style={styles.input} value={altura} onChangeText={setAltura} />
            <TextInput placeholder="Peso" style={styles.input} value={peso} onChangeText={setPeso} />
            <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail} />
            <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
            {loading ? <ActivityIndicator /> : <Button title="Register" onPress={handleRegister} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E0F0FF',
    },
    input: {
        marginBottom: 10,
        height: 50,
        borderWidth: 1,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
    },
});
