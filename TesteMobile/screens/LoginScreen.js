import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { colors } from '../constants/theme';

export default function LoginScreen({ navigation }) {
  const [modoCadastro, setModoCadastro] = useState(false);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [oab, setOab] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);

  function handleAuth() {
    if (modoCadastro) {
      if (!nome.trim() || !email.trim() || !senha.trim()) {
        Alert.alert('Atenção', 'Preencha todos os campos obrigatórios.');
        return;
      }
      if (senha !== confirmarSenha) {
        Alert.alert('Erro', 'As senhas não coincidem.');
        return;
      }
      Alert.alert('Sucesso', 'Conta criada com sucesso!', [
        { text: 'OK', onPress: () => navigation.navigate('Dashboard') }
      ]);
    } else {
      if (!email.trim() || !senha.trim()) {
        Alert.alert('Atenção', 'Informe seu e-mail e senha.');
        return;
      }
      navigation.navigate('Dashboard');
    }
  }

  function handleEsqueciSenha() {
    Alert.alert(
      'Redefinir Senha',
      'Um link de recuperação será enviado para o seu e-mail cadastrado.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Enviar', onPress: () => Alert.alert('E-mail enviado!') }
      ]
    );
  }

  return (
    <KeyboardAvoidingView 
      style={styles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho */}
        <View style={styles.header}>
          <Text style={styles.logoIcon}>⚖️</Text>
          <Text style={styles.tituloApp}>JURIS MOBILE</Text>
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

          {modoCadastro && (
            <>
              <Text style={styles.label}>Nome Completo *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Dr. Roberto Alves"
                placeholderTextColor="#94A3B8"
                value={nome}
                onChangeText={setNome}
              />

              <Text style={styles.label}>Nº OAB / CPF</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: OAB/SP 123.456"
                placeholderTextColor="#94A3B8"
                value={oab}
                onChangeText={setOab}
              />
            </>
          )}

          <Text style={styles.label}>E-mail *</Text>
          <TextInput
            style={styles.input}
            placeholder="advogado@escritorio.com"
            placeholderTextColor="#94A3B8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text style={styles.label}>Senha *</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.inputSenha}
              placeholder="••••••••"
              placeholderTextColor="#94A3B8"
              secureTextEntry={!exibirSenha}
              value={senha}
              onChangeText={setSenha}
            />
            <TouchableOpacity onPress={() => setExibirSenha(!exibirSenha)} style={styles.eyeButton}>
              <Text style={styles.eyeIcon}>{exibirSenha ? '👁️' : '🙈'}</Text>
            </TouchableOpacity>
          </View>

          {modoCadastro && (
            <>
              <Text style={styles.label}>Confirmar Senha *</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#94A3B8"
                secureTextEntry={!exibirSenha}
                value={confirmarSenha}
                onChangeText={setConfirmarSenha}
              />
            </>
          )}

          {!modoCadastro && (
            <TouchableOpacity style={styles.esqueciSenhaBtn} onPress={handleEsqueciSenha}>
              <Text style={styles.esqueciSenhaTexto}>Esqueceu a senha?</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity style={styles.botaoPrincipal} onPress={handleAuth}>
            <Text style={styles.textoBotaoPrincipal}>
              {modoCadastro ? 'Finalizar Cadastro' : 'Entrar no Painel'}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.footerTexto}>Versão 1.0.0 • Sapphire Lounge Edition</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.midnightNavy, // #102542
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },
  logoIcon: {
    fontSize: 44,
    marginBottom: 6,
  },
  tituloApp: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.champagne, // #D8C3A5
    letterSpacing: 2,
  },
  subtituloApp: {
    fontSize: 12,
    color: colors.ivory, // #FAF8F5
    marginTop: 4,
    letterSpacing: 1,
  },
  card: {
    backgroundColor: colors.ivory, // #FAF8F5
    borderRadius: 20,
    padding: 24,
    borderWidth: 1,
    borderColor: colors.champagne,
    elevation: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#EBE3D5',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  tabButtonAtiva: {
    backgroundColor: colors.midnightNavy,
  },
  tabText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: colors.midnightNavy,
  },
  tabTextAtivo: {
    color: colors.champagne,
  },
  label: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.midnightNavy,
    marginBottom: 6,
    textTransform: 'uppercase',
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.champagne,
    borderRadius: 10,
    padding: 12,
    marginBottom: 14,
    fontSize: 14,
    color: colors.midnightNavy,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.champagne,
    borderRadius: 10,
    marginBottom: 14,
  },
  inputSenha: {
    flex: 1,
    padding: 12,
    fontSize: 14,
    color: colors.midnightNavy,
  },
  eyeButton: {
    paddingHorizontal: 12,
  },
  eyeIcon: {
    fontSize: 16,
  },
  esqueciSenhaBtn: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  esqueciSenhaTexto: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.brass, // #C79C5A
  },
  botaoPrincipal: {
    backgroundColor: colors.sapphire, // #1E3A5F
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.brass,
  },
  textoBotaoPrincipal: {
    color: colors.ivory,
    fontWeight: 'bold',
    fontSize: 15,
  },
  footerTexto: {
    textAlign: 'center',
    color: colors.champagne,
    fontSize: 11,
    marginTop: 20,
  },
});