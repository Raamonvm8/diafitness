import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Platform,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '../../FirebaseConfig';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [género, setGénero] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState(null);
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errores, setErrores] = useState({});
  const navigation = useNavigation();
  const auth = FIREBASE_AUTH;

  const onChange = (event, selectedDate) => {
    setShowPicker(false);
    if (selectedDate) {
      const dia = selectedDate.getDate().toString().padStart(2, '0');
      const mes = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const año = selectedDate.getFullYear();
      setFechaNacimiento(`${dia}/${mes}/${año}`);
    }
  };

  const handleRegister = async () => {
    setLoading(true);
    setErrores({});

    const nuevosErrores = {};

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    if (!peso) nuevosErrores.peso = 'Peso incompleto';
    else if (pesoNum < 11 || pesoNum > 400) nuevosErrores.peso = 'Peso incorrecto (Kg)';

    if (!altura) nuevosErrores.altura = 'Altura incompleta';
    else if (alturaNum < 0.5 || alturaNum > 2.5) nuevosErrores.altura = 'Altura incorrecta (m)';

    if (!género) nuevosErrores.género = 'Seleccione un género';

    if (!fechaNacimiento) nuevosErrores.fechaNacimiento = 'Fecha de nacimiento incompleta';

    if (name.trim().split(/\s+/).length < 2) nuevosErrores.nombre = 'Nombre incompleto';

    if (!email) nuevosErrores.email = 'Email incompleto';
    else if (!email.includes('@')) nuevosErrores.email = 'Email no válido';

    if (!password) nuevosErrores.password = 'Contraseña incompleta';
    else if (password.length < 6) nuevosErrores.password = 'Mínimo 6 caracteres';

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
        email,
        altura: alturaNum,
        peso: pesoNum,
        género,
        nacimiento: fechaNacimiento,
        creado: new Date(),
      });

      navigation.replace('HomePage');
    } catch (error) {
      const nuevosErrores = {};
      if (error.code === 'auth/invalid-email') nuevosErrores.email = 'Email no válido';
      else if (error.code === 'auth/email-already-in-use') nuevosErrores.email = 'Email ya registrado';
      if (error.code === 'auth/weak-password') nuevosErrores.password = 'Contraseña débil';
      setErrores(nuevosErrores);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro</Text>

      <TextInput
        style={[styles.input, errores.nombre && styles.inputError]}
        placeholder="Nombre & Apellido"
        value={name}
        onChangeText={setName}
      />
      {errores.nombre && <Text style={styles.textoError}>{errores.nombre}</Text>}

      <TextInput
        style={[styles.input, errores.altura && styles.inputError]}
        placeholder="Altura (m)"
        value={altura}
        onChangeText={setAltura}
        keyboardType="decimal-pad"
      />
      {errores.altura && <Text style={styles.textoError}>{errores.altura}</Text>}

      <TextInput
        style={[styles.input, errores.peso && styles.inputError]}
        placeholder="Peso (Kg)"
        value={peso}
        onChangeText={setPeso}
        keyboardType="decimal-pad"
      />
      {errores.peso && <Text style={styles.textoError}>{errores.peso}</Text>}

      <View style={[styles.pickerWrapper, errores.género && styles.inputError]}>
        <Picker
          selectedValue={género}
          onValueChange={(itemValue) => setGénero(itemValue)}>
          <Picker.Item label="Seleccione su género..." value="" />
          <Picker.Item label="Masculino" value="Masculino" />
          <Picker.Item label="Femenino" value="Femenino" />
        </Picker>
      </View>
      {errores.género && <Text style={styles.textoError}>{errores.género}</Text>}

      <TouchableOpacity style={styles.dateButton} onPress={() => setShowPicker(!showPicker)}>
        <Text style={styles.dateButtonText}>
          {fechaNacimiento ? fechaNacimiento : 'Seleccionar fecha de nacimiento'}
        </Text>
      </TouchableOpacity>
      {errores.fechaNacimiento && <Text style={styles.textoError}>{errores.fechaNacimiento}</Text>}

      {showPicker && (
        <DateTimePicker
          value={new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          maximumDate={new Date()}
          onChange={onChange}
        />
      )}

      <TextInput
        style={[styles.input, errores.email && styles.inputError]}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errores.email && <Text style={styles.textoError}>{errores.email}</Text>}

      <TextInput
        style={[styles.input, errores.password && styles.inputError]}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errores.password && <Text style={styles.textoError}>{errores.password}</Text>}

      <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrar</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#E0F0FF',
    marginBottom: -90
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  textoError: {
    color: 'red',
    marginBottom: 10,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#ccc',
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  dateButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#2F5D8C',
    padding: 12,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  dateButtonText: {
    color: '#2F5D8C',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#2F5D8C',
    paddingVertical: 14,
    borderRadius: 10,
    padding: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});