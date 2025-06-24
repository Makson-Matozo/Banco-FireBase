import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './Firebase';

export default function SignUpScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmarSenha, setConfirmarSenha] = useState('');

    const criarConta = () => {
        if (senha !== confirmarSenha) {
            Alert.alert("Erro", "As senhas não coincidem!");
            return;
        }

        createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                Alert.alert("Sucesso", "Conta criada!");
                navigation.navigate('Login');
            })
            .catch(error => Alert.alert("Erro", error.message));
    };

    return (
        <View style={{ padding: 20 }}>
            <TextInput 
                placeholder="E-mail" 
                onChangeText={setEmail} 
                value={email} 
                autoCapitalize="none"
                keyboardType="email-address"
                style={{ marginBottom: 10 }}
            />
            <TextInput 
                placeholder="Senha" 
                secureTextEntry 
                onChangeText={setSenha} 
                value={senha} 
                style={{ marginBottom: 10 }}
            />
            <TextInput 
                placeholder="Confirmar Senha" 
                secureTextEntry 
                onChangeText={setConfirmarSenha} 
                value={confirmarSenha} 
                style={{ marginBottom: 10 }}
            />
            <Button title="Criar Conta" onPress={criarConta} />
            <Text 
                style={{ marginTop: 15, textAlign: 'center', color: 'blue' }} 
                onPress={() => navigation.navigate('Login')}
            >
                Já tem uma conta? Faça login
            </Text>
        </View>
    );
}
