import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { UserProfile, Course, Book, TestMode } from './src/types';
import { LoginScreen } from './src/screens/LoginScreen';
import { HomeScreen } from './src/screens/HomeScreen';
import { LmsCatalogScreen } from './src/screens/LmsCatalogScreen';
import { BookReaderScreen } from './src/screens/BookReaderScreen';
import { NclexHubScreen } from './src/screens/NclexHubScreen';
import { TestRunnerScreen } from './src/screens/TestRunnerScreen';
import { TestReportScreen } from './src/screens/TestReportScreen';
import { AnalyticsScreen } from './src/screens/AnalyticsScreen';
import { FlashcardsScreen } from './src/screens/FlashcardsScreen';

type ScreenState =
  | 'LOGIN'
  | 'HOME'
  | 'LMS_CATALOG'
  | 'BOOK_READER'
  | 'NCLEX_HUB'
  | 'TEST_RUNNER'
  | 'TEST_REPORT'
  | 'ANALYTICS'
  | 'FLASHCARDS';

export default function App() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('LOGIN');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [activeTestMode, setActiveTestMode] = useState<TestMode>('CAT');
  const [testResults, setTestResults] = useState<any>(null);

  const mockCourses: Course[] = [
    {
      course_id: 'c-1',
      name: 'Fundamentos de Enfermería NCLEX-RN',
      description: 'Módulo semana a semana de anatomía, fisiología, cálculo de dosis y ética clínica.',
      order_index: 1,
      total_books: 12,
      completed_books: 3,
      cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop'
    },
    {
      course_id: 'c-2',
      name: 'Farmacología Clínica & Administración Segura',
      description: 'Mecanismos de acción, efectos adversos, antídotos y consideraciones de enfermería.',
      order_index: 2,
      total_books: 15,
      completed_books: 0,
      cover_image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop'
    }
  ];

  const handleLoginSuccess = (profile: UserProfile) => {
    setUser(profile);
    setCurrentScreen('HOME');
  };

  const handleSelectBook = (book: Book) => {
    setSelectedBook(book);
    setCurrentScreen('BOOK_READER');
  };

  const handleStartTest = (mode: TestMode) => {
    setActiveTestMode(mode);
    setCurrentScreen('TEST_RUNNER');
  };

  const handleFinishTest = (results: any) => {
    setTestResults(results);
    setCurrentScreen('TEST_REPORT');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {!user || currentScreen === 'LOGIN' ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : currentScreen === 'HOME' ? (
        <HomeScreen
          user={user}
          courses={mockCourses}
          onNavigateToLms={() => setCurrentScreen('LMS_CATALOG')}
          onNavigateToNclex={() => setCurrentScreen('NCLEX_HUB')}
          onNavigateToAnalytics={() => setCurrentScreen('ANALYTICS')}
          onNavigateToFlashcards={() => setCurrentScreen('FLASHCARDS')}
        />
      ) : currentScreen === 'LMS_CATALOG' ? (
        <LmsCatalogScreen
          onSelectBook={handleSelectBook}
          onBack={() => setCurrentScreen('HOME')}
        />
      ) : currentScreen === 'BOOK_READER' && selectedBook ? (
        <BookReaderScreen
          book={selectedBook}
          userId={user.id}
          onBack={() => setCurrentScreen('LMS_CATALOG')}
          onStartQuiz={() => handleStartTest('CAT')}
        />
      ) : currentScreen === 'NCLEX_HUB' ? (
        <NclexHubScreen
          onStartTest={handleStartTest}
          onBack={() => setCurrentScreen('HOME')}
        />
      ) : currentScreen === 'TEST_RUNNER' ? (
        <TestRunnerScreen
          mode={activeTestMode}
          onFinishTest={handleFinishTest}
          onCancel={() => setCurrentScreen('NCLEX_HUB')}
        />
      ) : currentScreen === 'TEST_REPORT' && testResults ? (
        <TestReportScreen
          results={testResults}
          onDone={() => setCurrentScreen('HOME')}
        />
      ) : currentScreen === 'ANALYTICS' ? (
        <AnalyticsScreen
          user={user}
          onBack={() => setCurrentScreen('HOME')}
        />
      ) : currentScreen === 'FLASHCARDS' ? (
        <FlashcardsScreen onBack={() => setCurrentScreen('HOME')} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
});
