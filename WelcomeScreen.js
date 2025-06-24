import React from 'react';
import { View, Text, Button, TouchableOpacity } from 'react-native';
import { auth, signOut, getAuth } from 'firebase/auth';
import styles from './estilo/estiloLogin';

export default function WelcomeScreen({ navigation, route }) {
    const userEmail = route.params?.email || auth.currentUser?.email || 'Usuário';

    const sair = () => {
        signOut(getAuth())
            .then(() => navigation.popToTop())
            .catch(error => console.error("Erro ao sair:", error));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.Welcome}>Bem-vindo! {userEmail}</Text>


                
            

            <TouchableOpacity style={styles.botao} onPress={sair}>
                <Text style={styles.botaoTexto}>Sair</Text>
            </TouchableOpacity>
        </View>
    );
}
