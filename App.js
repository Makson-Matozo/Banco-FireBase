import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Telas de autenticação
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import ResetSenha from './ResetSenha';

// Telas principais do sistema
import WelcomeScreen from './WelcomeScreen';
import TelaCreate from './TelaCreate';
import TelaRead from './TelaRead';
import TelaUpdate from './TelaUpdate';
import TelaDelete from './TelaDelete';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {/* Telas de autenticação */}
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Reset" component={ResetSenha} />

        {/* Tela inicial pós-login */}
        <Stack.Screen
          name="Welcome"
          component={WelcomeScreen}
          options={{ headerLeft: () => null }}
        />



        {/* Telas do CRUD */}
        <Stack.Screen name="Create" component={TelaCreate} />
        <Stack.Screen name="Read" component={TelaRead} />
        <Stack.Screen name="Update" component={TelaUpdate} />
        <Stack.Screen name="Delete" component={TelaDelete} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
