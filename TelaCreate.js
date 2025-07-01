import { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { collection, setDoc, doc, getDocs } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';  // Importa o getAuth
import { db } from './Firebase';
import styles from "./estilo/estiloLogin";

export default function TelaCreate() {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');

    const create = async () => {
        if (!nome.trim() || !idade.trim()) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        try {
            // Pega o usuário atual autenticado
            const auth = getAuth();
            const usuarioAtual = auth.currentUser;

            if (!usuarioAtual) {
                Alert.alert('Erro', 'Usuário não autenticado.');
                return;
            }

            const usuariosRef = collection(db, 'Usuários');
            const snapshot = await getDocs(usuariosRef);

            const novoID = (snapshot.size + 1).toString().padStart(3, '0');

            await setDoc(doc(db, 'Usuários', novoID), {
                nome: nome,
                idade: idade,
                criadoPor: usuarioAtual.email,   // salva o email do usuário que criou
                uidCriador: usuarioAtual.uid     // salva o UID também (opcional)
            });

            Alert.alert('Sucesso', `Usuário ${novoID} criado com sucesso!`);
            setNome('');
            setIdade('');
        } catch (error) {
            Alert.alert('Erro ao criar usuário', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome da Coleção:</Text>
            <TextInput
                style={[styles.input, { backgroundColor: '#eee' }]}
                value="Usuários"
                editable={false}
            />

            <Text style={styles.label}>Nome do Usuário:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o nome"
            />

            <Text style={styles.label}>Idade:</Text>
            <TextInput
                style={styles.input}
                value={idade}
                onChangeText={setIdade}
                keyboardType="numeric"
                placeholder="Digite a idade"
            />

            <TouchableOpacity style={styles.botao} onPress={create}>
                <Text style={styles.botaoTexto}>SALVAR DADOS</Text>
            </TouchableOpacity>
        </View>
    );
}
