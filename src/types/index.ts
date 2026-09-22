export interface UserProfile {
  id: string;
  email: string;
  name: string;
  photoUrl?: string;
  examType: 'NCLEX-RN' | 'NCLEX-PN';
  targetExamDate?: string;
  studyLanguagePreference: 'ES' | 'EN';
  streakDays: number;
  thetaAbility: number; // IRT Theta ability level (-3.0 to +3.0)
  totalQuestionsAnswered: number;
  overallAccuracy: number;
  readyForExamStatus: 'High' | 'Very High' | 'Borderline' | 'Low';
}

export interface Course {
  course_id: string;
  creator_id?: string;
  category_id?: string;
  age_id?: string;
  name: string;
  description: string;
  order_index: number;
  cover_image_url?: string;
  locked_by_previous_course?: boolean;
  total_books?: number;
  completed_books?: number;
}

export interface Book {
  book_id: string;
  course_id: string;
  name: string;
  duration_minutes: number;
  order_within_course: number;
  cover_image_url?: string;
  locked_by_previous_book?: boolean;
  is_completed?: boolean;
}

export interface ContentBlock {
  block_id: string;
  book_id: string;
  sequence_order: number;
  text_es: string;
  text_en: string;
  image_url?: string;
  image_prompt?: string;
}

export type QuestionType =
  | 'multiple_choice'
  | 'select_all_that_apply'
  | 'ngn_matrix'
  | 'ngn_drag_drop'
  | 'ngn_highlight'
  | 'ngn_bowtie'
  | 'ngn_dropdown';

export interface QuestionOption {
  key: string; // e.g. "a", "b", "c", "d"
  text: string;
}

export interface EHRData {
  nurses_notes?: string;
  vital_signs?: { time: string; temp: string; hr: string; rr: string; bp: string; spo2: string }[];
  lab_results?: { test: string; result: string; reference_range: string; status?: 'normal' | 'abnormal' | 'critical' }[];
  history_and_physical?: string;
}

export interface Question {
  question_id: string;
  book_id?: string;
  general_exam_id?: string;
  type?: QuestionType;
  question_text: string;
  options: Record<string, string>; // {"a": "...", "b": "..."}
  correct_option: string | string[]; // Single key "a" or array of keys ["a", "c"] for SATA
  explanation: string;
  difficulty_level: number; // 0.1 to 1.0 (or IRT b parameter)
  subject: string;
  exam_name?: string;
  lesson?: string;
  ehr?: EHRData;
  // NGN specific payloads
  matrix_rows?: string[];
  matrix_columns?: string[];
  matrix_correct?: Record<string, string>; // { "row_0": "col_1" }
  drag_items?: string[];
  drag_targets?: string[];
  drag_correct?: Record<string, string>;
  highlight_text?: string;
  highlight_correct_spans?: number[][]; // [[start, end], [start, end]]
  bowtie_condition_options?: string[];
  bowtie_action_options?: string[];
  bowtie_parameter_options?: string[];
  bowtie_correct?: { condition: string; actions: string[]; parameters: string[] };
}

export type TestMode =
  | 'CAT'
  | 'NGN_CASE_STUDIES'
  | 'READINESS'
  | 'WEAK_POINTS'
  | 'CUSTOM'
  | 'DAILY_CHALLENGE';

export interface TestAttempt {
  attempt_id: string;
  mode: TestMode;
  start_time: string;
  end_time?: string;
  total_questions: number;
  correct_count: number;
  theta_score: number;
  pass_probability: number;
  answers: Record<string, { user_answer: any; is_correct: boolean; time_spent_sec: number }>;
}

export interface TutorMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}
