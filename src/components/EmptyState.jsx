import { BookOpenIcon, PlusIcon, SparklesIcon } from './Icons';

export default function EmptyState({ onOpenAddModal, onRestoreDefaults }) {
  return (
    <div className="empty-state-card">
      <div className="empty-state-glow" />
      <div className="empty-icon-wrapper">
        <div className="empty-icon-outer">
          <BookOpenIcon className="empty-icon" />
        </div>
        <div className="empty-sparkle-pill">
          <SparklesIcon className="icon-xs" />
          <span>Semester Sprint</span>
        </div>
      </div>

      <h3 className="empty-title">No subjects added yet</h3>
      <p className="empty-desc">
        Start your semester sprint by creating your first subject card. Track syllabus chapters,
        monitor completion percentages, and stay exam-ready!
      </p>

      <div className="empty-actions">
        <button
          type="button"
          className="btn-primary"
          onClick={onOpenAddModal}
        >
          <PlusIcon className="icon-sm" />
          <span>Add Your First Subject</span>
        </button>

        {onRestoreDefaults && (
          <button
            type="button"
            className="btn-secondary"
            onClick={onRestoreDefaults}
            title="Load sample semester courses"
          >
            Load Sample Subjects
          </button>
        )}
      </div>
    </div>
  );
}
