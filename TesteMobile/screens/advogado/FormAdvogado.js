import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator, View } from 'react-native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function FormAdvogado({ navigation }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oab, setOab] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function salvar() {
    if (!nome.trim() || !email.trim() || !oab.trim() || !senha.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
      return;
    }

    try {
      setCarregando(true);
      const response = await api.post('/advogado/cadastro', {
        nome_advogado: nome,
        email_advogado: email.trim().toLowerCase(),
        registro_oab: oab,
        senha_advogado: senha,
      });

      Alert.alert('Sucesso', response.data?.message || 'Advogado cadastrado com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.error || err.response?.data?.message || 'Não foi possível cadastrar o advogado.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.label}>NOME DO ADVOGADO *</Text>
        <TextInput style={styles.input} placeholder="Dr. Carlos Eduardo" placeholderTextColor={colors.textSecondary} value={nome} onChangeText={setNome} />

        <Text style={styles.label}>REGISTRO OAB *</Text>
        <TextInput style={styles.input} placeholder="123456/SP" placeholderTextColor={colors.textSecondary} value={oab} onChangeText={setOab} />

        <Text style={styles.label}>E-MAIL DE ACESSO *</Text>
        <TextInput style={styles.input} placeholder="carlos@advocacia.com" placeholderTextColor={colors.textSecondary} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" />

        <Text style={styles.label}>SENHA *</Text>
        <TextInput style={styles.input} placeholder="••••••••" placeholderTextColor={colors.textSecondary} secureTextEntry value={senha} onChangeText={setSenha} />

        <TouchableOpacity style={styles.botao} onPress={salvar} disabled={carregando}>
          {carregando ? <ActivityIndicator color={colors.white} /> : <Text style={styles.txtBotao}>Cadastrar Advogado</Text>}
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