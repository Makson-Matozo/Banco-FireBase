import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import styles from "./estilo/estiloLogin"; // Certifique-se que o caminho está correto

const WelcomeScreen = ({ navigation }) => {
    const [usuarioAtual, setUsuarioAtual] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setUsuarioAtual(user);
        }
    }, []);

    const sair = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                navigation.popToTop();
            })
            .catch(error => {
                console.error('Erro ao sair:', error);
                Alert.alert('Erro', 'Não foi possível sair da conta.');
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Operações CRUD</Text>

            {usuarioAtual && (
                <Text style={{ marginBottom: 20, fontSize: 16 }}>
                    Usuário: {usuarioAtual.email}
                </Text>
            )}

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Create')}>
                <Text style={styles.botaoTexto}>CREATE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Read')}>
                <Text style={styles.botaoTexto}>READ</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Update')}>
                <Text style={styles.botaoTexto}>UPDATE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Delete')}>
                <Text style={styles.botaoTexto}>DELETE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.botaoSair} onPress={sair}>
                <Text style={styles.botaoTexto}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
};

export default WelcomeScreen;
