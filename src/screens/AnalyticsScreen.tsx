import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import { UserProfile } from '../types';

interface AnalyticsScreenProps {
  user: UserProfile;
  onBack: () => void;
}

export const AnalyticsScreen: React.FC<AnalyticsScreenProps> = ({ user, onBack }) => {
  const domains = [
    { name: 'Management of Care', theta: 1.15, accuracy: 84 },
    { name: 'Pharmacological & Parenteral Therapies', theta: 0.45, accuracy: 68 },
    { name: 'Physiological Adaptation', theta: 0.92, accuracy: 76 },
    { name: 'Reduction of Risk Potential', theta: 0.78, accuracy: 72 },
    { name: 'Psychosocial Integrity', theta: 1.02, accuracy: 80 },
    { name: 'Safe & Effective Care Environment', theta: 1.30, accuracy: 88 },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Analíticas de Rendimiento IRT</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Overall Status Box */}
        <View style={styles.statusCard}>
          <Text style={styles.statusLabel}>Predicción de Preparación NCLEX</Text>
          <Text style={styles.statusValue}>{user.readyForExamStatus}</Text>
          <Text style={styles.statusSub}>
            Basado en la Teoría de Respuesta al Ítem (3PL IRT Model)
          </Text>

          <View style={styles.thetaRow}>
            <View style={styles.thetaCol}>
              <Text style={styles.thetaNum}>+{(user.thetaAbility).toFixed(2)}</Text>
              <Text style={styles.thetaTxt}>Theta (θ) Global</Text>
            </View>
            <View style={styles.divider} />
            <View style={styles.thetaCol}>
              <Text style={styles.thetaNum}>{user.overallAccuracy}%</Text>
              <Text style={styles.thetaTxt}>Precisión Promedio</Text>
            </View>
          </View>
        </View>

        {/* Domain Mastery Bars */}
        <Text style={styles.sectionTitle}>Nivel de Habilidad por Categoría Client Needs</Text>

        {domains.map((dom) => (
          <View key={dom.name} style={styles.domainCard}>
            <View style={styles.domainHeader}>
              <Text style={styles.domainName}>{dom.name}</Text>
              <Text style={styles.domainTheta}>θ = +{dom.theta.toFixed(2)}</Text>
            </View>

            <View style={styles.barBg}>
              <View style={[styles.barFill, { width: `${dom.accuracy}%` }]} />
            </View>

            <View style={styles.domainFooter}>
              <Text style={styles.accTxt}>Precisión: {dom.accuracy}%</Text>
              <Text style={[styles.statusTxt, dom.accuracy >= 75 ? styles.highTxt : styles.midTxt]}>
                {dom.accuracy >= 75 ? 'Excelente' : 'Requiere Práctica'}
              </Text>
            </View>
          </View>
        ))}
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
  statusCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  statusLabel: {
    color: '#94a3b8',
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  statusValue: {
    color: '#4ade80',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 4,
  },
  statusSub: {
    color: '#64748b',
    fontSize: 11,
    marginBottom: 18,
  },
  thetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  thetaCol: {
    alignItems: 'center',
  },
  thetaNum: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: '800',
  },
  thetaTxt: {
    color: '#94a3b8',
    fontSize: 11,
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 30,
    backgroundColor: '#334155',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginTop: 8,
  },
  domainCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  domainHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  domainName: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
  },
  domainTheta: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '800',
  },
  barBg: {
    height: 8,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 10,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  domainFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  accTxt: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  statusTxt: {
    fontSize: 12,
    fontWeight: '700',
  },
  highTxt: {
    color: '#4ade80',
  },
  midTxt: {
    color: '#f59e0b',
  },
});
