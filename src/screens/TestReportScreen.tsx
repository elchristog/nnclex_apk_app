import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';

interface TestReportScreenProps {
  results: {
    mode: string;
    total: number;
    correct: number;
    thetaScore: number;
    accuracy: number;
    timeSpent: string;
    questions: any[];
    userAnswers: Record<string, any>;
  };
  onDone: () => void;
}

export const TestReportScreen: React.FC<TestReportScreenProps> = ({ results, onDone }) => {
  const isPass = results.accuracy >= 70;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Pass/Fail Header Badge */}
        <View style={[styles.resultBanner, isPass ? styles.passBanner : styles.failBanner]}>
          <Text style={styles.bannerIcon}>{isPass ? '🎉' : '📈'}</Text>
          <Text style={styles.bannerTitle}>
            {isPass ? '¡Resultado Exitoso!' : 'Necesita Refuerzo'}
          </Text>
          <Text style={styles.bannerSub}>
            Modo: {results.mode} • Tiempo: {results.timeSpent}
          </Text>
        </View>

        {/* IRT Score Cards */}
        <View style={styles.scoreRow}>
          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>+{(results.thetaScore).toFixed(2)}</Text>
            <Text style={styles.scoreLabel}>Habilidad IRT (θ)</Text>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>{results.accuracy}%</Text>
            <Text style={styles.scoreLabel}>Precisión</Text>
          </View>

          <View style={styles.scoreCard}>
            <Text style={styles.scoreValue}>
              {results.correct}/{results.total}
            </Text>
            <Text style={styles.scoreLabel}>Correctas</Text>
          </View>
        </View>

        {/* Questions Breakdown */}
        <Text style={styles.sectionHeading}>Revisión de Preguntas y Explicaciones</Text>

        {results.questions.map((q, idx) => {
          const userAns = results.userAnswers[q.question_id];
          return (
            <View key={q.question_id || idx} style={styles.reviewCard}>
              <View style={styles.reviewCardHeader}>
                <Text style={styles.qNum}>Pregunta {idx + 1}</Text>
                <Text style={styles.qSubject}>{q.subject}</Text>
              </View>

              <Text style={styles.reviewQuestionText}>{q.question_text}</Text>

              {/* Rationale & Explanation */}
              <View style={styles.explanationBox}>
                <Text style={styles.explanationTitle}>💡 Explicación Psicométrica:</Text>
                <Text style={styles.explanationText}>{q.explanation}</Text>
              </View>
            </View>
          );
        })}

        {/* Done Action */}
        <TouchableOpacity style={styles.doneBtn} onPress={onDone}>
          <Text style={styles.doneBtnText}>Volver al Inicio</Text>
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
  content: {
    padding: 20,
  },
  resultBanner: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    marginBottom: 20,
  },
  passBanner: {
    backgroundColor: '#064e3b',
    borderWidth: 1,
    borderColor: '#10b981',
  },
  failBanner: {
    backgroundColor: '#451a03',
    borderWidth: 1,
    borderColor: '#f59e0b',
  },
  bannerIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  bannerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  bannerSub: {
    fontSize: 13,
    color: '#cbd5e1',
  },
  scoreRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  scoreCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  scoreValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 2,
  },
  scoreLabel: {
    fontSize: 11,
    color: '#94a3b8',
  },
  sectionHeading: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 14,
  },
  reviewCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  reviewCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  qNum: {
    color: '#38bdf8',
    fontWeight: '800',
    fontSize: 13,
  },
  qSubject: {
    color: '#64748b',
    fontSize: 12,
  },
  reviewQuestionText: {
    color: '#ffffff',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  explanationBox: {
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#3b82f6',
  },
  explanationTitle: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 4,
  },
  explanationText: {
    color: '#cbd5e1',
    fontSize: 12,
    lineHeight: 18,
  },
  doneBtn: {
    backgroundColor: '#2563eb',
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 10,
  },
  doneBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});
