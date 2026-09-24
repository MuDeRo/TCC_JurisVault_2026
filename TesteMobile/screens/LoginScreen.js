import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import api from '../services/api';
import { colors } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [carregando, setCarregando] = useState(false);
  const [exibirSenha, setExibirSenha] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oab, setOab] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  async function handleAuth() {
    const emailTratado = email.trim().toLowerCase();

    if (modoCadastro) {
      if (!nome.trim() || !emailTratado || !senha.trim() || !oab.trim()) {
        Alert.alert('Atenção', 'Preencha todos os campos obrigatórios (*).');
        return;
      }
      if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
      }

      try {
        setCarregando(true);
        const response = await api.post('/advogado/cadastro', {
          nome_advogado: nome,
          email_advogado: emailTratado,
          registro_oab: oab,
          senha_advogado: senha,
        });

        Alert.alert('Sucesso', response.data.message || 'Cadastro realizado com sucesso!', [
          { text: 'Ir para Login', onPress: () => setModoCadastro(false) }
        ]);
      } catch (err) {
        const mensagemErro = err.response?.data?.error || err.response?.data?.message || err.message;
        Alert.alert('Erro no Cadastro', mensagemErro);
      } finally {
        setCarregando(false);
      }
    } else {
      if (!emailTratado || !senha.trim()) {
        Alert.alert('Atenção', 'Informe e-mail e senha.');
        return;
      }

      try {
        setCarregando(true);
        const response = await api.post('/auth/login/advogado', {
          email: emailTratado,
          senha: senha,
        });

        navigation.navigate('Dashboard');
      } catch (err) {
        const mensagemErro = err.response?.data?.error || err.response?.data?.message || err.message;
        Alert.alert('Acesso Negado', mensagemErro);
      } finally {
        setCarregando(false);
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.logoIcon}>⚖️</Text>
          <Text style={styles.tituloApp}>JURISVAULT</Text>
          <Text style={styles.subtituloApp}>Gestão Jurídica de Luxo</Text>
        </View>

        {/* Card Principal */}
        <View style={styles.card}>
          
          {/* Alternador de Abas */}
          <View style={styles.tabContainer}>
            <TouchableOpacity 
              style={[styles.tabButton, !modoCadastro && styles.tabButtonAtiva]} 
              onPress={() => setModoCadastro(false)}
            >
              <Text style={[styles.tabText, !modoCadastro && styles.tabTextAtivo]}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.tabButton, modoCadastro && styles.tabButtonAtiva]} 
              onPress={() => setModoCadastro(true)}
            >
              <Text style={[styles.tabText, modoCadastro && styles.tabTextAtivo]}>Criar Conta</Text>
            </TouchableOpacity>
          </View>

          {/* Campos Dinâmicos */}
          {modoCadastro && (
            <>
              <Text style={styles.label}>NOME DO ADVOGADO *</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Dr. Roberto Silva" 
                placeholderTextColor={colors.textSecondary} 
                value={nome} 
                onChangeText={setNome} 
              />

              <Text style={styles.label}>REGISTRO OAB *</Text>
              <TextInput 
                style={styles.input} 
                placeholder="123456" 
                placeholderTextColor={colors.textSecondary} 
                value={oab} 
                onChangeText={setOab} 
              />
            </>
          )}

          <Text style={styles.label}>E-MAIL *</Text>
          <TextInput 
            style={styles.input} 
            placeholder="advogado@gmail.com" 
            placeholderTextColor={colors.textSecondary}
            value={email} 
            onChangeText={setEmail} 
            keyboardType="email-address" 
            autoCapitalize="none" 
          />

          <Text style={styles.label}>SENHA *</Text>
          <View style={styles.inputSenhaContainer}>
            <TextInput 
              style={styles.inputSenha} 
              placeholder="••••••••" 
              placeholderTextColor={colors.textSecondary}
              secureTextEntry={!exibirSenha} 
              value={senha} 
              onChangeText={setSenha} 
            />
            <TouchableOpacity onPress={() => setExibirSenha(!exibirSenha)} style={styles.iconeOlho}>
              <Text style={{ fontSize: 16 }}>{exibirSenha ? '👁️' : '👁️‍🗨️'}</Text>
            </TouchableOpacity>
          </View>

          {modoCadastro && (
            <>
              <Text style={styles.label}>CONFIRMAR SENHA *</Text>
              <TextInput 
                style={styles.input} 
                placeholder="••••••••" 
                placeholderTextColor={colors.textSecondary}
                secureTextEntry={!exibirSenha} 
                value={confirmarSenha} 
                onChangeText={setConfirmarSenha} 
              />
            </>
          )}

          {!modoCadastro && (
            <TouchableOpacity style={styles.esqueceuSenhaBtn}>
              <Text style={styles.esqueceuSenhaTxt}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          )}

          {/* Botão Principal */}
          <TouchableOpacity style={styles.botaoPrincipal} onPress={handleAuth} disabled={carregando}>
            {carregando ? (
              <ActivityIndicator color={colors.white} />
            ) : (
              <Text style={styles.textoBotao}>{modoCadastro ? 'Cadastrar Advogado' : 'Entrar no Painel'}</Text>
            )}
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', padding: 20 },
  header: { alignItems: 'center', marginBottom: 24 },
  logoIcon: { fontSize: 48, marginBottom: 8 },
  tituloApp: { fontSize: 26, fontWeight: '900', color: colors.primary, letterSpacing: 2 },
  subtituloApp: { fontSize: 12, color: colors.textSecondary, marginTop: 4, letterSpacing: 1 },
  
  card: { 
    backgroundColor: colors.cardBackground, 
    borderRadius: 20, 
    padding: 24, 
    borderWidth: 1, 
    borderColor: colors.border,
    elevation: 4,
    shadowColor: colors.midnightNavy,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  
  tabContainer: { 
    flexDirection: 'row', 
    backgroundColor: colors.background, 
    borderRadius: 12, 
    padding: 4, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: colors.border 
  },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: 'center', borderRadius: 8 },
  tabButtonAtiva: { backgroundColor: colors.primary },
  tabText: { fontWeight: '700', fontSize: 13, color: colors.textSecondary },
  tabTextAtivo: { color: colors.white },
  
  label: { fontSize: 11, fontWeight: '800', color: colors.textPrimary, marginBottom: 6, letterSpacing: 0.5 },
  input: { 
    backgroundColor: colors.white, 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 10, 
    paddingHorizontal: 14, 
    paddingVertical: 12, 
    marginBottom: 14,
    color: colors.textPrimary,
    fontSize: 14
  },
  
  inputSenhaContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    backgroundColor: colors.white, 
    borderWidth: 1, 
    borderColor: colors.border, 
    borderRadius: 10, 
    marginBottom: 14 
  },
  inputSenha: { flex: 1, paddingHorizontal: 14, paddingVertical: 12, color: colors.textPrimary, fontSize: 14 },
  iconeOlho: { paddingHorizontal: 12 },
  
  esqueceuSenhaBtn: { alignSelf: 'flex-end', marginBottom: 18 },
  esqueceuSenhaTxt: { color: colors.secondary, fontSize: 12, fontWeight: '700' },
  
  botaoPrincipal: { 
    backgroundColor: colors.primary, 
    paddingVertical: 14, 
    borderRadius: 12, 
    alignItems: 'center', 
    marginTop: 4,
  },
  textoBotao: { color: colors.white, fontWeight: '800', fontSize: 15 }
});