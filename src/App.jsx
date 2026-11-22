import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import OverviewCards from './components/OverviewCards';
import SubjectCard from './components/SubjectCard';
import AddSubjectModal from './components/AddSubjectModal';
import EmptyState from './components/EmptyState';
import PlaceholderView from './components/PlaceholderView';
import { INITIAL_SUBJECTS } from './data/initialSubjects';
import { SearchIcon, PlusIcon, SparklesIcon } from './components/Icons';
import './App.css';

const LOCAL_STORAGE_SUBJECTS_KEY = 'semsprint_subjects_v1';
const LOCAL_STORAGE_STREAK_KEY = 'semsprint_streak_v1';

export default function App() {
  // Initialize subjects from localStorage with fallback to INITIAL_SUBJECTS
  const [subjects, setSubjects] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_SUBJECTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (err) {
      console.error('Failed to load subjects from localStorage:', err);
    }
    return INITIAL_SUBJECTS;
  });

  // Initialize streak from localStorage
  const [streak, setStreak] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_STREAK_KEY);
      if (saved !== null) {
        const val = parseInt(saved, 10);
        if (!isNaN(val)) return val;
      }
    } catch (err) {
      console.error('Failed to load streak from localStorage:', err);
    }
    return 5;
  });

  const [activeTab, setActiveTab] = useState('dashboard');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  // Persist subjects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_SUBJECTS_KEY, JSON.stringify(subjects));
    } catch (err) {
      console.error('Failed to save subjects to localStorage:', err);
    }
  }, [subjects]);

  // Persist streak to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_STREAK_KEY, streak.toString());
    } catch (err) {
      console.error('Failed to save streak to localStorage:', err);
    }
  }, [streak]);

  // Temporary toast notification helper
  const showToast = (message) => {
    setToastMessage(message);
    const timer = setTimeout(() => {
      setToastMessage('');
    }, 3200);
    return () => clearTimeout(timer);
  };

  // Add Subject handler
  const handleAddSubject = (newSubject) => {
    setSubjects((prev) => [newSubject, ...prev]);
    showToast(`Added "${newSubject.name}" to your sprint!`);
  };

  // Delete Subject handler
  const handleDeleteSubject = (id) => {
    const deleted = subjects.find((s) => s.id === id);
    setSubjects((prev) => prev.filter((s) => s.id !== id));
    showToast(deleted ? `Removed "${deleted.name}"` : 'Subject removed');
  };

  // Quick progress adjustment handler
  const handleUpdateProgress = (id, delta) => {
    setSubjects((prev) =>
      prev.map((s) => {
        if (s.id === id) {
          const total = Number(s.totalTopics) || 0;
          const current = Number(s.completedTopics) || 0;
          const next = Math.max(0, Math.min(total, current + delta));
          return { ...s, completedTopics: next };
        }
        return s;
      })
    );
  };

  // Streak check-in incrementer
  const handleCheckInStreak = () => {
    setStreak((prev) => {
      const next = prev + 1;
      showToast(`🔥 Streak boosted to ${next} days!`);
      return next;
    });
  };

  // Restore default sample data
  const handleRestoreDefaults = () => {
    setSubjects(INITIAL_SUBJECTS);
    showToast('Loaded sample semester subjects!');
  };

  // Filter subjects by search query
  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase().trim())
  );

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="toast-notification" role="status">
          <SparklesIcon className="icon-xs" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        subjectCount={subjects.length}
        streak={streak}
      />

      {/* Main App Content */}
      <div className="main-wrapper">
        {/* Main Dashboard / Workspace */}
        <main className="dashboard-content">
          {/* Top greeting & quick actions */}
          <Header
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onToggleMobileMenu={() => setIsMobileSidebarOpen(true)}
            streak={streak}
            onCheckInStreak={handleCheckInStreak}
          />

          {/* Conditional Views based on active navigation tab */}
          {activeTab === 'dashboard' && (
            <>
              {/* 4 Overview metric cards */}
              <OverviewCards
                subjects={subjects}
                streak={streak}
                onCheckInStreak={handleCheckInStreak}
              />

              {/* My Subjects Section */}
              <section className="subjects-section" aria-labelledby="subjects-heading">
                <div className="subjects-section-header">
                  <div className="section-title-wrap">
                    <h2 id="subjects-heading" className="section-title">
                      My Subjects
                    </h2>
                    <span className="count-badge">
                      {subjects.length} {subjects.length === 1 ? 'Course' : 'Courses'}
                    </span>
                  </div>

                  <div className="subjects-controls">
                    {/* Search filter input */}
                    {subjects.length > 0 && (
                      <div className="search-bar-wrap">
                        <SearchIcon className="search-icon" />
                        <input
                          type="text"
                          className="search-input"
                          placeholder="Search subjects..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        {searchQuery && (
                          <button
                            type="button"
                            className="search-clear-btn"
                            onClick={() => setSearchQuery('')}
                            aria-label="Clear search"
                          >
                            ×
                          </button>
                        )}
                      </div>
                    )}

                    {/* Add Subject CTA */}
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setIsAddModalOpen(true)}
                    >
                      <PlusIcon className="icon-xs" />
                      <span>Add Subject</span>
                    </button>
                  </div>
                </div>

                {/* Subject Cards Grid or Empty State */}
                {subjects.length === 0 ? (
                  <EmptyState
                    onOpenAddModal={() => setIsAddModalOpen(true)}
                    onRestoreDefaults={handleRestoreDefaults}
                  />
                ) : filteredSubjects.length === 0 ? (
                  <div className="search-no-results">
                    <p>No subjects match <strong>"{searchQuery}"</strong></p>
                    <button
                      type="button"
                      className="btn-secondary"
                      onClick={() => setSearchQuery('')}
                    >
                      Clear Search
                    </button>
                  </div>
                ) : (
                  <div className="subjects-grid">
                    {filteredSubjects.map((subject) => (
                      <SubjectCard
                        key={subject.id}
                        subject={subject}
                        onDelete={handleDeleteSubject}
                        onUpdateProgress={handleUpdateProgress}
                      />
                    ))}
                  </div>
                )}
              </section>
            </>
          )}

          {activeTab === 'subjects' && (
            <section className="subjects-dedicated-view">
              <div className="subjects-section-header">
                <div className="section-title-wrap">
                  <h2 className="section-title">My Subjects Overview</h2>
                  <span className="count-badge">
                    {subjects.length} Total
                  </span>
                </div>

                <div className="subjects-controls">
                  <div className="search-bar-wrap">
                    <SearchIcon className="search-icon" />
                    <input
                      type="text"
                      className="search-input"
                      placeholder="Search subjects..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <button
                    type="button"
                    className="btn-primary"
                    onClick={() => setIsAddModalOpen(true)}
                  >
                    <PlusIcon className="icon-xs" />
                    <span>Add Subject</span>
                  </button>
                </div>
              </div>

              {subjects.length === 0 ? (
                <EmptyState
                  onOpenAddModal={() => setIsAddModalOpen(true)}
                  onRestoreDefaults={handleRestoreDefaults}
                />
              ) : (
                <div className="subjects-grid">
                  {filteredSubjects.map((subject) => (
                    <SubjectCard
                      key={subject.id}
                      subject={subject}
                      onDelete={handleDeleteSubject}
                      onUpdateProgress={handleUpdateProgress}
                    />
                  ))}
                </div>
              )}
            </section>
          )}

          {(activeTab === 'flashcards' || activeTab === 'revision' || activeTab === 'progress') && (
            <PlaceholderView
              tab={activeTab}
              onBackToDashboard={() => setActiveTab('dashboard')}
            />
          )}
        </main>
      </div>

      {/* Add Subject Modal */}
      <AddSubjectModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAddSubject={handleAddSubject}
      />
    </div>
  );
}
