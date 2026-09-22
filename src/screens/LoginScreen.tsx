import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { UserProfile } from '../types';
import { AppLogo } from '../components/AppLogo';

interface LoginScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [examType, setExamType] = useState<'NCLEX-RN' | 'NCLEX-PN'>('NCLEX-RN');

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
        examType: examType,
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
          <AppLogo size={88} borderWidth={3} style={{ marginBottom: 16 }} />
          <Text style={styles.title}>RNN CLEX Mobile</Text>
          <Text style={styles.subtitle}>
            Prepárate para el NCLEX-RN / PN con simulaciones NGN, lecciones LMS interactivas y tutores con IA.
          </Text>
        </View>

        {/* Exam Selection Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Selecciona tu Examen Objetivo</Text>
          <View style={styles.selectorRow}>
            <TouchableOpacity
              style={[styles.selectorTab, examType === 'NCLEX-RN' && styles.selectorTabActive]}
              onPress={() => setExamType('NCLEX-RN')}
            >
              <Text style={[styles.selectorTabText, examType === 'NCLEX-RN' && styles.selectorTabTextActive]}>
                NCLEX-RN
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.selectorTab, examType === 'NCLEX-PN' && styles.selectorTabActive]}
              onPress={() => setExamType('NCLEX-PN')}
            >
              <Text style={[styles.selectorTabText, examType === 'NCLEX-PN' && styles.selectorTabTextActive]}>
                NCLEX-PN
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Exclusive Google Sign-In Action */}
        <View style={styles.authActionContainer}>
          <TouchableOpacity
            style={styles.googleButton}
            onPress={handleGoogleSignIn}
            disabled={loading}
            activeOpacity={0.8}
          >
            {loading ? (
              <ActivityIndicator color="#0b0f19" />
            ) : (
              <>
                <Image
                  source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.png' }}
                  style={styles.googleIcon}
                />
                <Text style={styles.googleButtonText}>Continuar con Google</Text>
              </>
            )}
          </TouchableOpacity>
          <Text style={styles.disclaimerText}>
            Acceso único seguro mediante autenticación directa con tu cuenta de Google.
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
    marginBottom: 36,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: '#3b82f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  logoText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: 12,
  },
  card: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 28,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    marginBottom: 14,
    textAlign: 'center',
  },
  selectorRow: {
    flexDirection: 'row',
    backgroundColor: '#0f172a',
    borderRadius: 12,
    padding: 4,
  },
  selectorTab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  selectorTabActive: {
    backgroundColor: '#2563eb',
  },
  selectorTabText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
  },
  selectorTabTextActive: {
    color: '#ffffff',
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
  },
  googleIcon: {
    width: 22,
    height: 22,
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
    marginTop: 4,
  },
});
