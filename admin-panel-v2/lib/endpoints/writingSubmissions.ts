import { api } from '../api';

export interface WritingSubmission {
  _id: string;
  test_id: string;
  test_title: string;
  student_name: string;
  student_email: string;
  prompt: string;
  response: string;
  word_count: number;
  status: 'pending' | 'reviewed';
  feedback: string;
  grade: number | null;
  submitted_at: string;
}

export const writingSubmissionsApi = {
  list: async (): Promise<WritingSubmission[]> => {
    const { data } = await api.get('/api/admin/writing-submissions');
    return data.data;
  },
  review: async (id: string, payload: { feedback: string; grade?: number | null }): Promise<WritingSubmission> => {
    const { data } = await api.patch(`/api/admin/writing-submissions/${id}/review`, payload);
    return data.data;
  },
};