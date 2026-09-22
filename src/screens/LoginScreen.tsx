import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator, ScrollView } from 'react-native';
import { UserProfile } from '../types';
import { AppLogo } from '../components/AppLogo';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    // Simulating Google Sign-In OAuth flow
    setTimeout(() => {
      setLoading(false);
      const mockUser: UserProfile = {
        id: 'usr-google-101',
        email: 'enfermera.estudiante@gmail.com',
        name: 'Lic. María González, RN',
        photoUrl: 'https://rnnclex.com/wp-content/uploads/2025/06/rn_nclex_logo_large-300x300.webp',
        examType: 'NCLEX-RN',
        studyLanguagePreference: 'ES',
        streakDays: 5,
        thetaAbility: 0.85,
        totalQuestionsAnswered: 340,
        overallAccuracy: 78.4,
        readyForExamStatus: 'High',
      };
      onLoginSuccess(mockUser);
    }, 1200);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          {/* Logo and Branding Header */}
          <View style={styles.brandContainer}>
            <AppLogo size={90} borderWidth={3} style={{ marginBottom: 14 }} />
            <Text style={styles.title}>RNNCLEX</Text>
            <Text style={styles.subtitle}>
              Plataforma Bilingüe Especializada para pasar tu <Text style={styles.highlightText}>NCLEX-RN®</Text>
            </Text>
          </View>

          {/* Visual Value Proposition Cards Grid */}
          <View style={styles.valueGrid}>
            <View style={styles.valueCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(99, 102, 241, 0.15)' }]}>
                <Text style={styles.cardEmoji}>🇪🇸 ➔ 🇺🇸</Text>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Español a Inglés</Text>
                <Text style={styles.cardDesc}>Estudia en español mientras aprendes la terminología en inglés sin frustración.</Text>
              </View>
            </View>

            <View style={styles.valueCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(59, 130, 246, 0.15)' }]}>
                <Text style={styles.cardEmoji}>🩺</Text>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Vocabulario Clínico</Text>
                <Text style={styles.cardDesc}>Asimila términos médicos clave paso a paso con lecciones e ilustraciones interactivas.</Text>
              </View>
            </View>

            <View style={styles.valueCard}>
              <View style={[styles.iconCircle, { backgroundColor: 'rgba(16, 185, 129, 0.15)' }]}>
                <Text style={styles.cardEmoji}>⚡</Text>
              </View>
              <View style={styles.cardTextContainer}>
                <Text style={styles.cardTitle}>Simulaciones NGN & CAT</Text>
                <Text style={styles.cardDesc}>Practica con preguntas reales adaptativas y casos clínicos de Nueva Generación.</Text>
              </View>
            </View>
          </View>

          {/* Exclusive Google Sign-In Action */}
          <View style={styles.authActionContainer}>
            <TouchableOpacity
              style={styles.googleButton}
              onPress={handleGoogleSignIn}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color="#0b0f19" />
              ) : (
                <>
                  <Image
                    source={require('../../assets/google_g_logo.png')}
                    style={styles.googleIcon}
                    resizeMode="contain"
                  />
                  <Text style={styles.googleButtonText}>Iniciar Sesión con Google</Text>
                </>
              )}
            </TouchableOpacity>
            <Text style={styles.disclaimerText}>
              Acceso directo y seguro con tu cuenta de Google.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0b0f19',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingVertical: 24,
  },
  content: {
    paddingHorizontal: 20,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 34,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 4,
    letterSpacing: 1,
  },
  subtitle: {
    fontSize: 14,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 8,
  },
  highlightText: {
    color: '#3b82f6',
    fontWeight: '800',
  },
  valueGrid: {
    gap: 10,
    marginBottom: 26,
  },
  valueCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  iconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardEmoji: {
    fontSize: 20,
  },
  cardTextContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 16,
  },
  authActionContainer: {
    alignItems: 'center',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    width: '100%',
    height: 52,
    borderRadius: 14,
    marginBottom: 10,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  googleIcon: {
    width: 22,
    height: 22,
    marginRight: 10,
  },
  googleButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  disclaimerText: {
    fontSize: 12,
    color: '#64748b',
    textAlign: 'center',
  },
});
