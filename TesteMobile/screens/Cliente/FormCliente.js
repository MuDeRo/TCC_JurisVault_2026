import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, View } from 'react-native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function FormCliente({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpfCnpj, setCpfCnpj] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function salvar() {
    if (!nome.trim() || !cpfCnpj.trim()) {
      Alert.alert('Atenção', 'Informe ao menos o Nome e CPF/CNPJ.');
      return;
    }

    try {
      setCarregando(true);
      const response = await api.post('/clientes', {
        nome,
        cpf_cnpj: cpfCnpj,
        telefone,
        email
      });

      Alert.alert('Sucesso', response.data?.message || 'Cliente cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || err.response?.data?.message || 'Não foi possível salvar o cliente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.label}>NOME COMPLETO *</Text>
        <TextInput style={styles.input} placeholder="Maria de Souza" placeholderTextColor={colors.textSecondary} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>CPF OU CNPJ *</Text>
        <TextInput style={styles.input} placeholder="000.000.000-00" placeholderTextColor={colors.textSecondary} value={cpfCnpj} onChangeText={setCpfCnpj} keyboardType="numeric" />

        <Text style={styles.label}>TELEFONE / WHATSAPP</Text>
        <TextInput style={styles.input} placeholder="(11) 99999-9999" placeholderTextColor={colors.textSecondary} value={telefone} onChangeText={setTelefone} keyboardType="phone-pad" />

        <Text style={styles.label}>E-MAIL</Text>
        <TextInput style={styles.input} placeholder="cliente@email.com" placeholderTextColor={colors.textSecondary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <TouchableOpacity style={styles.botao} onPress={salvar} disabled={carregando}>
          {carregando ? <ActivityIndicator color={colors.white} /> : <Text style={styles.txtBotao}>Salvar Cliente</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.border },
  label: { fontSize: 11, fontWeight: '800', color: colors.textPrimary, marginBottom: 6, letterSpacing: 0.5 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 16, color: colors.textPrimary, fontSize: 14 },
  botao: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  txtBotao: { color: colors.white, fontWeight: '800', fontSize: 15 }
});