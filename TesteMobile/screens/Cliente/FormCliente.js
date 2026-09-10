import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { colors } from '../../constants/theme';

export default function FormCliente({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  function salvar() {
    if (!nome.trim() || !cpf.trim()) {
      Alert.alert('Atenção', 'Preencha o Nome e o CPF/CNPJ.');
      return;
    }
    Alert.alert('Sucesso', 'Cliente cadastrado com sucesso!', [
      { text: 'OK', onPress: () => navigation.goBack() }
    ]);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.headerTitle}>Cadastro de Cliente</Text>

      <Text style={styles.label}>Nome Completo / Razão Social *</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: Carlos Eduardo Silva"
        placeholderTextColor="#94A3B8"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={styles.label}>CPF ou CNPJ *</Text>
      <TextInput
        style={styles.input}
        placeholder="000.000.000-00"
        placeholderTextColor="#94A3B8"
        value={cpf}
        onChangeText={setCpf}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Telefone / WhatsApp</Text>
      <TextInput
        style={styles.input}
        placeholder="(00) 00000-0000"
        placeholderTextColor="#94A3B8"
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <Text style={styles.label}>E-mail</Text>
      <TextInput
        style={styles.input}
        placeholder="cliente@email.com"
        placeholderTextColor="#94A3B8"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TouchableOpacity style={styles.botao} onPress={salvar}>
        <Text style={styles.txtBotao}>Salvar Cliente</Text>
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