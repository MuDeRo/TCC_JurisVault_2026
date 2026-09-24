import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function ListarAdvogado({ navigation }) {
  const [advogados, setAdvogados] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const buscarAdvogados = useCallback(async () => {
    try {
      const response = await api.get('/advogado');
      const dados = Array.isArray(response.data) ? response.data : (response.data.advogados || []);
      setAdvogados(dados);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao carregar advogados.');
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { buscarAdvogados(); }, [buscarAdvogados]));

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.headerCard}>
        <Text style={styles.nomeText}>{item.nome_advogado || item.nome}</Text>
        <View style={styles.badgeOab}>
          <Text style={styles.oabText}>OAB: {item.registro_oab || item.oab}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <Text style={styles.infoText}>✉️ {item.email_advogado || item.email}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.btnNovo} onPress={() => navigation.navigate('FormAdvogado')}>
        <Text style={styles.txtBtnNovo}>+ Cadastrar Novo Advogado</Text>
      </TouchableOpacity>

      {carregando ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={advogados}
          keyExtractor={(item, index) => String(item.id_advogado || item.id || index)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); buscarAdvogados(); }} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>⚖️</Text>
              <Text style={styles.emptyTitle}>Nenhum advogado cadastrado</Text>
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
  badgeOab: { backgroundColor: colors.background, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6, borderWidth: 1, borderColor: colors.border },
  oabText: { fontSize: 11, fontWeight: '800', color: colors.secondary },
  divider: { height: 1, backgroundColor: colors.border, opacity: 0.5, marginVertical: 10 },
  infoText: { fontSize: 13, color: colors.textPrimary },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary }
});