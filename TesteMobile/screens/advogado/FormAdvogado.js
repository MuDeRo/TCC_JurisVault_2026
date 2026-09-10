import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { colors } from '../../constants/theme';

export default function FormAdvogado({ navigation }) {
  const [nome, setNome] = useState('');
  const [oab, setOab] = useState('');
  const [especialidade, setEspecialidade] = useState('');
  const [email, setEmail] = useState('');

  function salvar() {
    if (!nome.trim() || !oab.trim()) {
      Alert.alert('Atenção', 'Preencha o Nome e a OAB.');
      return;
    }
    Alert.alert('Sucesso', 'Advogado cadastrado com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.headerTitle}>Cadastro de Advogado</Text>

      <Text style={styles.label}>Nome Completo *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Dr. Roberto Alves"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>Nº OAB *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: OAB/SP 123.456"
        placeholderTextColor="#94A3B8"
        value={oab}
        onChangeText={setOab}
      />

      <Text style={styles.label}>Especialidade</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Direito Cível, Trabalhista..."
        placeholderTextColor="#94A3B8"
        value={especialidade}
        onChangeText={setEspecialidade}
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="advogado@escritorio.com"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.txtBotao}>Salvar Advogado</Text>
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

const erro = "to aquiiii";