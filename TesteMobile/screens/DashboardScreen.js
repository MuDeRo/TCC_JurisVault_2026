import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../constants/theme';

export default function DashboardScreen({ navigation }) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.topSubtitle}>JURIS MOBILE</Text>
      <Text style={styles.headerTitle}>Painel Principal</Text>

      {/* Ferramentas */}
      <Text style={styles.sectionTitle}>Ferramentas Rápida</Text>
      <View style={styles.gridFerramentas}>
        <TouchableOpacity 
          style={styles.cardFerramenta}
          onPress={() => navigation.navigate('Agenda')}
        >
          <Text style={{ fontSize: 24 }}>📆</Text>
          <Text style={styles.txtFerramenta}>Agenda de Prazos</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.cardFerramenta}
          onPress={() => navigation.navigate('CalculadoraPrazos')}
        >
          <Text style={{ fontSize: 24 }}>🧮</Text>
          <Text style={styles.txtFerramenta}>Calculadora CPC</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.sectionTitle}>Módulos do Sistema</Text>

      <TouchableOpacity style={styles.navCard} onPress={() => navigation.navigate('ListarProcesso')}>
        <Text style={styles.cardIcon}>📁</Text>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.navTitle}>Processos</Text>
          <Text style={styles.navSubtitle}>Gestão de andamentos e fases</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navCard} onPress={() => navigation.navigate('ListarAdvogado')}>
        <Text style={styles.cardIcon}>⚖️</Text>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.navTitle}>Advogados</Text>
          <Text style={styles.navSubtitle}>Gestão da equipe jurídica</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.navCard} onPress={() => navigation.navigate('ListarCliente')}>
        <Text style={styles.cardIcon}>👤</Text>
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={styles.navTitle}>Clientes</Text>
          <Text style={styles.navSubtitle}>Base de clientes cadastrados</Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  topSubtitle: { fontSize: 11, fontWeight: 'bold', color: colors.brass, letterSpacing: 1 },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 16 },
  sectionTitle: { fontSize: 14, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 10, marginTop: 10, textTransform: 'uppercase' },
  
  gridFerramentas: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 16 },
  cardFerramenta: { flex: 1, backgroundColor: colors.cardBackground, padding: 14, borderRadius: 12, alignItems: 'center', marginHorizontal: 4, borderWidth: 1, borderColor: colors.border },
  txtFerramenta: { fontSize: 12, fontWeight: 'bold', color: colors.textPrimary, marginTop: 6, textAlign: 'center' },

  navCard: { flexDirection: 'row', backgroundColor: colors.cardBackground, borderRadius: 12, padding: 14, alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: colors.border },
  cardIcon: { fontSize: 22 },
  navTitle: { fontSize: 15, fontWeight: 'bold', color: colors.textPrimary },
  navSubtitle: { fontSize: 12, color: colors.textSecondary },
  arrow: { fontSize: 16, color: colors.brass, fontWeight: 'bold' },
});