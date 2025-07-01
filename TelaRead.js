import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from './Firebase'; // ajuste o caminho conforme seu projeto

export default function TelaRead() {
    const [array, setArray] = useState([]);

    useEffect(() => {
        read();
    }, []);

    const read = async () => {
        let auxArray = [];
        let count = 0;

        const q = query(collection(db, 'Usuários'));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            count++;
            const data = doc.data();
            const usuario = {
                id: doc.id,
                titulo: 'Usuário ' + count,
                nome: data.nome,
                idade: data.idade,
                criadoPor: data.criadoPor || 'Desconhecido'  // pega o criador, ou mostra "Desconhecido"
            };
            auxArray.push(usuario);
        });

        setArray(auxArray);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Nome da Coleção: Usuários</Text>

            <FlatList
                data={array}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text style={styles.usuario}>{item.titulo}</Text>
                        <Text>Nome: {item.nome}</Text>
                        <Text>Idade: {item.idade}</Text>
                        <Text>Criado por: {item.criadoPor}</Text> 
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff'
    },
    titulo: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center'
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10
    },
    usuario: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5
    }
});
