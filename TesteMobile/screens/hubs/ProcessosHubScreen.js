import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../../constants/theme';

export default function ProcessosHubScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.subtitulo}>MÓDULO DE PROCESSOS</Text>

      <TouchableOpacity style={styles.cardOpcao} onPress={() => navigation.navigate('ListarProcesso')}>
        <Text style={styles.icon}>📁</Text>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Gestão de Processos</Text>
          <Text style={styles.desc}>Listar e cadastrar processos judiciais</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardOpcao} onPress={() => navigation.navigate('ListarEtapas')}>
        <Text style={styles.icon}>📌</Text>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Etapas Processuais</Text>
          <Text style={styles.desc}>Fases, petições e andamentos</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.cardOpcao} onPress={() => navigation.navigate('ListarAtribuicoes')}>
        <Text style={styles.icon}>📍</Text>
        <View style={styles.textos}>
          <Text style={styles.titulo}>Locais e Diligências</Text>
          <Text style={styles.desc}>Endereços e advogados vinculados</Text>
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