import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Alert, RefreshControl, TextInput } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function ListarArquivosScreen() {
  const [arquivos, setArquivos] = useState([]);
  const [nomeArquivo, setNomeArquivo] = useState('');
  const [caminho, setCaminho] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [enviando, setEnviando] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const carregarArquivos = useCallback(async () => {
    try {
      const res = await api.get('/arquivos');
      const dados = Array.isArray(res.data) ? res.data : (res.data.arquivos || []);
      setArquivos(dados);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao carregar arquivos.');
    } finally {
      setCarregando(false);
      setRefreshing(false);
    }
  }, []);

  useFocusEffect(useCallback(() => { carregarArquivos(); }, [carregarArquivos]));

  async function cadastrarArquivo() {
    if (!nomeArquivo.trim() || !caminho.trim()) {
      Alert.alert('Atenção', 'Informe o nome e o link/caminho do arquivo.');
      return;
    }

    try {
      setEnviando(true);
      await api.post('/arquivos', {
        nome_arquivo: nomeArquivo,
        caminho_arquivo: caminho
      });

      setNomeArquivo('');
      setCaminho('');
      Alert.alert('Sucesso', 'Anexo registrado com sucesso!');
      carregarArquivos();
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao registrar anexo.');
    } finally {
      setEnviando(false);
    }
  }

  async function deletarArquivo(id) {
    Alert.alert('Excluir Anexo', 'Deseja remover este registro?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          try {
            await api.delete(`/arquivos/${id}`);
            carregarArquivos();
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
        <Text style={styles.nome}>📄 {item.nome_arquivo || item.nome}</Text>
        <TouchableOpacity onPress={() => deletarArquivo(item.id_arquivo || item.id)}>
          <Text style={styles.txtLixeira}>🗑️</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.caminho}>🔗 {item.caminho_arquivo || item.url || 'Caminho não disponível'}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.formCard}>
        <Text style={styles.formTitulo}>REGISTRAR NOVO ANEXO</Text>
        <TextInput style={styles.input} value={nomeArquivo} onChangeText={setNomeArquivo} placeholder="Nome do arquivo (ex: Peticao_Final.pdf)" placeholderTextColor={colors.textSecondary} />
        <TextInput style={styles.input} value={caminho} onChangeText={setCaminho} placeholder="URL ou Caminho no servidor" placeholderTextColor={colors.textSecondary} autoCapitalize="none" />
        
        <TouchableOpacity style={styles.btnEnviar} onPress={cadastrarArquivo} disabled={enviando}>
          {enviando ? <ActivityIndicator color={colors.white} /> : <Text style={styles.txtBtn}>+ Cadastrar Anexo</Text>}
        </TouchableOpacity>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color={colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={arquivos}
          keyExtractor={(item, index) => String(item.id_arquivo || item.id || index)}
          renderItem={renderItem}
          contentContainerStyle={{ padding: 16 }}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => { setRefreshing(true); carregarArquivos(); }} colors={[colors.primary]} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyIcon}>📂</Text>
              <Text style={styles.emptyTitle}>Nenhum arquivo anexo cadastrado</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  formCard: { backgroundColor: colors.cardBackground, margin: 16, padding: 16, borderRadius: 16, borderWidth: 1, borderColor: colors.border },
  formTitulo: { fontSize: 11, fontWeight: '800', color: colors.primary, marginBottom: 10, letterSpacing: 0.5 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 10, marginBottom: 10, fontSize: 13, color: colors.textPrimary },
  btnEnviar: { backgroundColor: colors.primary, paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  txtBtn: { color: colors.white, fontWeight: '800', fontSize: 13 },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  headerCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  nome: { fontSize: 14, fontWeight: '800', color: colors.primary, flex: 1 },
  txtLixeira: { fontSize: 16, marginLeft: 10 },
  caminho: { fontSize: 12, color: colors.textSecondary, marginTop: 6 },
  emptyContainer: { alignItems: 'center', paddingVertical: 40 },
  emptyIcon: { fontSize: 48, marginBottom: 12 },
  emptyTitle: { fontSize: 16, fontWeight: '800', color: colors.textPrimary }
});