import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './constants/theme';

// Importação das Telas da raiz de screens/
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AgendaScreen from './screens/AgendaScreen';
import CalculadoraPrazosScreen from './screens/CalculadoraPrazosScreen';

// Subpastas com caminhos corrigidos
import ListarAdvogado from './screens/advogado/ListarAdvogado';
import FormAdvogado from './screens/advogado/FormAdvogado';

import ListarCliente from './screens/Cliente/ListarCliente';
import FormCliente from './screens/Cliente/FormCliente';

import ListarProcesso from './screens/processos/ListarProcesso';
import FormProcesso from './screens/processos/FormProcesso';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.textPrimary,
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        {/* Login e Dashboard */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Painel Principal', headerBackVisible: false }} />

        {/* Ferramentas TCC */}
        <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda de Prazos' }} />
        <Stack.Screen name="CalculadoraPrazos" component={CalculadoraPrazosScreen} options={{ title: 'Calculadora de Prazos' }} />

        {/* Módulos do Sistema */}
        <Stack.Screen name="ListarProcesso" component={ListarProcesso} options={{ title: 'Gestão de Processos' }} />
        <Stack.Screen name="FormProcesso" component={FormProcesso} options={{ title: 'Formulário de Processo' }} />

        <Stack.Screen name="ListarAdvogado" component={ListarAdvogado} options={{ title: 'Gestão de Advogados' }} />
        <Stack.Screen name="FormAdvogado" component={FormAdvogado} options={{ title: 'Formulário de Advogado' }} />

        <Stack.Screen name="ListarCliente" component={ListarCliente} options={{ title: 'Gestão de Clientes' }} />
        <Stack.Screen name="FormCliente" component={FormCliente} options={{ title: 'Formulário de Cliente' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}