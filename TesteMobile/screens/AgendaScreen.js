import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../services/api';
import { colors } from '../constants/theme';

export default function AgendaScreen() {
  const [compromissos, setCompromissos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarAgenda = useCallback(async () => {
    try {
      const response = await api.get('/agenda').catch(() => ({ data: [] }));
      const dados = Array.isArray(response.data) ? response.data : (response.data.compromissos || []);
      setCompromissos(dados);
    } catch (err) {
      console.log('Erro agenda:', err);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregarAgenda(); }, [carregarAgenda]));

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.titulo}>{item.titulo || 'Prazo Processual'}</Text>
        <Text style={styles.data}>{item.data_limite || item.data || 'A definir'}</Text>
      </View>
      <Text style={styles.cnj}>CNJ: {item.numero_cnj || 'Não vinculado'}</Text>
      <Text style={styles.descricao}>{item.descricao || 'Sem observações adicionais.'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {carregando ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={compromissos}
          keyExtractor={(item, index) => String(item.id || index)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); carregarAgenda(); }} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📅</Text>
              <Text style={styles.emptyTitle}>Nenhum compromisso agendado</Text>
              <Text style={styles.emptySubtitle}>Prazos e audiências aparecerão aqui.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 },
  titulo: { fontSize: 15, fontWeight: '800', color: colors.primary, flex: 1 },
  data: { fontSize: 12, fontWeight: '800', color: colors.danger },
  cnj: { fontSize: 12, fontWeight: '700', color: colors.secondary, marginBottom: 6 },
  descricao: { fontSize: 13, color: colors.textSecondary },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
  emptySubtitle: { fontSize: 13, color: colors.textSecondary, marginTop: 4 }
});