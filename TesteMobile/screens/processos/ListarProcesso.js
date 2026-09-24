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

export default function ListarProcesso({ navigation }) {
  const [casos, setCasos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  // Função para buscar os casos do backend
  const buscarCasos = useCallback(async () => {
    try {
      const response = await api.get('/casos');
      
      // Imprime o retorno no Terminal/Console para ajudar no diagnóstico
      console.log('Dados recebidos da API /casos:', response.data);

      // Trata diferentes formatos comuns de resposta do backend
      let dados = [];
      if (Array.isArray(response.data)) {
        dados = response.data;
      } else if (response.data && Array.isArray(response.data.casos)) {
        dados = response.data.casos;
      } else if (response.data && Array.isArray(response.data.data)) {
        dados = response.data.data;
      } else if (response.data && Array.isArray(response.data.processos)) {
        dados = response.data.processos;
      }

      setCasos(dados);
    } catch (err) {
      console.log('Erro ao buscar casos:', err.response?.data || err.message);
      const mensagemErro = err.response?.data?.error || err.response?.data?.message || 'Erro ao conectar ao servidor.';
      Alert.alert('Erro ao carregar', mensagemErro);
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  // Recarrega os dados SEMPRE que a tela recebe foco
  useFocusEffect(
    useCallback(() => {
      buscarCasos();
    }, [buscarCasos])
  );

  const onRefresh = () => {
    setRefreshing(true);
    buscarCasos();
  };

  const renderCasoItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      activeOpacity={0.8}
      onPress={() => navigation.navigate('FormProcesso', { caso: item })}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.cnjText}>
          CNJ: {item.numero_cnj || item.numero_processo || `Caso #${item.id_caso || item.id}`}
        </Text>
        <View style={styles.badgeStatus}>
          <Text style={styles.textStatus}>{item.status || 'Ativo'}</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <Text style={styles.label}>DESCRIÇÃO DO CASO</Text>
      <Text style={styles.descricaoText} numberOfLines={3}>
        {item.descricao_caso || item.descricao || 'Sem descrição informada.'}
      </Text>
    </TouchableOpacity>
  );

  if (carregando) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={styles.loadingText}>Carregando casos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.btnNovo} 
        onPress={() => navigation.navigate('FormProcesso')}
      >
        <Text style={styles.txtBtnNovo}>+ Cadastrar Novo Caso</Text>
      </TouchableOpacity>

      <FlatList
        data={casos}
        keyExtractor={(item, index) => String(item.id_caso || item.id || item.numero_cnj || index)}
        renderItem={renderCasoItem}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]}
            tintColor={colors.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyIcon}>📂</Text>
            <Text style={styles.emptyTitle}>Nenhum caso cadastrado</Text>
            <Text style={styles.emptySubtitle}>Puxe para baixo para atualizar a lista.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  btnNovo: {
    backgroundColor: colors.primary,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  txtBtnNovo: {
    color: colors.white,
    fontWeight: '800',
    fontSize: 14,
  },
  listContainer: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 3,
    shadowColor: colors.midnightNavy,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cnjText: {
    fontSize: 14,
    fontWeight: '800',
    color: colors.primary,
    flex: 1,
    marginRight: 8,
  },
  badgeStatus: {
    backgroundColor: colors.background,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  textStatus: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.secondary,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    opacity: 0.5,
    marginVertical: 12,
  },
  label: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.textSecondary,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  descricaoText: {
    fontSize: 13,
    fontWeight: '500',
    color: colors.textPrimary,
    lineHeight: 18,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 4,
  },
});