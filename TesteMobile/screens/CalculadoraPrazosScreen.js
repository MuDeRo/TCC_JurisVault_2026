import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { colors } from '../constants/theme';

export default function CalculadoraPrazosScreen() {
  const [dataInicio, setDataInicio] = useState('');
  const [diasUteis, setDiasUteis] = useState('15');
  const [resultado, setResultado] = useState(null);

  function calcular() {
    if (!dataInicio || dataInicio.length !== 10) {
      Alert.alert('Erro', 'Insira uma data válida no formato DD/MM/AAAA');
      return;
    }
    const partes = dataInicio.split('/');
    let dataAtual = new Date(partes[2], partes[1] - 1, partes[0]);
    let adicionados = 0;
    const meta = parseInt(diasUteis, 10);

    while (adicionados < meta) {
      dataAtual.setDate(dataAtual.getDate() + 1);
      const dia = dataAtual.getDay();
      if (dia !== 0 && dia !== 6) adicionados++;
    }

    const d = String(dataAtual.getDate()).padStart(2, '0');
    const m = String(dataAtual.getMonth() + 1).padStart(2, '0');
    const a = dataAtual.getFullYear();
    setResultado(`${d}/${m}/${a}`);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.headerTitle}>Calculadora de Prazos (CPC)</Text>
      <Text style={styles.subtitle}>Contagem automática apenas em dias úteis.</Text>

      <Text style={styles.label}>Data da Intimação</Text>
      <TextInput
        style={styles.input}
        placeholder="DD/MM/AAAA"
        placeholderTextColor="#94A3B8"
        value={dataInicio}
        onChangeText={setDataInicio}
        keyboardType="numeric"
      />

      <Text style={styles.label}>Dias Úteis</Text>
      <TextInput
        style={styles.input}
        placeholder="15"
        placeholderTextColor="#94A3B8"
        value={diasUteis}
        onChangeText={setDiasUteis}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.botao} onPress={calcular}>
        <Text style={styles.txtBotao}>🧮 Calcular Data Limite</Text>
      </TouchableOpacity>

      {resultado && (
        <View style={styles.resultadoCard}>
          <Text style={styles.resLabel}>Prazo Final:</Text>
          <Text style={styles.resData}>{resultado}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  headerTitle: { fontSize: 20, fontWeight: 'bold', color: colors.textPrimary },
  subtitle: { fontSize: 12, color: colors.textSecondary, marginBottom: 20 },
  label: { fontSize: 12, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 6 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 8, padding: 12, marginBottom: 16, color: colors.textPrimary },
  botao: { backgroundColor: colors.sapphire, padding: 14, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: colors.brass },
  txtBotao: { color: colors.ivory, fontWeight: 'bold' },
  resultadoCard: { backgroundColor: colors.cardBackground, borderRadius: 12, padding: 16, marginTop: 24, alignItems: 'center', borderWidth: 1, borderColor: colors.brass },
  resLabel: { fontSize: 13, color: colors.textSecondary, fontWeight: 'bold' },
  resData: { fontSize: 26, fontWeight: 'bold', color: colors.midnightNavy, marginVertical: 8 },
});