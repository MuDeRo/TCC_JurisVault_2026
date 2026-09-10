import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/theme';

export default function ListarAdvogado({ navigation }) {
  const [advogados] = useState([
    { id: '1', nome: 'Dr. Roberto Alves', oab: 'OAB/SP 123.456', especialidade: 'Direito Cível', email: 'roberto@escritorio.com' },
    { id: '2', nome: 'Dra. Amanda Costa', oab: 'OAB/SP 654.321', especialidade: 'Direito Trabalhista', email: 'amanda@escritorio.com' },
  ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.btnNovo} 
        onPress={() => navigation.navigate('FormAdvogado')}
      >
        <Text style={styles.txtBtnNovo}>+ Cadastrar Advogado</Text>
      </TouchableOpacity>

      <FlatList
        data={advogados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.tagOab}>{item.oab}</Text>
            </View>
            <Text style={styles.subtext}>⚖️ Especialidade: {item.especialidade}</Text>
            <Text style={styles.subtext}>✉️ {item.email}</Text>
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
  nome: { fontSize: 16, fontWeight: 'bold', color: colors.midnightNavy, flex: 1 },
  tagOab: { fontSize: 11, fontWeight: 'bold', color: colors.brass, backgroundColor: colors.midnightNavy, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  subtext: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
});