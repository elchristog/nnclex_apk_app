import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { UserProfile, Course } from '../types';

interface HomeScreenProps {
  user: UserProfile;
  courses: Course[];
  onNavigateToLms: () => void;
  onNavigateToNclex: () => void;
  onNavigateToAnalytics: () => void;
  onNavigateToFlashcards: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  user,
  courses,
  onNavigateToLms,
  onNavigateToNclex,
  onNavigateToAnalytics,
  onNavigateToFlashcards,
}) => {
  const activeCourse = courses[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* User Header Bar */}
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: user.photoUrl || 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&auto=format&fit=crop' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.greeting}>¡Hola, {user.name.split(' ')[1] || 'Enfermera'}! 👋</Text>
              <Text style={styles.badgeText}>{user.examType} Candidate</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.streakBadge} onPress={onNavigateToAnalytics}>
            <Text style={styles.streakFire}>🔥</Text>
            <Text style={styles.streakCount}>{user.streakDays} días</Text>
          </TouchableOpacity>
        </View>

        {/* Readiness Predictor Banner */}
        <TouchableOpacity style={styles.readinessCard} onPress={onNavigateToAnalytics} activeOpacity={0.85}>
          <View style={styles.readinessHeader}>
            <Text style={styles.readinessTitle}>Probabilidad de Aprobación NCLEX</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusBadgeText}>{user.readyForExamStatus}</Text>
            </View>
          </View>

          <View style={styles.metricRow}>
            <View style={styles.metricCol}>
              <Text style={styles.metricValue}>+{(user.thetaAbility).toFixed(2)}</Text>
              <Text style={styles.metricLabel}>Nivel de Habilidad (θ)</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricCol}>
              <Text style={styles.metricValue}>{user.overallAccuracy}%</Text>
              <Text style={styles.metricLabel}>Precisión Global</Text>
            </View>
            <View style={styles.metricDivider} />
            <View style={styles.metricCol}>
              <Text style={styles.metricValue}>{user.totalQuestionsAnswered}</Text>
              <Text style={styles.metricLabel}>Preguntas Resueltas</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Active LMS Course Preview */}
        {activeCourse && (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Curso didáctico en curso</Text>
              <TouchableOpacity onPress={onNavigateToLms}>
                <Text style={styles.seeAllText}>Ver catálogo</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.courseBanner} onPress={onNavigateToLms} activeOpacity={0.85}>
              <Image
                source={{ uri: activeCourse.cover_image_url || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop' }}
                style={styles.courseBannerImage}
              />
              <View style={styles.courseBannerOverlay}>
                <Text style={styles.courseCategory}>MODULO SEMANAL 1</Text>
                <Text style={styles.courseBannerTitle}>{activeCourse.name}</Text>
                <Text style={styles.courseBannerDesc} numberOfLines={2}>
                  {activeCourse.description}
                </Text>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: '35%' }]} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}

        {/* Quick Launch Evaluation Modes */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Simulaciones & Evaluaciones NCLEX</Text>

          <View style={styles.gridContainer}>
            <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#1e1b4b' }]} onPress={onNavigateToNclex}>
              <Text style={styles.gridIcon}>⚡</Text>
              <Text style={styles.gridCardTitle}>Simulador CAT</Text>
              <Text style={styles.gridCardDesc}>Examen adaptativo 85-150 preguntas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#064e3b' }]} onPress={onNavigateToNclex}>
              <Text style={styles.gridIcon}>🩺</Text>
              <Text style={styles.gridCardTitle}>Casos NGN</Text>
              <Text style={styles.gridCardDesc}>Juicio clínico con Expediente EHR</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#451a03' }]} onPress={onNavigateToNclex}>
              <Text style={styles.gridIcon}>🎯</Text>
              <Text style={styles.gridCardTitle}>Puntos Débiles</Text>
              <Text style={styles.gridCardDesc}>Refuerzo focalizado por categoría</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#312e81' }]} onPress={onNavigateToFlashcards}>
              <Text style={styles.gridIcon}>🎴</Text>
              <Text style={styles.gridCardTitle}>Flashcards</Text>
              <Text style={styles.gridCardDesc}>Vocabulario médico bilingüe</Text>
            </TouchableOpacity>
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
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
    borderWidth: 2,
    borderColor: '#3b82f6',
  },
  greeting: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  badgeText: {
    fontSize: 12,
    color: '#3b82f6',
    fontWeight: '600',
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  streakFire: {
    fontSize: 16,
    marginRight: 4,
  },
  streakCount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#f97316',
  },
  readinessCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2563eb',
    marginBottom: 28,
  },
  readinessHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  readinessTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#94a3b8',
  },
  statusBadge: {
    backgroundColor: '#166534',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#4ade80',
    fontSize: 12,
    fontWeight: '800',
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  metricCol: {
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  metricLabel: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 2,
  },
  metricDivider: {
    width: 1,
    height: 28,
    backgroundColor: '#334155',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  seeAllText: {
    fontSize: 13,
    color: '#3b82f6',
    fontWeight: '600',
  },
  courseBanner: {
    height: 180,
    borderRadius: 18,
    overflow: 'hidden',
    position: 'relative',
  },
  courseBannerImage: {
    width: '100%',
    height: '100%',
  },
  courseBannerOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(15, 23, 42, 0.82)',
    padding: 16,
    justifyContent: 'flex-end',
  },
  courseCategory: {
    fontSize: 10,
    fontWeight: '800',
    color: '#3b82f6',
    letterSpacing: 1,
    marginBottom: 4,
  },
  courseBannerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  courseBannerDesc: {
    fontSize: 12,
    color: '#cbd5e1',
    marginBottom: 12,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#334155',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#3b82f6',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  gridCard: {
    width: '48%',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  gridIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  gridCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  gridCardDesc: {
    fontSize: 11,
    color: '#94a3b8',
    lineHeight: 14,
  },
});
