import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { EHRData } from '../../types';

interface EHRTabsProps {
  ehr: EHRData;
}

export const EHRTabs: React.FC<EHRTabsProps> = ({ ehr }) => {
  const [activeTab, setActiveTab] = useState<'notes' | 'vitals' | 'labs' | 'history'>('notes');

  return (
    <View style={styles.container}>
      {/* EHR Tab Bar */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar}>
        {ehr.nurses_notes && (
          <TouchableOpacity
            style={[styles.tab, activeTab === 'notes' && styles.tabActive]}
            onPress={() => setActiveTab('notes')}
          >
            <Text style={[styles.tabText, activeTab === 'notes' && styles.tabTextActive]}>
              📋 Notas de Enfermería
            </Text>
          </TouchableOpacity>
        )}

        {ehr.vital_signs && ehr.vital_signs.length > 0 && (
          <TouchableOpacity
            style={[styles.tab, activeTab === 'vitals' && styles.tabActive]}
            onPress={() => setActiveTab('vitals')}
          >
            <Text style={[styles.tabText, activeTab === 'vitals' && styles.tabTextActive]}>
              ❤️ Signos Vitales
            </Text>
          </TouchableOpacity>
        )}

        {ehr.lab_results && ehr.lab_results.length > 0 && (
          <TouchableOpacity
            style={[styles.tab, activeTab === 'labs' && styles.tabActive]}
            onPress={() => setActiveTab('labs')}
          >
            <Text style={[styles.tabText, activeTab === 'labs' && styles.tabTextActive]}>
              🧪 Laboratorio
            </Text>
          </TouchableOpacity>
        )}

        {ehr.history_and_physical && (
          <TouchableOpacity
            style={[styles.tab, activeTab === 'history' && styles.tabActive]}
            onPress={() => setActiveTab('history')}
          >
            <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
              🩺 Historia y Físico
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* EHR Tab Content Panel */}
      <View style={styles.contentBox}>
        {activeTab === 'notes' && ehr.nurses_notes && (
          <ScrollView style={styles.innerScroll}>
            <Text style={styles.ehrText}>{ehr.nurses_notes}</Text>
          </ScrollView>
        )}

        {activeTab === 'vitals' && ehr.vital_signs && (
          <ScrollView style={styles.innerScroll}>
            {ehr.vital_signs.map((v, i) => (
              <View key={i} style={styles.vitalRow}>
                <Text style={styles.vitalTime}>{v.time}</Text>
                <View style={styles.vitalGrid}>
                  <Text style={styles.vitalItem}>Temp: <Text style={styles.vitalVal}>{v.temp}</Text></Text>
                  <Text style={styles.vitalItem}>FC: <Text style={styles.vitalVal}>{v.hr}</Text></Text>
                  <Text style={styles.vitalItem}>FR: <Text style={styles.vitalVal}>{v.rr}</Text></Text>
                  <Text style={styles.vitalItem}>PA: <Text style={styles.vitalVal}>{v.bp}</Text></Text>
                  <Text style={styles.vitalItem}>SpO2: <Text style={styles.vitalVal}>{v.spo2}</Text></Text>
                </View>
              </View>
            ))}
          </ScrollView>
        )}

        {activeTab === 'labs' && ehr.lab_results && (
          <ScrollView style={styles.innerScroll}>
            {ehr.lab_results.map((lab, idx) => (
              <View key={idx} style={styles.labRow}>
                <Text style={styles.labName}>{lab.test}</Text>
                <Text style={[styles.labResult, lab.status === 'critical' && styles.labCritical]}>
                  {lab.result}
                </Text>
                <Text style={styles.labRef}>Ref: {lab.reference_range}</Text>
              </View>
            ))}
          </ScrollView>
        )}

        {activeTab === 'history' && ehr.history_and_physical && (
          <ScrollView style={styles.innerScroll}>
            <Text style={styles.ehrText}>{ehr.history_and_physical}</Text>
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    borderRadius: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#334155',
    overflow: 'hidden',
  },
  tabBar: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 8,
    paddingVertical: 6,
  },
  tab: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginRight: 6,
  },
  tabActive: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  contentBox: {
    padding: 14,
    maxHeight: 180,
  },
  innerScroll: {
    maxHeight: 150,
  },
  ehrText: {
    color: '#e2e8f0',
    fontSize: 13,
    lineHeight: 20,
  },
  vitalRow: {
    backgroundColor: '#1e293b',
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  vitalTime: {
    color: '#38bdf8',
    fontSize: 11,
    fontWeight: '800',
    marginBottom: 4,
  },
  vitalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  vitalItem: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  vitalVal: {
    color: '#ffffff',
    fontWeight: '700',
  },
  labRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  labName: {
    fontSize: 13,
    color: '#ffffff',
    fontWeight: '600',
  },
  labResult: {
    fontSize: 13,
    color: '#38bdf8',
    fontWeight: '800',
  },
  labCritical: {
    color: '#ef4444',
  },
  labRef: {
    fontSize: 11,
    color: '#64748b',
  },
});
