import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../constants/theme';

export default function CalculadoraPrazosScreen() {
  const [dias, setDias] = useState('15');
  const [apenasUteis, setApenasUteis] = useState(true);
  const [resultado, setResultado] = useState(null);

  function calcularPrazo() {
    const numDias = parseInt(dias, 10);
    if (isNaN(numDias) || numDias <= 0) return;

    let dataAtual = new Date();
    let contador = 0;

    while (contador < numDias) {
      dataAtual.setDate(dataAtual.getDate() + 1);
      const diaSemana = dataAtual.getDay();
      
      // Se apenasUteis for true, ignora Sábado (6) e Domingo (0)
      if (apenasUteis) {
        if (diaSemana !== 0 && diaSemana !== 6) {
          contador++;
        }
      } else {
        contador++;
      }
    }

    const dataFormatada = dataAtual.toLocaleDateString('pt-BR', {
      weekday: 'long',
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });

    setResultado(dataFormatada);
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Calculadora de Prazos Processuais</Text>
        <Text style={styles.subtitulo}>Contagem em dias úteis (CPC/2015)</Text>

        <Text style={styles.label}>QUANTIDADE DE DIAS *</Text>
        <TextInput 
          style={styles.input} 
          keyboardType="numeric" 
          value={dias} 
          onChangeText={setDias} 
        />

        <View style={styles.tipoContainer}>
          <TouchableOpacity 
            style={[styles.btnTipo, apenasUteis && styles.btnTipoAtivo]} 
            onPress={() => setApenasUteis(true)}
          >
            <Text style={[styles.txtTipo, apenasUteis && styles.txtTipoAtivo]}>Dias Úteis (CPC)</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.btnTipo, !apenasUteis && styles.btnTipoAtivo]} 
            onPress={() => setApenasUteis(false)}
          >
            <Text style={[styles.txtTipo, !apenasUteis && styles.txtTipoAtivo]}>Dias Corridos</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.botao} onPress={calcularPrazo}>
          <Text style={styles.txtBotao}>Calcular Vencimento</Text>
        </TouchableOpacity>

        {resultado && (
          <View style={styles.resultadoBox}>
            <Text style={styles.resultadoLabel}>DATA DE VENCIMENTO ESTIMADA:</Text>
            <Text style={styles.resultadoVal}>{resultado}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  card: { backgroundColor: colors.cardBackground, borderRadius: 16, padding: 20, borderWidth: 1, borderColor: colors.border },
  titulo: { fontSize: 18, fontWeight: '900', color: colors.primary },
  subtitulo: { fontSize: 12, color: colors.textSecondary, marginBottom: 18 },
  label: { fontSize: 11, fontWeight: '800', color: colors.textPrimary, marginBottom: 6 },
  input: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.border, borderRadius: 10, padding: 12, marginBottom: 16, fontSize: 16, fontWeight: '700', color: colors.primary },
  tipoContainer: { flexDirection: 'row', marginBottom: 20 },
  btnTipo: { flex: 1, paddingVertical: 10, alignItems: 'center', borderWidth: 1, borderColor: colors.border, borderRadius: 8, marginHorizontal: 2 },
  btnTipoAtivo: { backgroundColor: colors.primary, borderColor: colors.primary },
  txtTipo: { fontSize: 12, fontWeight: '700', color: colors.textSecondary },
  txtTipoAtivo: { color: colors.white },
  botao: { backgroundColor: colors.secondary, paddingVertical: 14, borderRadius: 12, alignItems: 'center' },
  txtBotao: { color: colors.midnightNavy, fontWeight: '900', fontSize: 15 },
  resultadoBox: { marginTop: 20, padding: 16, backgroundColor: colors.background, borderRadius: 12, borderWidth: 1, borderColor: colors.border, alignItems: 'center' },
  resultadoLabel: { fontSize: 10, fontWeight: '800', color: colors.textSecondary, marginBottom: 4 },
  resultadoVal: { fontSize: 14, fontWeight: '800', color: colors.primary, textAlign: 'center', textTransform: 'capitalize' }
});