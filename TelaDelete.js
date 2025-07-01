import React, { useState } from 'react';
import { Button, Text, View, TextInput, Alert } from 'react-native';
import { doc, getDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { db } from './Firebase'; // ajuste o caminho conforme sua estrutura
import styles from "./estilo/estiloLogin"; // Certifique-se de que esse estilo está certo

export default function TelaDelete() {
  const [id, setId] = useState('');

  const remove = async () => {
    if (!id.trim()) {
      Alert.alert('Erro', 'Digite o ID do documento a ser excluído.');
      return;
    }

    try {
      const auth = getAuth();
      const usuarioAtual = auth.currentUser;

      if (!usuarioAtual) {
        Alert.alert('Erro', 'Usuário não autenticado.');
        return;
      }

      const docRef = doc(db, 'Usuários', id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        Alert.alert('Erro', 'Documento não encontrado.');
        return;
      }

      const data = docSnap.data();

      if (data.uidCriador !== usuarioAtual.uid) {
        Alert.alert('Permissão negada', 'Você só pode excluir documentos que criou.');
        return;
      }

      await deleteDoc(docRef);
      setId('');
      Alert.alert('Sucesso', 'Documento excluído com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao excluir documento', error.message);
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

      <Button title="EXCLUIR DOCUMENTO" onPress={remove} color="#2196F3" />
    </View>
  );
}
