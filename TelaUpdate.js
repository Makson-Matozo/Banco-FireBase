import React, { useState } from 'react';
import { Button, Text, View, TextInput, Alert } from 'react-native';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './Firebase'; // ajuste o caminho conforme seu projeto
import styles from "./estilo/estiloLogin";

export default function TelaUpdate() {
    const [id, setId] = useState('');
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');

    const update = async () => {
        if (!id.trim()) {
            Alert.alert('Erro', 'Digite o ID do usuário a ser atualizado.');
            return;
        }

        try {
            const auth = getAuth();
            const usuarioAtual = auth.currentUser;

            if (!usuarioAtual) {
                Alert.alert('Erro', 'Usuário não autenticado.');
                return;
            }

            const documentRef = doc(db, 'Usuários', id);
            const docSnap = await getDoc(documentRef);

            if (!docSnap.exists()) {
                Alert.alert('Erro', 'Usuário não encontrado.');
                return;
            }

            const data = docSnap.data();

            if (data.uidCriador !== usuarioAtual.uid) {
                Alert.alert('Permissão negada', 'Você só pode editar usuários que criou.');
                return;
            }

            await updateDoc(documentRef, {
                nome: nome,
                idade: idade
            });

            Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
            setId('');
            setNome('');
            setIdade('');
        } catch (error) {
            Alert.alert('Erro ao atualizar usuário', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Nome da Coleção: <Text style={styles.info}>Usuários</Text></Text>

            <Text style={styles.label}>Id:</Text>
            <TextInput
                style={styles.input}
                value={id}
                onChangeText={setId}
                placeholder="Digite o ID"
            />

            <Text style={styles.label}>Novo Nome:</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Digite o novo nome"
            />

            <Text style={styles.label}>Nova Idade:</Text>
            <TextInput
                style={styles.input}
                value={idade}
                onChangeText={setIdade}
                placeholder="Digite a nova idade"
                keyboardType="numeric"
            />

            <Button title="ATUALIZAR DADOS" onPress={update} color="#2196F3" />
        </View>
    );
}
