import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { colors } from '../constants/theme';

export default function AgendaScreen() {
  const [filtro, setFiltro] = useState('Todos');

  const [compromissos] = useState([
    { id: '1', titulo: 'Audiência de Conciliação', processo: '0001234-56.2023.8.26.0000', cliente: 'Carlos Silva', data: '08/09/2026', horario: '14:30', tipo: 'Audiencia', urgente: true },
    { id: '2', titulo: 'Prazo: Réplica à Contestação', processo: '0009876-12.2023.8.26.0000', cliente: 'Maria Oliveira', data: '12/09/2026', horario: '23:59', tipo: 'Prazo', urgente: false },
  ]);

  const listaFiltrada = compromissos.filter(item => filtro === 'Todos' || item.tipo === filtro);

  return (
    <View style={styles.container}>
      <View style={styles.filtroContainer}>
        {['Todos', 'Audiencia', 'Prazo'].map((t) => (
          <TouchableOpacity
            key={t}
            style={[styles.btnFiltro, filtro === t && styles.btnFiltroAtivo]}
            onPress={() => setFiltro(t)}
          >
            <Text style={[styles.txtFiltro, filtro === t && styles.txtFiltroAtivo]}>
              {t === 'Todos' ? 'Todos' : t === 'Audiencia' ? '⚖️ Audiências' : '📅 Prazos'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={listaFiltrada}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.card, item.urgente && styles.cardUrgente]}>
            <Text style={styles.titulo}>{item.titulo}</Text>
            <Text style={styles.subtext}>Processo: {item.processo}</Text>
            <Text style={styles.subtext}>Cliente: {item.cliente}</Text>
            <Text style={styles.dataTexto}>🗓️ {item.data} às {item.horario}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background, padding: 16 },
  filtroContainer: { flexDirection: 'row', marginBottom: 16 },
  btnFiltro: { flex: 1, paddingVertical: 8, backgroundColor: colors.cardBackground, borderRadius: 8, alignItems: 'center', marginHorizontal: 2, borderWidth: 1, borderColor: colors.border },
  btnFiltroAtivo: { backgroundColor: colors.midnightNavy },
  txtFiltro: { fontSize: 12, fontWeight: 'bold', color: colors.textPrimary },
  txtFiltroAtivo: { color: colors.champagne },
  card: { backgroundColor: colors.cardBackground, padding: 14, borderRadius: 12, marginBottom: 12, borderLeftWidth: 4, borderLeftColor: colors.sapphire, borderWidth: 1, borderColor: colors.border },
  cardUrgente: { borderLeftColor: colors.brass },
  titulo: { fontSize: 15, fontWeight: 'bold', color: colors.textPrimary, marginBottom: 4 },
  subtext: { fontSize: 12, color: colors.textSecondary, marginBottom: 2 },
  dataTexto: { fontSize: 12, fontWeight: 'bold', color: colors.midnightNavy, marginTop: 6 },
});

// comentario para teste