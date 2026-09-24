import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import api from '../../services/api';
import { colors } from '../../constants/theme';

export default function PerfilAdvogadoScreen() {
  const [advogadoId, setAdvogadoId] = useState(null);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oab, setOab] = useState('');
  const [senha, setSenha] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    carregarPerfil();
  }, []);

  async function carregarPerfil() {
    try {
      setCarregando(true);
      const res = await api.get('/advogado/perfil');
      const dados = res.data.advogado || res.data;
      setAdvogadoId(dados.id_advogado || dados.id);
      setNome(dados.nome_advogado || dados.nome || '');
      setEmail(dados.email_advogado || dados.email || '');
      setOab(dados.registro_oab || dados.oab || '');
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Erro ao carregar dados do perfil.');
    } finally {
      setCarregando(false);
    }
  }

  async function salvarPerfil() {
    if (!nome.trim() || !email.trim() || !oab.trim()) {
      Alert.alert('Atenção', 'Nome, e-mail e OAB são obrigatórios.');
      return;
    }

    try {
      setSalvando(true);
      const payload = {
        nome_advogado: nome,
        email_advogado: email,
        registro_oab: oab,
      };
      if (senha.trim()) {
        payload.senha_advogado = senha;
      }

      await api.put(`/advogado/atualizar/${advogadoId}`, payload);
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      setSenha('');
    } catch (err) {
      Alert.alert('Erro', err.response?.data?.message || 'Falha ao atualizar perfil.');
    } finally {
      setSalvando(false);
    }
  }

  if (carregando) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Meu Perfil Profissional</Text>
        <Text style={styles.sub}>Mantenha seus dados de contato e OAB atualizados</Text>

        <Text style={styles.label}>NOME COMPLETO</Text>
        <TextInput style={styles.input} value={nome} onChangeText={setNome} placeholderTextColor={colors.textSecondary} />

        <Text style={styles.label}>REGISTRO OAB</Text>
        <TextInput style={styles.input} value={oab} onChangeText={setOab} placeholderTextColor={colors.textSecondary} />

        <Text style={styles.label}>E-MAIL DE CADASTRO</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} keyboardType="email-address" autoCapitalize="none" placeholderTextColor={colors.textSecondary} />

        <Text style={styles.label}>NOVA SENHA (OPCIONAL)</Text>
        <TextInput style={styles.input} value={senha} onChangeText={setSenha} secureTextEntry placeholder="Deixe em branco para manter a atual" placeholderTextColor={colors.textSecondary} />

        <TouchableOpacity style={styles.btnSalvar} onPress={salvarPerfil} disabled={salvando}>
          {salvando ? <ActivityIndicator color={colors.white} /> : <Text style={styles.txtBtn}>Atualizar Perfil</Text>}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
//
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.border },
  titulo: { fontSize: 18, fontWeight: '900', color: colors.primary },
  sub: { fontSize: 12, color: colors.textSecondary, marginBottom: 18 },
  label: { fontSize: 11, fontWeight: '800', color: colors.textPrimary, marginBottom: 6 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 14, color: colors.textPrimary },
  btnSalvar: { backgroundColor: colors.primary, paddingVertical: 14, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  txtBtn: { color: colors.white, fontWeight: '800', fontSize: 15 }
});