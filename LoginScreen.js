import React, { useState } from 'react';
import { View, TextInput, Button, Text, Alert } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, senha)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Welcome', { email: user.email }); // Passa o e-mail como parâmetro
            })
            .catch((error) => {
                Alert.alert("Erro", error.message);
            });
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput 
                placeholder="E-mail" 
                onChangeText={setEmail} 
                value={email} 
                keyboardType="email-address"
                autoCapitalize="none"
                style={{ marginBottom: 10 }}
            />
            <TextInput 
                placeholder="Senha" 
                secureTextEntry 
                onChangeText={setSenha} 
                value={senha} 
                style={{ marginBottom: 10 }}
            />
            <Button title="Entrar" onPress={handleLogin} />
            <Text 
                style={{ textAlign: 'center', color: 'blue' }} 
                onPress={() => navigation.navigate('SignUp')}
            >
                Criar Conta
            </Text>
        </View>
    );
}
