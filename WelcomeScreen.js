import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth, signOut, getAuth } from 'firebase/auth';

export default function WelcomeScreen({ navigation, route }) {
    const userEmail = route.params?.email || auth.currentUser?.email || 'Usuário';

    const sair = () => {
        signOut(getAuth()).then(() => navigation.navigate('Login'));
    };

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Bem-vindo, {userEmail}!
            </Text>
            <Button title="Sairrrrrr" onPress={sair} />
        </View>
    );
}
