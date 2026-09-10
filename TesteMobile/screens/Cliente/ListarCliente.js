import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../../constants/theme';

export default function ListarCliente({ navigation }) {
  const [clientes] = useState([
    { id: '1', nome: 'Carlos Eduardo Silva', cpf: '123.456.789-00', telefone: '(19) 98765-4321', email: 'carlos@email.com' },
    { id: '2', nome: 'Maria Aparecida Oliveira', cpf: '987.654.321-11', telefone: '(19) 91234-5678', email: 'maria@email.com' },
  ]);

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.btnNovo} 
        onPress={() => navigation.navigate('FormCliente')}
      >
        <Text style={styles.txtBtnNovo}>+ Cadastrar Cliente</Text>
      </TouchableOpacity>

      <FlatList
        data={clientes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.nome}>{item.nome}</Text>
            <Text style={styles.subtext}>🪪 CPF/CNPJ: {item.cpf}</Text>
            <Text style={styles.subtext}>📞 {item.telefone}</Text>
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
  nome: { fontSize: 16, fontWeight: 'bold', color: colors.midnightNavy, marginBottom: 6 },
  subtext: { fontSize: 13, color: colors.textSecondary, marginTop: 2 },
});