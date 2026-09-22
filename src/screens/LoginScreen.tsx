import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
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
      <View style={styles.content}>
        {/* Logo and Branding Header */}
        <View style={styles.brandContainer}>
          <AppLogo size={96} borderWidth={3} style={{ marginBottom: 18 }} />
          <Text style={styles.title}>RNN CLEX</Text>
          <Text style={styles.subtitle}>
            Preparación Bilingüe Especializada para el <Text style={styles.highlightText}>NCLEX-RN®</Text>
          </Text>
        </View>

        {/* Bilingue Value Proposition Card */}
        <View style={styles.card}>
          <View style={styles.badgeContainer}>
            <Text style={styles.badgeText}>🌍 Método Bilingüe Gradual</Text>
          </View>
          <Text style={styles.cardHeadline}>
            Domina la terminología médica en inglés sin barreras de idioma
          </Text>
          <Text style={styles.cardBody}>
            Estudia conceptos complejos en español mientras asimilas progresivamente la terminología clínica clave y las estructuras de preguntas en inglés requeridas para el NCLEX-RN.
          </Text>
          
          <View style={styles.featureRow}>
            <Text style={styles.featureBullet}>✓ Simulaciones adaptativas CAT & Casos NGN</Text>
            <Text style={styles.featureBullet}>✓ Glosario médico bilingüe e ilustraciones con IA</Text>
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
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png' }}
                  style={styles.googleIcon}
                  resizeMode="contain"
                />
                <Text style={styles.googleButtonText}>Iniciar Sesión con Google</Text>
              </>
            )}
          </TouchableOpacity>
          <Text style={styles.disclaimerText}>
            Acceso seguro mediante autenticación directa con tu cuenta de Google.
          </Text>
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
  content: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  title: {
    fontSize: 32,
    fontWeight: '900',
    color: '#ffffff',
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 15,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 12,
  },
  highlightText: {
    color: '#3b82f6',
    fontWeight: '800',
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 28,
  },
  badgeContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#1e1b4b',
    borderColor: '#6366f1',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 10,
  },
  badgeText: {
    color: '#818cf8',
    fontSize: 12,
    fontWeight: '700',
  },
  cardHeadline: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
    lineHeight: 22,
  },
  cardBody: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 19,
    marginBottom: 12,
  },
  featureRow: {
    borderTopWidth: 1,
    borderTopColor: '#334155',
    paddingTop: 10,
    gap: 4,
  },
  featureBullet: {
    fontSize: 12,
    color: '#38bdf8',
    fontWeight: '600',
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
    height: 54,
    borderRadius: 14,
    marginBottom: 12,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 12,
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
    marginTop: 2,
  },
});
