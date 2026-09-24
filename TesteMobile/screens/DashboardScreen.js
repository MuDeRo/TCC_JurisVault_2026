import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import { colors } from '../constants/theme';

export default function DashboardScreen({ navigation }) {
  const [mural, setMural] = useState({ casos: 0, clientes: 0, advogados: 0, diligencias: 0 });
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarMural = useCallback(async () => {
    try {
      const [resCasos, resClientes, resAdvogados, resAtribuicoes] = await Promise.allSettled([
        api.get('/casos'),
        api.get('/clientes'),
        api.get('/advogado'),
        api.get('/advogadosCasos'),
      ]);

      const totalCasos = resCasos.status === 'fulfilled' 
        ? (Array.isArray(resCasos.value.data) ? resCasos.value.data.length : (resCasos.value.data.casos?.length || 0)) : 0;
      
      const totalClientes = resClientes.status === 'fulfilled' 
        ? (Array.isArray(resClientes.value.data) ? resClientes.value.data.length : (resClientes.value.data.clientes?.length || 0)) : 0;
      
      const totalAdvogados = resAdvogados.status === 'fulfilled' 
        ? (Array.isArray(resAdvogados.value.data) ? resAdvogados.value.data.length : (resAdvogados.value.data.advogados?.length || 0)) : 0;

      const totalDiligencias = resAtribuicoes.status === 'fulfilled'
        ? (Array.isArray(resAtribuicoes.value.data) 
            ? resAtribuicoes.value.data.length 
            : (resAtribuicoes.value.data.data?.length || 0)) : 0;

      setMural({ 
        casos: totalCasos, 
        clientes: totalClientes, 
        advogados: totalAdvogados, 
        diligencias: totalDiligencias 
      });
    } catch (err) {
      console.log('Erro ao atualizar Dashboard:', err);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregarMural(); }, [carregarMural]));

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.scrollContent}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); carregarMural(); }} colors={[colors.primary]} />}
    >
      {/* Topo com botão de Perfil */}
      <View style={styles.header}>
        <View>
          <Text style={styles.saudacao}>PAINEL DE CONTROLE</Text>
          <Text style={styles.titulo}>JurisVault</Text>
        </View>
        <TouchableOpacity style={styles.btnPerfil} onPress={() => navigation.navigate('PerfilAdvogado')}>
          <Text style={{ fontSize: 18 }}>⚙️</Text>
        </TouchableOpacity>
      </View>

      {/* Métricas do Escritório (2x2 Grid) */}
      <View style={styles.gridMetrics}>
        <View style={styles.cardStat}>
          <Text style={styles.statEmoji}>📂</Text>
          <Text style={styles.statNumero}>{carregando ? '-' : mural.casos}</Text>
          <Text style={styles.statLabel}>Casos Ativos</Text>
        </View>

        <View style={styles.cardStat}>
          <Text style={styles.statEmoji}>👤</Text>
          <Text style={styles.statNumero}>{carregando ? '-' : mural.clientes}</Text>
          <Text style={styles.statLabel}>Clientes</Text>
        </View>

        <View style={styles.cardStat}>
          <Text style={styles.statEmoji}>⚖️</Text>
          <Text style={styles.statNumero}>{carregando ? '-' : mural.advogados}</Text>
          <Text style={styles.statLabel}>Advogados</Text>
        </View>

        <View style={styles.cardStat}>
          <Text style={styles.statEmoji}>📍</Text>
          <Text style={styles.statNumero}>{carregando ? '-' : mural.diligencias}</Text>
          <Text style={styles.statLabel}>Diligências</Text>
        </View>
      </View>

      {/* 4 MÓDULOS PRINCIPAIS */}
      <Text style={styles.secaoTitulo}>MÓDULOS DO SISTEMA</Text>

      <TouchableOpacity style={styles.cardModulo} onPress={() => navigation.navigate('ProcessosHub')}>
        <Text style={styles.moduloIcon}>💼</Text>
        <View style={styles.moduloTextos}>
          <Text style={styles.moduloTitulo}>Processos & Diligências</Text>
          <Text style={styles.moduloSub}>Gestão de casos, etapas e locais de atuação</Text>
        </View>
        <Text style={styles.moduloSeta}>➔</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardModulo} onPress={() => navigation.navigate('OperacionalHub')}>
        <Text style={styles.moduloIcon}>📋</Text>
        <View style={styles.moduloTextos}>
          <Text style={styles.moduloTitulo}>Operacional & Documentos</Text>
          <Text style={styles.moduloSub}>Tarefas diárias, anexos e arquivos</Text>
        </View>
        <Text style={styles.moduloSeta}>➔</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardModulo} onPress={() => navigation.navigate('PessoasHub')}>
        <Text style={styles.moduloIcon}>👥</Text>
        <View style={styles.moduloTextos}>
          <Text style={styles.moduloTitulo}>Equipe & Clientes</Text>
          <Text style={styles.moduloSub}>Clientes, corpo jurídico e aprovações</Text>
        </View>
        <Text style={styles.moduloSeta}>➔</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardModulo} onPress={() => navigation.navigate('UtilitariosHub')}>
        <Text style={styles.moduloIcon}>🛠️</Text>
        <View style={styles.moduloTextos}>
          <Text style={styles.moduloTitulo}>Ferramentas & Utilitários</Text>
          <Text style={styles.moduloSub}>Agenda de prazos e calculadora CPC</Text>
        </View>
        <Text style={styles.moduloSeta}>➔</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContent: { padding: 20 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  saudacao: { fontSize: 11, fontWeight: '800', color: colors.secondary, letterSpacing: 1 },
  titulo: { fontSize: 26, fontWeight: '900', color: colors.primary },
  btnPerfil: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.cardBackground, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  gridMetrics: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 24 },
  cardStat: { width: '48%', backgroundColor: colors.cardBackground, borderRadius: 16, padding: 14, marginBottom: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.border },
  statEmoji: { fontSize: 22, marginBottom: 2 },
  statNumero: { fontSize: 22, fontWeight: '900', color: colors.primary },
  statLabel: { fontSize: 10, fontWeight: '700', color: colors.textSecondary, marginTop: 2 },
  secaoTitulo: { fontSize: 11, fontWeight: '800', color: colors.textPrimary, marginBottom: 12, letterSpacing: 0.5 },
  cardModulo: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cardBackground, borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  moduloIcon: { fontSize: 28, marginRight: 14 },
  moduloTextos: { flex: 1 },
  moduloTitulo: { fontSize: 16, fontWeight: '800', color: colors.primary },
  moduloSub: { fontSize: 12, color: colors.textSecondary, marginTop: 2 },
  moduloSeta: { fontSize: 16, color: colors.secondary, fontWeight: '900', marginLeft: 8 }
});