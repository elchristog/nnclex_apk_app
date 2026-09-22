import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Question } from '../../types';

interface BowtieQuestionProps {
  question: Question;
  onAnswerChange: (answer: { condition?: string; actions: string[]; parameters: string[] }) => void;
}

export const BowtieQuestion: React.FC<BowtieQuestionProps> = ({ question, onAnswerChange }) => {
  const [selectedCondition, setSelectedCondition] = useState<string | undefined>();
  const [selectedActions, setSelectedActions] = useState<string[]>([]);
  const [selectedParameters, setSelectedParameters] = useState<string[]>([]);

  const handleSelectCondition = (cond: string) => {
    setSelectedCondition(cond);
    updateAnswer(cond, selectedActions, selectedParameters);
  };

  const handleToggleAction = (action: string) => {
    let nextActions = [...selectedActions];
    if (nextActions.includes(action)) {
      nextActions = nextActions.filter((a) => a !== action);
    } else {
      if (nextActions.length < 2) {
        nextActions.push(action);
      }
    }
    setSelectedActions(nextActions);
    updateAnswer(selectedCondition, nextActions, selectedParameters);
  };

  const handleToggleParameter = (param: string) => {
    let nextParams = [...selectedParameters];
    if (nextParams.includes(param)) {
      nextParams = nextParams.filter((p) => p !== param);
    } else {
      if (nextParams.length < 2) {
        nextParams.push(param);
      }
    }
    setSelectedParameters(nextParams);
    updateAnswer(selectedCondition, selectedActions, nextParams);
  };

  const updateAnswer = (
    c?: string,
    a: string[] = selectedActions,
    p: string[] = selectedParameters
  ) => {
    onAnswerChange({ condition: c, actions: a, parameters: p });
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.instructions}>
        📌 **Diagrama Bowtie NGN**: Selecciona la **Condición Potencial** en el centro (1), las **Acciones a Tomar** a la izquierda (2) y los **Parámetros a Monitorear** a la derecha (2).
      </Text>

      {/* Center Condition Selector */}
      <View style={styles.sectionCard}>
        <Text style={styles.sectionHeader}>1. Condición Potencial (Selecciona 1)</Text>
        {question.bowtie_condition_options?.map((opt, i) => {
          const isSelected = selectedCondition === opt;
          return (
            <TouchableOpacity
              key={i}
              style={[styles.optionItem, isSelected && styles.optionSelectedCondition]}
              onPress={() => handleSelectCondition(opt)}
            >
              <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                {isSelected ? '🎯 ' : '⚪ '} {opt}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Actions & Parameters Dual Columns */}
      <View style={styles.rowLayout}>
        {/* Actions Left */}
        <View style={styles.halfCol}>
          <Text style={styles.colHeader}>2. Acciones (2)</Text>
          {question.bowtie_action_options?.map((opt, idx) => {
            const isSelected = selectedActions.includes(opt);
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.optionItem, isSelected && styles.optionSelectedAction]}
                onPress={() => handleToggleAction(opt)}
              >
                <Text style={[styles.optionTextSmall, isSelected && styles.optionTextSelected]}>
                  {isSelected ? '✓ ' : '⬜ '} {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Parameters Right */}
        <View style={styles.halfCol}>
          <Text style={styles.colHeader}>3. Parámetros (2)</Text>
          {question.bowtie_parameter_options?.map((opt, idx) => {
            const isSelected = selectedParameters.includes(opt);
            return (
              <TouchableOpacity
                key={idx}
                style={[styles.optionItem, isSelected && styles.optionSelectedParam]}
                onPress={() => handleToggleParameter(opt)}
              >
                <Text style={[styles.optionTextSmall, isSelected && styles.optionTextSelected]}>
                  {isSelected ? '✓ ' : '⬜ '} {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  instructions: {
    color: '#cbd5e1',
    fontSize: 13,
    marginBottom: 14,
    lineHeight: 18,
  },
  sectionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#334155',
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '800',
    color: '#38bdf8',
    marginBottom: 10,
  },
  optionItem: {
    backgroundColor: '#0f172a',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  optionSelectedCondition: {
    backgroundColor: '#2563eb',
    borderColor: '#3b82f6',
  },
  optionSelectedAction: {
    backgroundColor: '#059669',
    borderColor: '#10b981',
  },
  optionSelectedParam: {
    backgroundColor: '#7c3aed',
    borderColor: '#8b5cf6',
  },
  optionText: {
    color: '#cbd5e1',
    fontSize: 13,
  },
  optionTextSmall: {
    color: '#cbd5e1',
    fontSize: 12,
  },
  optionTextSelected: {
    color: '#ffffff',
    fontWeight: '700',
  },
  rowLayout: {
    flexDirection: 'row',
    gap: 10,
  },
  halfCol: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  colHeader: {
    fontSize: 13,
    fontWeight: '800',
    color: '#a78bfa',
    marginBottom: 10,
  },
});
