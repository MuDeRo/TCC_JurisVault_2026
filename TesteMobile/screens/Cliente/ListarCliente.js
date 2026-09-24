import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function ListarCliente({ navigation }) {
  const [clientes, setClientes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const buscarClientes = useCallback(async () => {
    try {
      const response = await api.get('/clientes');
      const dados = Array.isArray(response.data) ? response.data : (response.data.clientes || []);
      setClientes(dados);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao carregar clientes.');
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { buscarClientes(); }, [buscarClientes]));

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.card} activeOpacity={0.8} onPress={() => navigation.navigate('FormCliente', { cliente: item })}>
      <View style={styles.headerCard}>
        <Text style={styles.nomeText}>{item.nome || item.nome_cliente}</Text>
        <Text style={styles.docText}>{item.cpf_cnpj || item.cpf || 'Sem documento'}</Text>
      </View>
      <View style={styles.divider} />
      <Text style={styles.infoText}>📞 {item.telefone || 'Telefone não informado'}</Text>
      <Text style={styles.infoText}>✉️ {item.email || 'E-mail não informado'}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnNovo} onPress={() => navigation.navigate('FormCliente')}>
        <Text style={styles.txtBtnNovo}>+ Cadastrar Novo Cliente</Text>
      </TouchableOpacity>

      {carregando ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={clientes}
          keyExtractor={(item, index) => String(item.id_cliente || item.id || index)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); buscarClientes(); }} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>👥</Text>
              <Text style={styles.emptyTitle}>Nenhum cliente cadastrado</Text>
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
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 18, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nomeText: { fontSize: 16, fontWeight: '800', color: colors.primary, flex: 1 },
  docText: { fontSize: 12, fontWeight: '700', color: colors.secondary },
  divider: { height: 1, backgroundColor: colors.border, opacity: 0.5, marginVertical: 10 },
  infoText: { fontSize: 13, color: colors.textPrimary, marginBottom: 4 },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary }
});