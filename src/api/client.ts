import { Course, Book, ContentBlock, Question, TestAttempt } from '../types';

// API Base URLs
const FASTAPI_BASE_URL = 'https://enfermera-en-usa-frontend-989579164577.us-central1.run.app';

export class ApiService {
  /**
   * Run custom BigQuery SQL queries through backend
   */
  static async executeQuery<T = any>(sqlQuery: string): Promise<T[]> {
    try {
      const response = await fetch(`${FASTAPI_BASE_URL}/execute_query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: sqlQuery }),
      });
      if (!response.ok) {
        throw new Error(`Query failed with status ${response.status}`);
      }
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.warn('Backend execute_query fallback:', error);
      return [];
    }
  }

  /**
   * Fetch Course Catalog from dim_courses
   */
  static async getCourseCatalog(): Promise<Course[]> {
    const sql = `
      SELECT course_id, creator_id, category_id, age_id, name, description, order_index, cover_image_url, locked_by_previous_course 
      FROM \`company-data-driven.lms.dim_courses\` 
      ORDER BY order_index ASC
    `;
    const courses = await this.executeQuery<Course>(sql);
    if (courses.length > 0) return courses;

    // Default fallback sample courses if DB query pending
    return [
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
      },
      {
        course_id: 'c-3',
        name: 'Enfermería Medicoquirúrgica & Caso Clínico NGN',
        description: 'Cuidados cardíacos, respiratorios, renales y evaluación de juicio clínico de nueva generación.',
        order_index: 3,
        total_books: 20,
        completed_books: 0,
        cover_image_url: 'https://images.unsplash.com/photo-1551076805-e1869033e561?w=600&auto=format&fit=crop'
      }
    ];
  }

  /**
   * Fetch Books inside a Course
   */
  static async getCourseBooks(courseId: string): Promise<Book[]> {
    const sql = `
      SELECT book_id, course_id, name, duration_minutes, order_within_course, cover_image_url, locked_by_previous_book 
      FROM \`company-data-driven.lms.dim_books\` 
      WHERE course_id = '${courseId}' 
      ORDER BY order_within_course ASC
    `;
    const books = await this.executeQuery<Book>(sql);
    if (books.length > 0) return books;

    return [
      {
        book_id: 'b-101',
        course_id: courseId,
        name: 'Semana 1: Balance Hidroelectrolítico y Gasometría Arterial',
        duration_minutes: 30,
        order_within_course: 1,
        cover_image_url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&auto=format&fit=crop'
      },
      {
        book_id: 'b-102',
        course_id: courseId,
        name: 'Semana 2: Farmacología Cardiovascular & Antihipertensivos',
        duration_minutes: 45,
        order_within_course: 2,
        cover_image_url: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&auto=format&fit=crop'
      }
    ];
  }

  /**
   * Fetch Content Blocks for a specific Book
   */
  static async getBookContent(bookId: string): Promise<ContentBlock[]> {
    try {
      const response = await fetch(`${FASTAPI_BASE_URL}/api/contenido-libro/${bookId}`);
      if (response.ok) {
        const blocks = await response.json();
        if (Array.isArray(blocks) && blocks.length > 0) return blocks;
      }
    } catch (e) {
      console.warn('Error fetching book content from endpoint:', e);
    }

    const sql = `
      SELECT block_id, book_id, sequence_order, text_es, text_en, image_url, image_prompt 
      FROM \`company-data-driven.lms.content_blocks\` 
      WHERE book_id = '${bookId}' 
      ORDER BY sequence_order ASC
    `;
    const dbBlocks = await this.executeQuery<ContentBlock>(sql);
    if (dbBlocks.length > 0) return dbBlocks;

    // Default sample content blocks
    return [
      {
        block_id: 'block-1',
        book_id: bookId,
        sequence_order: 1,
        text_es: '🧪 **Balance de Sodio (Na+) y Potasio (K+)**: El potasio es el principal catión intracelular (rango normal: 3.5 a 5.0 mEq/L). La hipopotasemia severa (<3.0 mEq/L) causa aplanamiento de onda T y presencia de onda U en el electrocardiograma.',
        text_en: '🧪 **Sodium (Na+) and Potassium (K+) Balance**: Potassium is the primary intracellular cation (normal range: 3.5 to 5.0 mEq/L). Severe hypokalemia (<3.0 mEq/L) causes T-wave flattening and U-wave presence on ECG.',
        image_url: 'https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=600&auto=format&fit=crop'
      },
      {
        block_id: 'block-2',
        book_id: bookId,
        sequence_order: 2,
        text_es: '⚡ **Intervención Prioritaria de Enfermería en Hiperpotasemia**: Administrar gluconato de calcio IV para estabilizar el miocardio, seguido de insulina regular IV con dextrosa al 50% para desplazar el potasio al interior celular.',
        text_en: '⚡ **Priority Nursing Intervention in Hyperkalemia**: Administer IV Calcium Gluconate to stabilize myocardium, followed by IV Regular Insulin with Dextrose 50% to shift potassium intracellularly.',
        image_url: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&auto=format&fit=crop'
      }
    ];
  }

  /**
   * Ask Gemini AI Tutor regarding the current lesson/book context
   */
  static async askAITutor(userId: string, bookId: string, question: string): Promise<string> {
    try {
      const response = await fetch(`${FASTAPI_BASE_URL}/api/tutor`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, book_id: bookId, question }),
      });
      if (response.ok) {
        const data = await response.json();
        return data.response;
      }
    } catch (e) {
      console.warn('AI Tutor endpoint error:', e);
    }
    return 'En respuesta a tu duda clínica: Recuerda siempre evaluar primero la vía aérea (Airway), Ventilación (Breathing) y Circulación (Circulation) antes de administrar cualquier tratamiento de emergencia.';
  }

  /**
   * Fetch questions for tests (CAT, NGN, Readiness, Custom, Weak Points)
   */
  static async fetchQuestions(subject?: string, limit: number = 20): Promise<Question[]> {
    let sql = `
      SELECT question_id, book_id, general_exam_id, question_text, options, correct_option, explanation, difficulty_level, subject, exam_name, lesson 
      FROM \`company-data-driven.lms.dim_questions\`
    `;
    if (subject) {
      sql += ` WHERE subject = '${subject}'`;
    }
    sql += ` LIMIT ${limit}`;

    const rawRows = await this.executeQuery<any>(sql);
    if (rawRows.length > 0) {
      return rawRows.map((r) => ({
        ...r,
        options: typeof r.options === 'string' ? JSON.parse(r.options) : r.options || {},
        difficulty_level: parseFloat(r.difficulty_level) || 0.5,
      }));
    }

    // Default NCLEX and NGN Sample Questions
    return [
      {
        question_id: 'q-ngn-bowtie-1',
        type: 'ngn_bowtie',
        subject: 'Farmacología & Cuidados Críticos',
        question_text: 'Un paciente con insuficiencia cardíaca aguda presenta disnea severa, estertores crepitantes bilaterales y edema +3 en miembros inferiores. Revisa las intervenciones y completa el diagrama Bowtie.',
        options: {},
        correct_option: 'a',
        explanation: 'La condición principal es Edema Agudo de Pulmón secundario a falla cardíaca. La acción prioritaria es la administración de Furosemida IV y Furosemida a infusión continua, monitoreando la diuresis y los niveles de potasio.',
        difficulty_level: 0.75,
        bowtie_condition_options: ['Edema Agudo de Pulmón', 'Embolia Pulmonar', 'Neumonía Bacteriana', 'Neumotórax a Tensión'],
        bowtie_action_options: ['Administrar Furosemida IV 40mg', 'Colocar en posición Fowler alta', 'Iniciar Heparina IV', 'Insertar tubo de tórax'],
        bowtie_parameter_options: ['Gasto Urinario por Hora', 'Potasio Sérico', 'Tiempos de Coagulación (aPTT)', 'Recuento de Blancos'],
        bowtie_correct: {
          condition: 'Edema Agudo de Pulmón',
          actions: ['Administrar Furosemida IV 40mg', 'Colocar en posición Fowler alta'],
          parameters: ['Gasto Urinario por Hora', 'Potasio Sérico']
        },
        ehr: {
          nurses_notes: 'Paciente angustiado, diaforético. FR 28 rpm, SpO2 88% al aire ambiente.',
          vital_signs: [{ time: '08:00', temp: '36.8°C', hr: '112 bpm', rr: '28 rpm', bp: '162/98 mmHg', spo2: '88%' }],
          lab_results: [{ test: 'BNP', result: '1450 pg/mL', reference_range: '<100 pg/mL', status: 'critical' }]
        }
      },
      {
        question_id: 'q-trad-1',
        type: 'multiple_choice',
        subject: 'Fundamentos de Enfermería',
        question_text: 'Una enfermera evalúa a un paciente recibiendo Digoxina 0.25 mg VO al día. ¿Cuál hallazgo requiere la suspensión inmediata del medicamento y notificación al médico?',
        options: {
          a: 'Frecuencia cardíaca apical de 52 latidos por minuto',
          b: 'Presión arterial de 130/84 mmHg',
          c: 'Gasto urinario de 40 mL por hora',
          d: 'Frecuencia respiratoria de 18 respiraciones por minuto'
        },
        correct_option: 'a',
        explanation: 'La Digoxina es un inotrópico positivo y cronotrópico negativo. Debe retenerse si la frecuencia cardíaca apical en adultos es menor a 60 bpm por riesgo de toxicidad digitálica.',
        difficulty_level: 0.4
      },
      {
        question_id: 'q-sata-1',
        type: 'select_all_that_apply',
        subject: 'Maternidad & Recién Nacido',
        question_text: '¿Cuáles signos y síntomas sugieren Preeclampsia Severa en una gestante de 34 semanas? (Selecciona todas las que apliquen)',
        options: {
          a: 'Cefalea frontal persistente que no cede con analgésicos',
          b: 'Visión borrosa y fosfenos (luces centelleantes)',
          c: 'Dolor en epigastrio o cuadrante superior derecho',
          d: 'Bradicardia materna <50 bpm',
          e: 'Plaquetopenia (<100,000 /mm³)'
        },
        correct_option: ['a', 'b', 'c', 'e'],
        explanation: 'La preeclampsia severa involucra vasoespasmo multiorgánico manifestado por cefalea (sistema nervioso), escotomas/fosfenos (retina), dolor epigástrico (estiramiento de la cápsula de Glisson hepática) y trombocitopenia.',
        difficulty_level: 0.65
      }
    ];
  }
}
