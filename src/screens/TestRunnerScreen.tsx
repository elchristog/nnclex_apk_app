import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Question, TestMode } from '../types';
import { ApiService } from '../api/client';
import { EHRTabs } from '../components/ngn/EHRTabs';
import { BowtieQuestion } from '../components/ngn/BowtieQuestion';

interface TestRunnerScreenProps {
  mode: TestMode;
  onFinishTest: (results: any) => void;
  onCancel: () => void;
}

export const TestRunnerScreen: React.FC<TestRunnerScreenProps> = ({ mode, onFinishTest, onCancel }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);
  const [secondsElapsed, setSecondsElapsed] = useState(0);

  useEffect(() => {
    loadTestQuestions();
    const timer = setInterval(() => setSecondsElapsed((prev) => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const loadTestQuestions = async () => {
    setLoading(true);
    const data = await ApiService.fetchQuestions(undefined, mode === 'CAT' ? 15 : 10);
    setQuestions(data);
    setLoading(false);
  };

  const currentQuestion = questions[currentIndex];

  const handleSelectOption = (key: string) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.question_id]: key }));
  };

  const handleToggleSATA = (key: string) => {
    if (!currentQuestion) return;
    const currentList: string[] = userAnswers[currentQuestion.question_id] || [];
    let nextList: string[];
    if (currentList.includes(key)) {
      nextList = currentList.filter((k) => k !== key);
    } else {
      nextList = [...currentList, key];
    }
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.question_id]: nextList }));
  };

  const handleBowtieAnswer = (ans: any) => {
    if (!currentQuestion) return;
    setUserAnswers((prev) => ({ ...prev, [currentQuestion.question_id]: ans }));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSubmitExam = () => {
    // Calculate Score
    let correctCount = 0;
    questions.forEach((q) => {
      const uAns = userAnswers[q.question_id];
      if (q.type === 'multiple_choice' && uAns === q.correct_option) {
        correctCount++;
      } else if (q.type === 'select_all_that_apply' && Array.isArray(uAns) && Array.isArray(q.correct_option)) {
        if (JSON.stringify(uAns.sort()) === JSON.stringify((q.correct_option as string[]).sort())) {
          correctCount++;
        }
      } else if (q.type === 'ngn_bowtie' && uAns?.condition === q.bowtie_correct?.condition) {
        correctCount++;
      }
    });

    const thetaScore = 0.5 + (correctCount / Math.max(questions.length, 1)) * 1.5;
    const results = {
      mode,
      total: questions.length,
      correct: correctCount,
      thetaScore,
      accuracy: Math.round((correctCount / Math.max(questions.length, 1)) * 100),
      timeSpent: formatTime(secondsElapsed),
      questions,
      userAnswers,
    };
    onFinishTest(results);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Test Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity onPress={onCancel} style={styles.exitBtn}>
          <Text style={styles.exitBtnText}>✕ Salir</Text>
        </TouchableOpacity>

        <View style={styles.timerBadge}>
          <Text style={styles.timerText}>⏱️ {formatTime(secondsElapsed)}</Text>
        </View>

        <TouchableOpacity style={styles.calcBtn}>
          <Text style={styles.calcBtnText}>🧮 Calc</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Cargando banco de preguntas y NGN case studies...</Text>
        </View>
      ) : (
        <View style={styles.mainArea}>
          {/* Question Counter Header */}
          <View style={styles.qHeader}>
            <Text style={styles.qCounter}>
              Pregunta {currentIndex + 1} de {questions.length}
            </Text>
            <Text style={styles.subjectTag}>{currentQuestion?.subject}</Text>
          </View>

          <ScrollView style={styles.qScroll} contentContainerStyle={styles.qContent}>
            {/* EHR Tabbed Records if available */}
            {currentQuestion?.ehr && <EHRTabs ehr={currentQuestion.ehr} />}

            {/* Question Text */}
            <Text style={styles.questionText}>{currentQuestion?.question_text}</Text>

            {/* Render Specific Question Option Layouts */}
            {currentQuestion?.type === 'ngn_bowtie' ? (
              <BowtieQuestion question={currentQuestion} onAnswerChange={handleBowtieAnswer} />
            ) : currentQuestion?.type === 'select_all_that_apply' ? (
              <View style={styles.optionsList}>
                <Text style={styles.sataHint}>
                  ☑️ Selecciona todas las opciones que correspondan (SATA):
                </Text>
                {Object.entries(currentQuestion.options).map(([key, text]) => {
                  const selectedList: string[] = userAnswers[currentQuestion.question_id] || [];
                  const isChecked = selectedList.includes(key);
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.optionCard, isChecked && styles.optionCardChecked]}
                      onPress={() => handleToggleSATA(key)}
                    >
                      <Text style={[styles.optionKey, isChecked && styles.optionKeyChecked]}>
                        {isChecked ? '☑️' : '⬜'}
                      </Text>
                      <Text style={[styles.optionLabel, isChecked && styles.optionLabelChecked]}>
                        {text}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            ) : (
              <View style={styles.optionsList}>
                {Object.entries(currentQuestion?.options || {}).map(([key, text]) => {
                  const isSelected = userAnswers[currentQuestion?.question_id] === key;
                  return (
                    <TouchableOpacity
                      key={key}
                      style={[styles.optionCard, isSelected && styles.optionCardSelected]}
                      onPress={() => handleSelectOption(key)}
                    >
                      <Text style={[styles.optionKey, isSelected && styles.optionKeySelected]}>
                        {key.toUpperCase()}
                      </Text>
                      <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                        {text}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </ScrollView>

          {/* Bottom Control Actions */}
          <View style={styles.bottomNav}>
            <TouchableOpacity
              style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]}
              disabled={currentIndex === 0}
              onPress={() => setCurrentIndex((prev) => prev - 1)}
            >
              <Text style={styles.navBtnText}>← Anterior</Text>
            </TouchableOpacity>

            {currentIndex < questions.length - 1 ? (
              <TouchableOpacity
                style={[styles.navBtn, styles.navBtnPrimary]}
                onPress={() => setCurrentIndex((prev) => prev + 1)}
              >
                <Text style={styles.navBtnTextPrimary}>Siguiente →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={[styles.navBtn, styles.submitBtn]} onPress={handleSubmitExam}>
                <Text style={styles.submitBtnText}>Finalizar Examen ✨</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#0f172a',
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  exitBtn: {
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  exitBtnText: {
    color: '#ef4444',
    fontWeight: '700',
    fontSize: 13,
  },
  timerBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timerText: {
    color: '#38bdf8',
    fontSize: 14,
    fontWeight: '800',
  },
  calcBtn: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  calcBtnText: {
    color: '#94a3b8',
    fontSize: 12,
    fontWeight: '700',
  },
  loadingBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#64748b',
    marginTop: 12,
  },
  mainArea: {
    flex: 1,
    padding: 16,
  },
  qHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  qCounter: {
    color: '#38bdf8',
    fontWeight: '800',
    fontSize: 14,
  },
  subjectTag: {
    color: '#64748b',
    fontSize: 12,
    fontWeight: '600',
  },
  qScroll: {
    flex: 1,
  },
  qContent: {
    paddingBottom: 20,
  },
  questionText: {
    fontSize: 16,
    color: '#f8fafc',
    lineHeight: 24,
    marginBottom: 18,
    fontWeight: '600',
  },
  optionsList: {
    gap: 10,
  },
  sataHint: {
    color: '#a78bfa',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  optionCardSelected: {
    backgroundColor: '#1d4ed8',
    borderColor: '#3b82f6',
  },
  optionCardChecked: {
    backgroundColor: '#4c1d95',
    borderColor: '#7c3aed',
  },
  optionKey: {
    width: 28,
    fontSize: 13,
    fontWeight: '800',
    color: '#94a3b8',
  },
  optionKeySelected: {
    color: '#ffffff',
  },
  optionKeyChecked: {
    color: '#ffffff',
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 20,
  },
  optionLabelSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  optionLabelChecked: {
    color: '#ffffff',
    fontWeight: '700',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#1e293b',
    gap: 12,
  },
  navBtn: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    backgroundColor: '#1e293b',
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    color: '#94a3b8',
    fontWeight: '700',
    fontSize: 13,
  },
  navBtnPrimary: {
    backgroundColor: '#2563eb',
  },
  navBtnTextPrimary: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  submitBtn: {
    backgroundColor: '#059669',
  },
  submitBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
  },
});
