import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function FormTarefa({ navigation }) {
  const [titulo, setTitulo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function salvar() {
    if (!titulo.trim()) {
      Alert.alert('Atenção', 'Informe o título da tarefa.');
      return;
    }

    try {
      setCarregando(true);
      await api.post('/tarefas', {
        titulo,
        descricao,
      });

      Alert.alert('Sucesso', 'Tarefa cadastrada!', [{ text: 'OK', onPress: () => navigation.goBack() }]);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Falha ao cadastrar tarefa.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.label}>TÍTULO DA TAREFA *</Text>
        <TextInput style={styles.input} value={titulo} onChangeText={setTitulo} placeholder="Ex: Elaborar Petição Inicial" placeholderTextColor={colors.textSecondary} />

        <Text style={styles.label}>DESCRIÇÃO / DETALHES</Text>
        <TextInput style={[styles.input, { height: 90 }]} value={descricao} onChangeText={setDescricao} multiline placeholder="Observações e instruções..." placeholderTextColor={colors.textSecondary} />

        <TouchableOpacity style={styles.btnSalvar} onPress={salvar} disabled={carregando}>
          {carregando ? <ActivityIndicator color={colors.white} /> : <Text style={styles.txtBtn}>Salvar Tarefa</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.border },
  label: { fontSize: 11, fontWeight: '800', color: colors.textPrimary, marginBottom: 6 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 14, color: colors.textPrimary },
  btnSalvar: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  txtBtn: { color: colors.white, fontWeight: '800', fontSize: 15 }
});