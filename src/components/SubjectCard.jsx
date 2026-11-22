import { useState } from 'react';
import { TrashIcon, BookOpenIcon } from './Icons';

export default function SubjectCard({ subject, onDelete, onUpdateProgress }) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const total = Number(subject.totalTopics) || 0;
  const completed = Number(subject.completedTopics) || 0;
  const percentage = total > 0 ? Math.min(100, Math.round((completed / total) * 100)) : 0;

  // Determine status label and badge style
  let statusText = 'Not Started';
  let statusClass = 'status-neutral';

  if (percentage === 100) {
    statusText = 'Completed';
    statusClass = 'status-success';
  } else if (percentage >= 60) {
    statusText = 'Strong Pace';
    statusClass = 'status-accent';
  } else if (percentage > 0) {
    statusText = 'In Progress';
    statusClass = 'status-warning';
  }

  const colorTheme = subject.color || 'violet';

  const handleIncrement = (e) => {
    e.stopPropagation();
    if (completed < total) {
      onUpdateProgress(subject.id, 1);
    }
  };

  const handleDecrement = (e) => {
    e.stopPropagation();
    if (completed > 0) {
      onUpdateProgress(subject.id, -1);
    }
  };

  return (
    <article className={`subject-card theme-${colorTheme}`}>
      {/* Top Card Bar */}
      <div className="subject-card-header">
        <div className="subject-meta-left">
          <span className={`subject-status-pill ${statusClass}`}>
            {statusText}
          </span>
          {subject.revisionDue > 0 && (
            <span className="subject-revision-pill">
              {subject.revisionDue} to review
            </span>
          )}
        </div>

        {/* Delete button or confirmation */}
        <div className="subject-actions">
          {showConfirmDelete ? (
            <div className="confirm-delete-box">
              <span className="confirm-prompt">Delete?</span>
              <button
                type="button"
                className="confirm-yes-btn"
                onClick={() => onDelete(subject.id)}
                title="Confirm deletion"
              >
                Yes
              </button>
              <button
                type="button"
                className="confirm-cancel-btn"
                onClick={() => setShowConfirmDelete(false)}
                title="Cancel deletion"
              >
                No
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="delete-subject-btn"
              onClick={() => setShowConfirmDelete(true)}
              title="Delete subject"
              aria-label={`Delete ${subject.name}`}
            >
              <TrashIcon className="icon-xs" />
            </button>
          )}
        </div>
      </div>

      {/* Subject Title */}
      <div className="subject-body">
        <div className="subject-title-wrap">
          <div className="subject-icon-bullet">
            <BookOpenIcon className="icon-xs" />
          </div>
          <h3 className="subject-name" title={subject.name}>
            {subject.name}
          </h3>
        </div>

        {/* Stats Row */}
        <div className="subject-stats-row">
          <span className="subject-topics-count">
            <strong>{completed}</strong> of <strong>{total}</strong> topics studied
          </span>
          <span className="subject-percentage">{percentage}%</span>
        </div>

        {/* Visual Progress Bar */}
        <div 
          className="progress-track" 
          role="progressbar" 
          aria-valuenow={percentage} 
          aria-valuemin="0" 
          aria-valuemax="100"
        >
          <div
            className="progress-fill"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Card Footer: Quick topic increment / decrement buttons */}
      <div className="subject-card-footer">
        <span className="quick-update-label">Quick Update:</span>
        <div className="quick-stepper">
          <button
            type="button"
            className="stepper-btn"
            onClick={handleDecrement}
            disabled={completed <= 0}
            title="Decrease completed topics by 1"
          >
            –
          </button>
          <span className="stepper-current">{completed}</span>
          <button
            type="button"
            className="stepper-btn stepper-btn-plus"
            onClick={handleIncrement}
            disabled={completed >= total}
            title="Mark 1 more topic completed"
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}
