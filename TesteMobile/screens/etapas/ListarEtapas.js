import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function ListarEtapas({ navigation }) {
  const [etapas, setEtapas] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const carregarEtapas = useCallback(async () => {
    try {
      const res = await api.get('/etapas');
      const dados = Array.isArray(res.data) ? res.data : (res.data.etapas || []);
      setEtapas(dados);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao carregar etapas.');
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregarEtapas(); }, [carregarEtapas]));

  async function deletarEtapa(id) {
    Alert.alert('Excluir Etapa', 'Tem certeza que deseja excluir esta etapa?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/etapas/${id}`);
            carregarEtapas();
          } catch (err) {
            Alert.alert('Erro', 'Não foi possível excluir.');
          }
        }
      }
    ]);
  }

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.nome}>{item.nome_etapa || item.titulo}</Text>
        <TouchableOpacity onPress={() => deletarEtapa(item.id_etapa || item.id)}>
          <Text style={styles.txtLixeira}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.desc}>{item.descricao_etapa || item.descricao || 'Sem descrição.'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnNovo} onPress={() => navigation.navigate('FormEtapa')}>
        <Text style={styles.txtBtnNovo}>+ Cadastrar Etapa</Text>
      </TouchableOpacity>

      {carregando ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={etapas}
          keyExtractor={(item, index) => String(item.id_etapa || item.id || index)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); carregarEtapas(); }} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📌</Text>
              <Text style={styles.emptyTitle}>Nenhuma etapa cadastrada</Text>
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
  nome: { fontSize: 15, fontWeight: '800', color: colors.primary, flex: 1 },
  txtLixeira: { fontSize: 16, marginLeft: 10 },
  desc: { fontSize: 13, color: colors.textSecondary, marginTop: 6 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary }
});