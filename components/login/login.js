import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    ActivityIndicator,
    TextInput,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;
    const navigation = useNavigation();

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('Login success:', response);
            // navigation.navigate('Inicio');
        } catch (error) {
            console.log('Login error:', error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <Text style={styles.title}>Iniciar sesión</Text>
            <TextInput
                value={email}
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#888"
                autoCapitalize="none"
                onChangeText={setEmail}
                keyboardType="email-address"
            />
            <TextInput
                secureTextEntry
                value={password}
                style={styles.input}
                placeholder="Contraseña"
                placeholderTextColor="#888"
                autoCapitalize="none"
                onChangeText={setPassword}
            />

            {loading ? (
                <ActivityIndicator size="large" color="#2F5D8C" style={{ marginTop: 20 }} />
            ) : (
                <>
                    <TouchableOpacity style={styles.button} onPress={signIn}>
                        <Text style={styles.buttonText}>Iniciar sesión</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.button, styles.secondaryButton]}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.secondaryButtonText}>Crear cuenta</Text>
                    </TouchableOpacity>
                </>
            )}
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: 'center',
        backgroundColor: '#E0F0FF',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2F5D8C',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        marginVertical: 8,
        height: 50,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        paddingHorizontal: 15,
        backgroundColor: '#fff',
        fontSize: 16,
    },
    button: {
        backgroundColor: '#2F5D8C',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    secondaryButton: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#2F5D8C',
    },
    secondaryButtonText: {
        color: '#2F5D8C',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
