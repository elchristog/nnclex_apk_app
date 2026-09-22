import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, SafeAreaView, ActivityIndicator } from 'react-native';
import { Course, Book } from '../types';
import { ApiService } from '../api/client';

interface LmsCatalogScreenProps {
  onSelectBook: (book: Book) => void;
  onBack: () => void;
}

export const LmsCatalogScreen: React.FC<LmsCatalogScreenProps> = ({ onSelectBook, onBack }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    setLoading(true);
    const data = await ApiService.getCourseCatalog();
    setCourses(data);
    if (data.length > 0) {
      handleSelectCourse(data[0]);
    }
    setLoading(false);
  };

  const handleSelectCourse = async (course: Course) => {
    setSelectedCourse(course);
    setLoading(true);
    const courseBooks = await ApiService.getCourseBooks(course.course_id);
    setBooks(courseBooks);
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onBack} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Módulo Didáctico LMS</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Horizontal Course Tabs */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabBar} contentContainerStyle={styles.tabBarContent}>
        {courses.map((course) => {
          const isActive = selectedCourse?.course_id === course.course_id;
          return (
            <TouchableOpacity
              key={course.course_id}
              style={[styles.tabItem, isActive && styles.tabItemActive]}
              onPress={() => handleSelectCourse(course)}
            >
              <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{course.name}</Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {loading ? (
        <View style={styles.loadingBox}>
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text style={styles.loadingText}>Cargando lecciones y libros...</Text>
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.bookList} showsVerticalScrollIndicator={false}>
          {selectedCourse && (
            <View style={styles.courseHeaderCard}>
              <Text style={styles.courseTitle}>{selectedCourse.name}</Text>
              <Text style={styles.courseDesc}>{selectedCourse.description}</Text>
            </View>
          )}

          <Text style={styles.sectionHeading}>Libros y Lecciones Semanales</Text>

          {books.map((book) => (
            <TouchableOpacity
              key={book.book_id}
              style={styles.bookCard}
              onPress={() => onSelectBook(book)}
              activeOpacity={0.8}
            >
              <Image
                source={{ uri: book.cover_image_url || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop' }}
                style={styles.bookCover}
              />

              <View style={styles.bookInfo}>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>⏱️ {book.duration_minutes} min</Text>
                </View>

                <Text style={styles.bookTitle}>{book.name}</Text>
                <Text style={styles.bookSub}>Lección didáctica interactiva + 50 Preguntas IRT</Text>

                <View style={styles.readActionRow}>
                  <Text style={styles.readActionText}>Estudiar Libro →</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
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
    paddingHorizontal: 10,
  },
  backBtnText: {
    color: '#3b82f6',
    fontWeight: '700',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#ffffff',
  },
  tabBar: {
    maxHeight: 52,
    backgroundColor: '#0f172a',
  },
  tabBarContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
    gap: 8,
  },
  tabItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#1e293b',
  },
  tabItemActive: {
    backgroundColor: '#2563eb',
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#ffffff',
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
  bookList: {
    padding: 20,
  },
  courseHeaderCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#334155',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 6,
  },
  courseDesc: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18,
  },
  sectionHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#94a3b8',
    marginBottom: 14,
  },
  bookCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#334155',
  },
  bookCover: {
    width: 100,
    height: '100%',
    minHeight: 120,
  },
  bookInfo: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  durationBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#0f172a',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginBottom: 6,
  },
  durationText: {
    color: '#3b82f6',
    fontSize: 11,
    fontWeight: '700',
  },
  bookTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#ffffff',
    marginBottom: 4,
  },
  bookSub: {
    fontSize: 12,
    color: '#94a3b8',
    marginBottom: 8,
  },
  readActionRow: {
    alignSelf: 'flex-end',
  },
  readActionText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#38bdf8',
  },
});
