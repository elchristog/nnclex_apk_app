import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { TestMode } from '../types';

interface NclexHubScreenProps {
  onStartTest: (mode: TestMode) => void;
  onBack: () => void;
}

export const NclexHubScreen: React.FC<NclexHubScreenProps> = ({ onStartTest, onBack }) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Suite de Evaluaciones NCLEX</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionSubtitle}>
          Elige el tipo de simulador o evaluación adaptativa para medir tu nivel de preparación.
        </Text>

        {/* CAT Adaptive Exam */}
        <TouchableOpacity
          style={[styles.testCard, { borderColor: '#3b82f6' }]}
          onPress={() => onStartTest('CAT')}
          activeOpacity={0.85}
        >
          <View style={styles.cardBadgeRow}>
            <View style={[styles.modeBadge, { backgroundColor: '#1d4ed8' }]}>
              <Text style={styles.modeBadgeText}>OFICIAL NCLEX</Text>
            </View>
            <Text style={styles.timeTag}>⏱️ Algoritmo Adaptativo 85-150 pgs</Text>
          </View>
          <Text style={styles.cardTitle}>Simulador CAT (Computerized Adaptive Testing)</Text>
          <Text style={styles.cardDesc}>
            Ajusta dinámicamente la dificultad de las preguntas según tu habilidad estimada (θ) hasta alcanzar la regla de detención del 95% de confianza.
          </Text>
        </TouchableOpacity>

        {/* NGN Case Studies */}
        <TouchableOpacity
          style={[styles.testCard, { borderColor: '#10b981' }]}
          onPress={() => onStartTest('NGN_CASE_STUDIES')}
          activeOpacity={0.85}
        >
          <View style={styles.cardBadgeRow}>
            <View style={[styles.modeBadge, { backgroundColor: '#047857' }]}>
              <Text style={styles.modeBadgeText}>NUEVA GENERACIÓN</Text>
            </View>
            <Text style={styles.timeTag}>🩺 Casos Clínicos + EHR Tab</Text>
          </View>
          <Text style={styles.cardTitle}>Evaluación NGN (Juicio Clínico)</Text>
          <Text style={styles.cardDesc}>
            Resuelve expedientes clínicos reales con preguntas tipo Bowtie, Matriz, Arrastrar y Soltar, Texto Resaltado y Relleno Clínico.
          </Text>
        </TouchableOpacity>

        {/* Readiness Assessment */}
        <TouchableOpacity
          style={[styles.testCard, { borderColor: '#f59e0b' }]}
          onPress={() => onStartTest('READINESS')}
          activeOpacity={0.85}
        >
          <View style={styles.cardBadgeRow}>
            <View style={[styles.modeBadge, { backgroundColor: '#b45309' }]}>
              <Text style={styles.modeBadgeText}>SIMULACRO GLOBAL</Text>
            </View>
            <Text style={styles.timeTag}>📊 Predicción de Aprobación</Text>
          </View>
          <Text style={styles.cardTitle}>Readiness Assessment (Simulacro de Examen)</Text>
          <Text style={styles.cardDesc}>
            Prueba completa con reporte detallado de probabilidad de éxito (Muy Alta, Alta, Al Límite, Baja) en el examen real.
          </Text>
        </TouchableOpacity>

        {/* Weak Points Booster */}
        <TouchableOpacity
          style={[styles.testCard, { borderColor: '#ec4899' }]}
          onPress={() => onStartTest('WEAK_POINTS')}
          activeOpacity={0.85}
        >
          <View style={styles.cardBadgeRow}>
            <View style={[styles.modeBadge, { backgroundColor: '#be185d' }]}>
              <Text style={styles.modeBadgeText}>REFUERZO INTELIGENTE</Text>
            </View>
            <Text style={styles.timeTag}>🎯 Puntos Débiles Detectados</Text>
          </View>
          <Text style={styles.cardTitle}>Refuerzo de Áreas de Oportunidad</Text>
          <Text style={styles.cardDesc}>
            Ejercitación focalizada exclusivamente en las subcategorías donde tu precisión o parámetro θ están por debajo del umbral objetivo.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backBtn: {
    paddingVertical: 6,
    paddingHorizontal: 8,
  },
  backBtnText: {
    color: '#3b82f6',
    fontWeight: '700',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  content: {
    padding: 20,
    gap: 16,
  },
  sectionSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    marginBottom: 8,
    lineHeight: 18,
  },
  testCard: {
    backgroundColor: '#1e293b',
    borderRadius: 18,
    padding: 18,
    borderWidth: 1.5,
  },
  cardBadgeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  modeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  modeBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  timeTag: {
    color: '#94a3b8',
    fontSize: 11,
    fontWeight: '600',
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  cardDesc: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18,
  },
});
