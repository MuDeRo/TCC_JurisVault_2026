import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { colors } from './constants/theme';

// Login e Dashboard
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import AgendaScreen from './screens/AgendaScreen';
import CalculadoraPrazosScreen from './screens/CalculadoraPrazosScreen';

// Telas Hubs / Módulos
import ProcessosHubScreen from './screens/hubs/ProcessosHubScreen';
import OperacionalHubScreen from './screens/hubs/OperacionalHubScreen';
import PessoasHubScreen from './screens/hubs/PessoasHubScreen';
import UtilitariosHubScreen from './screens/hubs/UtilitariosHubScreen';

// Advogados e Perfil
import ListarAdvogado from './screens/advogado/ListarAdvogado';
import FormAdvogado from './screens/advogado/FormAdvogado';
import PerfilAdvogadoScreen from './screens/advogado/PerfilAdvogadoScreen';

// Admin
import AprovacaoAdvogadosScreen from './screens/admin/AprovacaoAdvogadosScreen';

// Clientes
import ListarCliente from './screens/Cliente/ListarCliente';
import FormCliente from './screens/Cliente/FormCliente';

// Processos e Diligências
import ListarProcesso from './screens/processos/ListarProcesso';
import FormProcesso from './screens/processos/FormProcesso';
import ListarAtribuicoes from './screens/processos/ListarAtribuicoes';

// Tarefas
import ListarTarefas from './screens/tarefas/ListarTarefas';
import FormTarefa from './screens/tarefas/FormTarefa';

// Etapas
import ListarEtapas from './screens/etapas/ListarEtapas';
import FormEtapa from './screens/etapas/FormEtapa';

// Arquivos
import ListarArquivosScreen from './screens/arquivos/ListarArquivosScreen';

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
        {/* Autenticação & Dashboard */}
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} options={{ title: 'Painel Principal', headerBackVisible: false }} />

        {/* Módulos Hubs */}
        <Stack.Screen name="ProcessosHub" component={ProcessosHubScreen} options={{ title: 'Processos & Diligências' }} />
        <Stack.Screen name="OperacionalHub" component={OperacionalHubScreen} options={{ title: 'Operacional & Documentos' }} />
        <Stack.Screen name="PessoasHub" component={PessoasHubScreen} options={{ title: 'Equipe & Clientes' }} />
        <Stack.Screen name="UtilitariosHub" component={UtilitariosHubScreen} options={{ title: 'Ferramentas & Utilitários' }} />

        {/* Administrador e Perfil */}
        <Stack.Screen name="AprovacaoAdvogados" component={AprovacaoAdvogadosScreen} options={{ title: 'Aprovação de Advogados' }} />
        <Stack.Screen name="PerfilAdvogado" component={PerfilAdvogadoScreen} options={{ title: 'Meu Perfil' }} />

        {/* Ferramentas TCC */}
        <Stack.Screen name="Agenda" component={AgendaScreen} options={{ title: 'Agenda de Prazos' }} />
        <Stack.Screen name="CalculadoraPrazos" component={CalculadoraPrazosScreen} options={{ title: 'Calculadora CPC' }} />

        {/* Módulo Processos e Diligências */}
        <Stack.Screen name="ListarProcesso" component={ListarProcesso} options={{ title: 'Gestão de Processos' }} />
        <Stack.Screen name="FormProcesso" component={FormProcesso} options={{ title: 'Formulário de Processo' }} />
        <Stack.Screen name="ListarAtribuicoes" component={ListarAtribuicoes} options={{ title: 'Locais e Diligências' }} />

        {/* Módulo Tarefas */}
        <Stack.Screen name="ListarTarefas" component={ListarTarefas} options={{ title: 'Gestão de Tarefas' }} />
        <Stack.Screen name="FormTarefa" component={FormTarefa} options={{ title: 'Nova Tarefa' }} />

        {/* Módulo Etapas */}
        <Stack.Screen name="ListarEtapas" component={ListarEtapas} options={{ title: 'Etapas Processuais' }} />
        <Stack.Screen name="FormEtapa" component={FormEtapa} options={{ title: 'Nova Etapa' }} />

        {/* Módulo Arquivos */}
        <Stack.Screen name="ListarArquivos" component={ListarArquivosScreen} options={{ title: 'Documentos e Anexos' }} />

        {/* Módulo Advogados */}
        <Stack.Screen name="ListarAdvogado" component={ListarAdvogado} options={{ title: 'Corpo Jurídico' }} />
        <Stack.Screen name="FormAdvogado" component={FormAdvogado} options={{ title: 'Formulário de Advogado' }} />

        {/* Módulo Clientes */}
        <Stack.Screen name="ListarCliente" component={ListarCliente} options={{ title: 'Gestão de Clientes' }} />
        <Stack.Screen name="FormCliente" component={FormCliente} options={{ title: 'Formulário de Cliente' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}