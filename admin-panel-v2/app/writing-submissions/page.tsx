'use client';
import { useState } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { Card, Btn, Badge, Modal, Empty, Spinner, useToast, Toast } from '@/components/ui';
import { PenTool, Eye, CheckCircle2 } from 'lucide-react';
import { useApi, useMutation } from '@/lib';
import { writingSubmissionsApi } from '@/lib/endpoints/writingSubmissions';
import type { WritingSubmission } from '@/lib/endpoints/writingSubmissions';

// ─── Review Modal ───────────────────────────────────────────────────────────
function ReviewModal({ submission, onSave, onClose, loading }: {
  submission: WritingSubmission;
  onSave: (feedback: string, grade: number | null) => void;
  onClose: () => void;
  loading: boolean;
}) {
  const [feedback, setFeedback] = useState(submission.feedback || '');
  const [grade, setGrade]       = useState(submission.grade != null ? String(submission.grade) : '');

  return (
    <div className="flex flex-col gap-4">
      {/* Student info */}
      <div className="rounded-xl p-3 text-xs" style={{ background: 'var(--bg)', border: '1px solid var(--border)' }}>
        <p style={{ color: 'var(--text)' }}><strong>{submission.student_name}</strong> · {submission.student_email}</p>
        <p style={{ color: 'var(--text-muted)' }} className="mt-1">{submission.test_title} · {submission.word_count} words</p>
      </div>

      {/* Prompt */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Prompt
        </label>
        <div className="rounded-xl p-3 text-sm" style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}>
          {submission.prompt}
        </div>
      </div>

      {/* Student's response */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Student's Response
        </label>
        <div className="rounded-xl p-4 text-sm leading-relaxed whitespace-pre-wrap max-h-80 overflow-y-auto"
          style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text)' }}>
          {submission.response || <span style={{ color: 'var(--text-dim)' }}>No response submitted</span>}
        </div>
      </div>

      {/* Grade + Feedback */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Grade (out of 20, optional)
        </label>
        <input
          type="number"
          min="0"
          max="20"
          value={grade}
          onChange={e => setGrade(e.target.value)}
          placeholder="e.g. 16"
          className="px-3 py-2.5 rounded-xl text-sm border outline-none"
          style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-muted)' }}>
          Feedback for Student
        </label>
        <textarea
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          placeholder="Write feedback on structure, grammar, creativity, etc."
          rows={4}
          className="px-3 py-2.5 rounded-xl text-sm border outline-none resize-y"
          style={{ background: 'var(--bg)', borderColor: 'var(--border)', color: 'var(--text)' }}
        />
      </div>

      <div className="flex gap-2 justify-end pt-2">
        <Btn variant="ghost" onClick={onClose}>Cancel</Btn>
        <Btn onClick={() => onSave(feedback, grade ? parseFloat(grade) : null)} loading={loading}>
          Mark as Reviewed
        </Btn>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WritingSubmissionsPage() {
  const { data: submissions, loading, refetch } = useApi(() => writingSubmissionsApi.list());
  const { mutate: reviewSubmission, loading: reviewing } = useMutation(
    (id: string, payload: { feedback: string; grade: number | null }) => writingSubmissionsApi.review(id, payload)
  );

  const [viewing, setViewing]  = useState<WritingSubmission | null>(null);
  const { toasts, add: toast } = useToast();

  const handleReview = async (feedback: string, grade: number | null) => {
    if (!viewing) return;
    const res = await reviewSubmission(viewing._id, { feedback, grade });
    if (res) {
      toast('Submission reviewed');
      setViewing(null);
      refetch();
    } else {
      toast('Failed to save review', 'danger');
    }
  };

  const list: WritingSubmission[] = submissions || [];
  const pendingCount = list.filter(s => s.status === 'pending').length;

  return (
    <AdminLayout title="Writing Submissions">
      <div className="animate-fade-in space-y-5">

        {/* Header */}
        <div className="flex items-center justify-between">
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            {list.length} submission{list.length !== 1 ? 's' : ''} total
            {pendingCount > 0 && (
              <span className="ml-2 px-2 py-0.5 rounded-full text-xs font-bold"
                style={{ background: '#fef3c7', color: '#d97706' }}>
                {pendingCount} pending
              </span>
            )}
          </p>
        </div>

        {/* Table */}
        {loading ? <Spinner center /> : list.length === 0 ? (
          <Empty icon="✍️" text="No writing submissions yet." />
        ) : (
          <Card className="overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr style={{ background: 'var(--bg)' }}>
                    {['Student', 'Test', 'Words', 'Submitted', 'Status', 'Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold uppercase tracking-wider border-b"
                        style={{ color: 'var(--text-muted)', borderColor: 'var(--border)' }}>
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {list.map((s: WritingSubmission) => (
                    <tr key={s._id} className="border-b transition-colors"
                      style={{ borderColor: 'var(--border)' }}
                      onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--bg)'}
                      onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>

                      {/* Student */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                            style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                            <PenTool size={13} />
                          </div>
                          <div>
                            <p className="font-semibold text-sm" style={{ color: 'var(--text)' }}>{s.student_name}</p>
                            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.student_email}</p>
                          </div>
                        </div>
                      </td>

                      {/* Test */}
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text)' }}>
                        {s.test_title}
                      </td>

                      {/* Words */}
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {s.word_count}
                      </td>

                      {/* Submitted */}
                      <td className="px-4 py-3 text-xs" style={{ color: 'var(--text-muted)' }}>
                        {s.submitted_at
                          ? new Date(s.submitted_at).toLocaleDateString('en-AU', { day: 'numeric', month: 'short', year: 'numeric' })
                          : '—'}
                      </td>

                      {/* Status */}
                      <td className="px-4 py-3">
                        <Badge type={s.status === 'reviewed' ? 'success' : 'default'}>
                          {s.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                        </Badge>
                      </td>

                      {/* Action */}
                      <td className="px-4 py-3">
                        <Btn size="sm" variant="secondary" onClick={() => setViewing(s)}>
                          {s.status === 'reviewed' ? <CheckCircle2 size={12} /> : <Eye size={12} />}
                          {s.status === 'reviewed' ? ' Reviewed' : ' Review'}
                        </Btn>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </div>

      {/* Review Modal */}
      {viewing && (
        <Modal open={!!viewing} onClose={() => setViewing(null)} title="Review Writing Submission" maxWidth={640}>
          <ReviewModal
            submission={viewing}
            onSave={handleReview}
            onClose={() => setViewing(null)}
            loading={reviewing}
          />
        </Modal>
      )}

      <Toast toasts={toasts} />
    </AdminLayout>
  );
}