import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native';
import { Book, ContentBlock } from '../types';
import { ApiService } from '../api/client';
import { AITutorModal } from '../components/lms/AITutorModal';

interface BookReaderScreenProps {
  book: Book;
  userId: string;
  onBack: () => void;
  onStartQuiz: (bookId: string) => void;
}

export const BookReaderScreen: React.FC<BookReaderScreenProps> = ({ book, userId, onBack, onStartQuiz }) => {
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [language, setLanguage] = useState<'ES' | 'EN'>('ES');
  const [loading, setLoading] = useState(true);
  const [showTutor, setShowTutor] = useState(false);

  useEffect(() => {
    loadContent();
  }, [book.book_id]);

  const loadContent = async () => {
    setLoading(true);
    const data = await ApiService.getBookContent(book.book_id);
    setBlocks(data);
    setLoading(false);
  };

  const currentBlock = blocks[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      {/* Reader Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle} numberOfLines={1}>
          {book.name}
        </Text>

        {/* Language Switcher */}
        <TouchableOpacity
          style={styles.langBadge}
          onPress={() => setLanguage((prev) => (prev === 'ES' ? 'EN' : 'ES'))}
        >
          <Text style={styles.langText}>🌐 {language}</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Cargando lecciones bilingües e ilustraciones IA...</Text>
        </View>
      ) : (
        <View style={styles.readerBody}>
          {/* Progress Indicator */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBarBg}>
              <View
                style={[
                  styles.progressBarFill,
                  { width: `${((currentIndex + 1) / Math.max(blocks.length, 1)) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              Tarjeta {currentIndex + 1} de {blocks.length}
            </Text>
          </View>

          {/* Current Card Content */}
          <ScrollView style={styles.cardScroll} contentContainerStyle={styles.cardContent}>
            {currentBlock?.image_url && (
              <Image source={{ uri: currentBlock.image_url }} style={styles.illustration} />
            )}

            <Text style={styles.lessonText}>
              {language === 'ES' ? currentBlock?.text_es : currentBlock?.text_en}
            </Text>
          </ScrollView>

          {/* Navigation Controls */}
          <View style={styles.footerNav}>
            <TouchableOpacity
              style={[styles.navBtn, currentIndex === 0 && styles.navBtnDisabled]}
              disabled={currentIndex === 0}
              onPress={() => setCurrentIndex((prev) => prev - 1)}
            >
              <Text style={styles.navBtnText}>← Anterior</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.aiTutorTrigger}
              onPress={() => setShowTutor(true)}
            >
              <Text style={styles.aiTutorTriggerText}>🤖 Tutor IA</Text>
            </TouchableOpacity>

            {currentIndex < blocks.length - 1 ? (
              <TouchableOpacity
                style={[styles.navBtn, styles.navBtnPrimary]}
                onPress={() => setCurrentIndex((prev) => prev + 1)}
              >
                <Text style={styles.navBtnTextPrimary}>Siguiente →</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={[styles.navBtn, styles.quizBtn]}
                onPress={() => onStartQuiz(book.book_id)}
              >
                <Text style={styles.quizBtnText}>Iniciar Quiz IRT 📝</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}

      {/* Floating AI Tutor Modal */}
      <AITutorModal
        visible={showTutor}
        bookId={book.book_id}
        userId={userId}
        onClose={() => setShowTutor(false)}
      />
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
    backgroundColor: '#0f172a',
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
    flex: 1,
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    textAlign: 'center',
    marginHorizontal: 8,
  },
  langBadge: {
    backgroundColor: '#1e293b',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  langText: {
    color: '#38bdf8',
    fontWeight: '800',
    fontSize: 12,
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
  readerBody: {
    flex: 1,
    padding: 16,
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#1e293b',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#2563eb',
  },
  progressText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'right',
    marginTop: 6,
  },
  cardScroll: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardContent: {
    paddingBottom: 20,
  },
  illustration: {
    width: '100%',
    height: 200,
    borderRadius: 14,
    marginBottom: 18,
    resizeMode: 'cover',
  },
  lessonText: {
    fontSize: 16,
    color: '#f8fafc',
    lineHeight: 26,
  },
  footerNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  navBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
  },
  navBtnDisabled: {
    opacity: 0.4,
  },
  navBtnText: {
    color: '#cbd5e1',
    fontWeight: '700',
    fontSize: 13,
  },
  navBtnPrimary: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  navBtnTextPrimary: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 13,
  },
  aiTutorTrigger: {
    backgroundColor: '#4c1d95',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  aiTutorTriggerText: {
    color: '#c084fc',
    fontWeight: '800',
    fontSize: 13,
  },
  quizBtn: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  quizBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 13,
  },
});
