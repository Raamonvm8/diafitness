import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator, Button } from 'react-native';
import { FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { TextInput } from 'react-native-gesture-handler';
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
            //navigation.navigate('Inicio');
        } catch (error) {
            console.log('Login error:', error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <View style={styles.container}>
            <TextInput value={email} style={styles.input} placeholder="Email" autoCapitalize='none' onChangeText={setEmail} />
            <TextInput secureTextEntry value={password} style={styles.input} placeholder="Password" autoCapitalize='none' onChangeText={setPassword} />
            {loading ? (
                <ActivityIndicator size="large" color="#2F5D8C" />
            ) : (
                <>
                    <Button title='Login' onPress={signIn} />
                    <Button title='Create account' onPress={() => navigation.navigate('Register')} />
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#E0F0FF',
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});
