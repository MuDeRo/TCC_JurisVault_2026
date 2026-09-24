import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function ListarTarefas({ navigation }) {
  const [tarefas, setTarefas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarTarefas = useCallback(async () => {
    try {
      const res = await api.get('/tarefas');
      const dados = Array.isArray(res.data) ? res.data : (res.data.tarefas || []);
      setTarefas(dados);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao carregar tarefas.');
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregarTarefas(); }, [carregarTarefas]));

  async function deletarTarefa(id) {
    Alert.alert('Confirmar Exclusão', 'Deseja excluir esta tarefa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/tarefas/${id}`);
            carregarTarefas();
          } catch (err) {
            Alert.alert('Erro', 'Não foi possível excluir a tarefa.');
          }
        }
      }
    ]);
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.titulo}>{item.titulo || item.descricao_tarefa}</Text>
        <TouchableOpacity onPress={() => deletarTarefa(item.id_tarefa || item.id)}>
          <Text style={styles.txtLixeira}>🗑️</Text>
        </TouchableOpacity>
      </View>
      {item.descricao && <Text style={styles.desc}>{item.descricao}</Text>}
      {item.data_limite && <Text style={styles.data}>⏱️ Vencimento: {item.data_limite}</Text>}
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnNovo} onPress={() => navigation.navigate('FormTarefa')}>
        <Text style={styles.txtBtnNovo}>+ Nova Tarefa</Text>
      </TouchableOpacity>

      {carregando ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={tarefas}
          keyExtractor={(item, index) => String(item.id_tarefa || item.id || index)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); carregarTarefas(); }} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📝</Text>
              <Text style={styles.emptyTitle}>Nenhuma tarefa pendente</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  btnNovo: { backgroundColor: colors.primary, margin: 16, marginBottom: 8, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  txtBtnNovo: { color: colors.white, fontWeight: '800', fontSize: 14 },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  titulo: { fontSize: 15, fontWeight: '800', color: colors.primary, flex: 1 },
  txtLixeira: { fontSize: 16, marginLeft: 10 },
  desc: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
  data: { fontSize: 11, fontWeight: '700', color: colors.secondary, marginTop: 8 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary }
});