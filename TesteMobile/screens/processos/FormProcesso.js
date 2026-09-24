import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import api from '../../services/api';

export default function FormProcesso({ navigation }) {
  const [numeroCnj, setNumeroCnj] = useState('');
  const [descricaoCaso, setDescricaoCaso] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function salvar() {
    if (!numeroCnj.trim() || !descricaoCaso.trim()) {
      Alert.alert('Atenção', 'Informe o Número CNJ e a Descrição do Caso.');
      return;
    }

    try {
      setCarregando(true);
      const response = await api.post('/casos', {
        numero_cnj: numeroCnj,
        descricao_caso: descricaoCaso,
      });

      Alert.alert('Sucesso', response.data.message, [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      const mensagemErro = err.response?.data?.error || 'Não foi possível salvar o caso.';
      Alert.alert('Erro', mensagemErro);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.label}>Número CNJ (20 dígitos) *</Text>
      <TextInput style={styles.input} placeholder="00000002020268260000" value={numeroCnj} onChangeText={setNumeroCnj} maxLength={20} />

      <Text style={styles.label}>Descrição do Caso *</Text>
      <TextInput style={styles.inputArea} placeholder="Resumo do processo judicial..." multiline numberOfLines={4} value={descricaoCaso} onChangeText={setDescricaoCaso} />

      <TouchableOpacity style={styles.botao} onPress={salvar} disabled={carregando}>
        {carregando ? <ActivityIndicator color="#FFF" /> : <Text style={styles.txtBotao}>Salvar Caso</Text>}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  label: { fontSize: 12, fontWeight: 'bold', color: '#0F172A', marginBottom: 6 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginBottom: 14 },
  inputArea: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#CBD5E1', borderRadius: 8, padding: 12, marginBottom: 14, textAlignVertical: 'top' },
  botao: { backgroundColor: '#1E3A8A', paddingVertical: 14, borderRadius: 8, alignItems: 'center' },
  txtBotao: { color: '#FFF', fontWeight: 'bold' }
});