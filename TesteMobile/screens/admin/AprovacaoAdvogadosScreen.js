import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function AprovacaoAdvogadosScreen() {
  const [aba, setAba] = useState('pendentes'); // 'pendentes' | 'aprovados'
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarDados = useCallback(async () => {
    try {
      setCarregando(true);
      const rota = aba === 'pendentes' ? '/administrador/pendentes' : '/administrador/aprovados';
      const res = await api.get(rota);
      const dados = Array.isArray(res.data) ? res.data : (res.data.advogados || res.data.data || []);
      setLista(dados);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao carregar lista de advogados.');
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, [aba]);

  useFocusEffect(useCallback(() => { carregarDados(); }, [carregarDados]));

  async function responderSolicitacao(id, acao) {
    try {
      const rota = acao === 'aprovar' ? `/administrador/aprovar/${id}` : `/administrador/negar/${id}`;
      await api.put(rota);
      Alert.alert('Sucesso', `Solicitação ${acao === 'aprovar' ? 'aprovada' : 'negada'} com sucesso.`);
      carregarDados();
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Ação não concluída.');
    }
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.nome}>{item.nome_advogado || item.nome}</Text>
        <Text style={styles.oab}>OAB: {item.registro_oab || item.oab}</Text>
      </View>
      <Text style={styles.email}>✉️ {item.email_advogado || item.email}</Text>

      {aba === 'pendentes' && (
        <View style={styles.acoesContainer}>
          <TouchableOpacity style={[styles.btnAcao, styles.btnAprovar]} onPress={() => responderSolicitacao(item.id_advogado || item.id, 'aprovar')}>
            <Text style={styles.txtBtnAcao}>✓ Aprovar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.btnAcao, styles.btnNegar]} onPress={() => responderSolicitacao(item.id_advogado || item.id, 'negar')}>
            <Text style={styles.txtBtnAcao}>✕ Negar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabsContainer}>
        <TouchableOpacity style={[styles.tab, aba === 'pendentes' && styles.tabAtiva]} onPress={() => setAba('pendentes')}>
          <Text style={[styles.txtTab, aba === 'pendentes' && styles.txtTabAtiva]}>Pendentes</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tab, aba === 'aprovados' && styles.tabAtiva]} onPress={() => setAba('aprovados')}>
          <Text style={[styles.txtTab, aba === 'aprovados' && styles.txtTabAtiva]}>Aprovados</Text>
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={lista}
          keyExtractor={(item, index) => String(item.id_advogado || item.id || index)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); carregarDados(); }} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>🛡️</Text>
              <Text style={styles.emptyTitle}>Nenhum advogado nesta lista</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  tabsContainer: { flexDirection: 'row', margin: 16, marginBottom: 8, backgroundColor: colors.cardBackground, borderRadius: 12, padding: 4, borderWidth: 1, borderColor: colors.border },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabAtiva: { backgroundColor: colors.primary },
  txtTab: { fontSize: 13, fontWeight: '800', color: colors.textSecondary },
  txtTabAtiva: { color: colors.white },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  nome: { fontSize: 15, fontWeight: '800', color: colors.primary, flex: 1 },
  oab: { fontSize: 12, fontWeight: '700', color: colors.secondary },
  email: { fontSize: 13, color: colors.textSecondary, marginBottom: 10 },
  acoesContainer: { flexDirection: 'row', justifyContent: 'flex-end', borderTopWidth: 1, borderTopColor: colors.border, paddingTop: 10 },
  btnAcao: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 8, marginLeft: 8 },
  btnAprovar: { backgroundColor: '#2E7D32' },
  btnNegar: { backgroundColor: colors.danger || '#C62828' },
  txtBtnAcao: { color: colors.white, fontWeight: '800', fontSize: 12 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary }
});