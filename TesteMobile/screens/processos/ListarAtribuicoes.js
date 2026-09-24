import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
  Alert
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function ListarAtribuicoes({ navigation }) {
  const [atribuicoes, setAtribuicoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const buscarAtribuicoes = useCallback(async () => {
    try {
      const response = await api.get('/advogadosCasos');
      // Trata a estrutura { message: "...", data: [...] } retornada pela sua API
      const dados = response.data.data || response.data || [];
      setAtribuicoes(dados);
    } catch (err) {
      const mensagemErro = err.response?.data?.message || err.response?.data?.error || 'Erro ao carregar locais.';
      Alert.alert('Erro', mensagemErro);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      buscarAtribuicoes();
    }, [buscarAtribuicoes])
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.tituloCaso}>Caso ID: #{item.id_caso_fk}</Text>
        <View style={styles.badgeAdvogado}>
          <Text style={styles.txtAdvogado}>Adv. ID #{item.id_advogado_fk}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.label}>LOCAL DO FATO / DILIGÊNCIA</Text>
      <Text style={styles.ruaText}>📍 {item.rua_caso || 'Endereço não informado'}</Text>
      <Text style={styles.cepText}>📮 CEP: {item.cep_caso || 'N/I'}</Text>
    </View>
  );

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando vinculações...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={atribuicoes}
        keyExtractor={(item, index) => String(item.id || index)}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => { setRefreshing(true); buscarAtribuicoes(); }}
            colors={[colors.primary]}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📍</Text>
            <Text style={styles.emptyTitle}>Nenhuma diligência registrada</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  loadingContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  loadingText: { marginTop: 12, fontSize: 14, color: colors.textSecondary, fontWeight: '600' },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 18,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  tituloCaso: { fontSize: 15, fontWeight: '800', color: colors.primary },
  badgeAdvogado: { backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  txtAdvogado: { fontSize: 11, fontWeight: '800', color: colors.secondary },
  divider: { height: 1, backgroundColor: colors.border, opacity: 0.5, marginVertical: 10 },
  label: { fontSize: 10, fontWeight: '800', color: colors.textSecondary, marginBottom: 4, letterSpacing: 0.5 },
  ruaText: { fontSize: 14, fontWeight: '700', color: colors.textPrimary, marginBottom: 4 },
  cepText: { fontSize: 12, fontWeight: '600', color: colors.textSecondary },
  emptyContainer: { alignItems: 'center', paddingVertical: 60 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary },
});