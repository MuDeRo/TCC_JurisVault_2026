import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { colors } from '../../constants/theme';

export default function FormProcesso({ navigation }) {
  const [numero, setNumero] = useState('');
  const [cliente, setCliente] = useState('');
  const [tipo, setTipo] = useState('');
  const [vara, setVara] = useState('');

  function salvar() {
    if (!numero.trim() || !cliente.trim()) {
      Alert.alert('Atenção', 'Informe o Nº do Processo e o Cliente.');
      return;
    }
    Alert.alert('Sucesso', 'Processo cadastrado com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.headerTitle}>Cadastro de Processo</Text>

      <Text style={styles.label}>Nº do Processo (CNJ) *</Text>
      <TextInput
        style={styles.input}
        placeholder="0000000-00.0000.0.00.0000"
        placeholderTextColor="#94A3B8"
        value={numero}
        onChangeText={setNumero}
      />

      <Text style={styles.label}>Cliente *</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome do cliente cadastrado"
        placeholderTextColor="#94A3B8"
        value={cliente}
        onChangeText={setCliente}
      />

      <Text style={styles.label}>Tipo de Ação</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Trabalhista, Cível, Família..."
        placeholderTextColor="#94A3B8"
        value={tipo}
        onChangeText={setTipo}
      />

      <Text style={styles.label}>Vara / Comarca</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 2ª Vara Cível da Comarca X"
        placeholderTextColor="#94A3B8"
        value={vara}
        onChangeText={setVara}
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.txtBotao}>Salvar Processo</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.midnightNavy, marginBottom: 20 },
  label: { fontSize: 12, fontWeight: '700', color: colors.midnightNavy, marginBottom: 6, textTransform: 'uppercase' },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 14, color: colors.textPrimary },
  botao: { backgroundColor: colors.sapphire, paddingVertical: 14, borderRadius: 10, alignItems: 'center', marginTop: 10, borderWidth: 1, borderColor: colors.brass },
  txtBotao: { color: colors.ivory, fontWeight: 'bold', fontSize: 15 },
});
//comentario aleatorio