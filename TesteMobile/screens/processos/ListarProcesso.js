import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/theme';

export default function ListarProcesso({ navigation }) {
  const [processos] = useState([
    { id: '1', numero: '0001234-56.2023.8.26.0000', cliente: 'Carlos Eduardo Silva', tipo: 'Ação Trabalhista', status: 'Em Andamento', vara: '2ª Vara Cível' },
    { id: '2', numero: '0009876-12.2023.8.26.0000', cliente: 'Maria Aparecida Oliveira', tipo: 'Indenização por Danos Morais', status: 'Aguardando Sentença', vara: '1ª Vara Família' },
  ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.btnNovo} 
        onPress={() => navigation.navigate('FormProcesso')}
      >
        <Text style={styles.txtBtnNovo}>+ Novo Processo</Text>
      </TouchableOpacity>

      <FlatList
        data={processos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.numero}>{item.numero}</Text>
              <Text style={styles.statusTag}>{item.status}</Text>
            </View>
            <Text style={styles.subtext}>👤 Cliente: {item.cliente}</Text>
            <Text style={styles.subtext}>⚖️ {item.tipo}</Text>
            <Text style={styles.subtext}>📍 {item.vara}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  btnNovo: { backgroundColor: colors.sapphire, padding: 14, borderRadius: 10, alignItems: 'center', marginBottom: 16, borderWidth: 1, borderColor: colors.brass },
  txtBtnNovo: { color: colors.ivory, fontWeight: 'bold', fontSize: 14 },
  card: { backgroundColor: colors.cardBackground, padding: 16, borderRadius: 12, marginBottom: 12, borderWidth: 1, borderColor: colors.border },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  numero: { fontSize: 14, fontWeight: 'bold', color: colors.midnightNavy, flex: 1 },
  statusTag: { fontSize: 10, fontWeight: 'bold', color: colors.midnightNavy, backgroundColor: colors.champagne, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  subtext: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
});