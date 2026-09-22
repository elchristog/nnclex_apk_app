import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';

interface Flashcard {
  id: string;
  termEn: string;
  termEs: string;
  definitionEn: string;
  definitionEs: string;
  category: string;
}

interface FlashcardsScreenProps {
  onBack: () => void;
}

export const FlashcardsScreen: React.FC<FlashcardsScreenProps> = ({ onBack }) => {
  const cards: Flashcard[] = [
    {
      id: 'fc-1',
      termEn: 'Atelectasis',
      termEs: 'Atelectasia',
      definitionEn: 'Collapse or closure of a lung resulting in reduced or absent gas exchange.',
      definitionEs: 'Colapso de alvéolos pulmonares que provoca disminución del intercambio gaseoso. Prevenible con incentivo espiratorio.',
      category: 'Respiratorio',
    },
    {
      id: 'fc-2',
      termEn: 'Tachycardia',
      termEs: 'Taquicardia',
      definitionEn: 'Heart rate exceeding 100 beats per minute in adults.',
      definitionEs: 'Frecuencia cardíaca mayor a 100 latidos por minuto en reposo en adultos.',
      category: 'Cardiovascular',
    },
    {
      id: 'fc-3',
      termEn: 'Thrombocytopenia',
      termEs: 'Trombocitopenia',
      definitionEn: 'Low blood platelet count (<150,000 /mm³) increasing bleeding risk.',
      definitionEs: 'Conteo bajo de plaquetas (<150,000 /mm³) que incrementa el riesgo de hemorragia. Precaución con punciones venosas.',
      category: 'Hematología',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const currentCard = cards[currentIndex];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Flashcards Terminología Bilingüe</Text>
        <View style={{ width: 60 }} />
      </View>

      <View style={styles.content}>
        <Text style={styles.counterText}>
          Tarjeta {currentIndex + 1} de {cards.length} • {currentCard.category}
        </Text>

        {/* Flip Flashcard Card */}
        <TouchableOpacity
          style={styles.cardArea}
          onPress={() => setIsFlipped(!isFlipped)}
          activeOpacity={0.9}
        >
          <Text style={styles.flipHint}>{isFlipped ? '🔄 Toca para ver Inglés' : '🔄 Toca para ver Español y Definición'}</Text>

          {!isFlipped ? (
            <View style={styles.cardFace}>
              <Text style={styles.termText}>{currentCard.termEn}</Text>
              <Text style={styles.langTag}>Inglés Médico</Text>
              <Text style={styles.descText}>{currentCard.definitionEn}</Text>
            </View>
          ) : (
            <View style={[styles.cardFace, styles.cardFaceBack]}>
              <Text style={styles.termTextEs}>{currentCard.termEs}</Text>
              <Text style={styles.langTagEs}>Español Clínico</Text>
              <Text style={styles.descText}>{currentCard.definitionEs}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Navigation Buttons */}
        <View style={styles.controls}>
          <TouchableOpacity style={styles.controlBtn} onPress={handlePrev}>
            <Text style={styles.controlBtnText}>← Anterior</Text>
          </TouchableOpacity>

          <TouchableOpacity style={[styles.controlBtn, styles.nextBtn]} onPress={handleNext}>
            <Text style={styles.nextBtnText}>Siguiente →</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  counterText: {
    color: '#94a3b8',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: '600',
  },
  cardArea: {
    height: 320,
    backgroundColor: '#1e293b',
    borderRadius: 24,
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#3b82f6',
    marginBottom: 24,
  },
  flipHint: {
    position: 'absolute',
    top: 14,
    color: '#64748b',
    fontSize: 11,
    fontWeight: '600',
  },
  cardFace: {
    alignItems: 'center',
  },
  cardFaceBack: {
    alignItems: 'center',
  },
  termText: {
    fontSize: 28,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 6,
  },
  termTextEs: {
    fontSize: 28,
    fontWeight: '900',
    color: '#38bdf8',
    marginBottom: 6,
  },
  langTag: {
    color: '#3b82f6',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
  },
  langTagEs: {
    color: '#38bdf8',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 16,
  },
  descText: {
    color: '#cbd5e1',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  controls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  controlBtn: {
    flex: 1,
    backgroundColor: '#1e293b',
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#334155',
  },
  controlBtnText: {
    color: '#94a3b8',
    fontWeight: '700',
    fontSize: 14,
  },
  nextBtn: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  nextBtnText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 14,
  },
});
