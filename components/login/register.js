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

    const [errores, setErrores] = useState({});
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const handleRegister = async () => {
        setLoading(true);
        setErrores({});

        const nuevosErrores = {};

        if (!peso) {
            nuevosErrores.peso='Peso incompleto';
        }else if (peso < 11 || peso > 400) {
            nuevosErrores.peso = 'Peso incorrecto (Kg)';
        }

        if (!altura) {
            nuevosErrores.altura = 'Altura incompleta';
        }else if(altura < 0.5 || altura > 2.5){
            nuevosErrores.altura = 'Altura incorrecta (metros)';
        }

        if (name.trim().split(/\s+/).length < 2) {
            nuevosErrores.nombre = 'Nombre incompleto';
        }

        if (!email) {
            nuevosErrores.email = 'Email incompleto';
        }else if (!email.includes('@')) {
            nuevosErrores.email = 'El email no es válido';
        }

        if (!password) {
            nuevosErrores.password = 'Contraseña incompleta';
        }else if (password.length < 6) {
            nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
        }

        if (Object.keys(nuevosErrores).length > 0) {
            setErrores(nuevosErrores);
            setLoading(false);
            return; 
        }

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
            const nuevosErrores = {};
            if (error.code === 'auth/invalid-email') {
                nuevosErrores.email = 'El email no es válido';
            } else if (error.code === 'auth/email-already-in-use') {
                nuevosErrores.email = 'Este email ya está en uso';
            }
            if (error.code === 'auth/weak-password') {
                nuevosErrores.password = 'La contraseña debe tener al menos 6 caracteres';
            }

            setErrores(nuevosErrores);
            console.error('Register error:', error.message);
        } finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <TextInput placeholder="Nombre & Apellido" style={[styles.input, errores.nombre && styles.inputError]} value={name} onChangeText={setName} />
            {errores.nombre && <Text style={styles.textoError}>{errores.nombre}</Text>}
            <TextInput placeholder="Altura 'm'" style={[styles.input, errores.altura && styles.inputError]} value={altura} onChangeText={setAltura} />
            {errores.altura && <Text style={styles.textoError}>{errores.altura}</Text>}
            <TextInput placeholder="Peso 'Kg'" style={[styles.input, errores.peso && styles.inputError]} value={peso} onChangeText={setPeso} />
            {errores.peso && <Text style={styles.textoError}>{errores.peso}</Text>}
            <TextInput placeholder="Email" style={[styles.input, errores.email && styles.inputError]} value={email} onChangeText={setEmail} />
            {errores.email && <Text style={styles.textoError}>{errores.email}</Text>}
            <TextInput placeholder="Contraseña" style={styles.input} value={password} onChangeText={setPassword} secureTextEntry />
            {errores.password && <Text style={styles.textoError}>{errores.password}</Text>}
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
    textoError: {
        color: 'red',
        marginBottom: 10,
    },
    inputError: {
        borderColor: 'red',
    },
});
