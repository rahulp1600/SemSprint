import { useState, useEffect, useRef } from 'react';
import { XIcon, PlusIcon, BookOpenIcon } from './Icons';

export default function AddSubjectModal({ isOpen, onClose, onAddSubject }) {
  const [name, setName] = useState('');
  const [totalTopics, setTotalTopics] = useState(12);
  const [completedTopics, setCompletedTopics] = useState(0);
  const [color, setColor] = useState('violet');
  const [errorMessage, setErrorMessage] = useState('');

  const inputRef = useRef(null);

  // Focus input on mount / open
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Handle escape key to close
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const colorOptions = [
    { id: 'violet', label: 'Violet', hex: '#8b5cf6' },
    { id: 'blue', label: 'Blue', hex: '#3b82f6' },
    { id: 'emerald', label: 'Emerald', hex: '#10b981' },
    { id: 'amber', label: 'Amber', hex: '#f59e0b' },
    { id: 'rose', label: 'Rose', hex: '#f43f5e' },
  ];

  const handleClose = () => {
    setName('');
    setTotalTopics(12);
    setCompletedTopics(0);
    setColor('violet');
    setErrorMessage('');
    onClose();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setErrorMessage('Please enter a subject name');
      if (inputRef.current) inputRef.current.focus();
      return;
    }

    const total = Math.max(1, parseInt(totalTopics, 10) || 1);
    const completed = Math.min(total, Math.max(0, parseInt(completedTopics, 10) || 0));

    onAddSubject({
      id: `sub-${Date.now()}`,
      name: trimmed,
      totalTopics: total,
      completedTopics: completed,
      color,
      revisionDue: 0,
      createdAt: new Date().toISOString().split('T')[0],
    });

    handleClose();
  };

  return (
    <div 
      className="modal-overlay" 
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-heading"
    >
      <div 
        className="modal-card" 
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-title-wrap">
            <div className="modal-icon-badge">
              <BookOpenIcon className="icon-sm" />
            </div>
            <div>
              <h2 id="modal-heading" className="modal-title">Add New Subject</h2>
              <p className="modal-sub">Add a course to your semester sprint schedule</p>
            </div>
          </div>
          <button 
            type="button" 
            className="modal-close-btn" 
            onClick={handleClose}
            aria-label="Close modal"
          >
            <XIcon className="icon-sm" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Subject Name Input */}
          <div className="form-group">
            <label htmlFor="subject-name-input" className="form-label">
              Subject Name <span className="required-star">*</span>
            </label>
            <input
              ref={inputRef}
              id="subject-name-input"
              type="text"
              className={`form-input ${errorMessage ? 'form-input-error' : ''}`}
              placeholder="e.g. Distributed Systems, Machine Learning..."
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              maxLength={70}
            />
            {errorMessage && (
              <span className="form-error-text">{errorMessage}</span>
            )}
          </div>

          {/* Topics configuration */}
          <div className="form-row-2col">
            <div className="form-group">
              <label htmlFor="total-topics-input" className="form-label">
                Total Topics / Chapters
              </label>
              <input
                id="total-topics-input"
                type="number"
                min="1"
                max="150"
                className="form-input"
                value={totalTopics}
                onChange={(e) => setTotalTopics(e.target.value)}
              />
              <span className="form-helper">Estimated syllabus modules</span>
            </div>

            <div className="form-group">
              <label htmlFor="completed-topics-input" className="form-label">
                Already Studied
              </label>
              <input
                id="completed-topics-input"
                type="number"
                min="0"
                max={totalTopics || 1}
                className="form-input"
                value={completedTopics}
                onChange={(e) => setCompletedTopics(e.target.value)}
              />
              <span className="form-helper">Starting progress</span>
            </div>
          </div>

          {/* Theme Color Picker */}
          <div className="form-group">
            <label className="form-label">Accent Theme</label>
            <div className="color-picker-group">
              {colorOptions.map((opt) => (
                <button
                  type="button"
                  key={opt.id}
                  className={`color-swatch-btn ${color === opt.id ? 'color-swatch-selected' : ''}`}
                  style={{ '--swatch-color': opt.hex }}
                  onClick={() => setColor(opt.id)}
                  title={opt.label}
                  aria-label={`Select ${opt.label} color`}
                >
                  <span className="swatch-inner" />
                </button>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              <PlusIcon className="icon-xs" />
              <span>Add Subject</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
