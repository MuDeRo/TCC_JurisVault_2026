import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../constants/theme';

export default function PessoasHubScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.subtitulo}>MÓDULO DE GESTÃO DE PESSOAS</Text>

      <TouchableOpacity style={styles.cardOpcao} onPress={() => navigation.navigate('ListarCliente')}>
        <Text style={styles.icon}>👥</Text>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Gestão de Clientes</Text>
          <Text style={styles.desc}>Cadastro e consulta de clientes</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardOpcao} onPress={() => navigation.navigate('ListarAdvogado')}>
        <Text style={styles.icon}>🏛️</Text>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Corpo Jurídico</Text>
          <Text style={styles.desc}>Advogados cadastrados e OAB</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardOpcao} onPress={() => navigation.navigate('AprovacaoAdvogados')}>
        <Text style={styles.icon}>🛡️</Text>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Painel do Administrador</Text>
          <Text style={styles.desc}>Aprovação e liberação de acessos</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  subtitulo: { fontSize: 11, fontWeight: '800', color: colors.secondary, marginBottom: 16, letterSpacing: 1 },
  cardOpcao: { flexDirection: 'row', alignItems: 'center', backgroundColor: colors.cardBackground, padding: 18, borderRadius: 16, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  icon: { fontSize: 26, marginRight: 14 },
  textos: { flex: 1 },
  titulo: { fontSize: 16, fontWeight: '800', color: colors.primary },
  desc: { fontSize: 12, color: colors.textSecondary, marginTop: 2 }
});