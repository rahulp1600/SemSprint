import { MenuIcon, PlusIcon, FlameIcon } from './Icons';

export default function Header({
  onOpenAddModal,
  onToggleMobileMenu,
  streak,
  onCheckInStreak
}) {
  const currentDate = new Date().toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  return (
    <header className="dashboard-header">
      <div className="header-top-row">
        {/* Mobile menu trigger */}
        <button
          type="button"
          className="mobile-menu-btn"
          onClick={onToggleMobileMenu}
          aria-label="Toggle navigation menu"
        >
          <MenuIcon className="icon" />
        </button>

        {/* Greeting Section */}
        <div className="greeting-container">
          <div className="greeting-badge">
            <span className="pulse-dot"></span>
            <span>{currentDate} • Semester In Progress</span>
          </div>
          <h1 className="greeting-title">
            Ready to make progress?
          </h1>
          <p className="greeting-subtitle">
            Track your syllabus, master topics, and sprint ahead before your exams.
          </p>
        </div>

        {/* Header Quick Actions */}
        <div className="header-actions">
          {/* Quick Streak check-in pill */}
          <button
            type="button"
            className="streak-pill-btn"
            onClick={onCheckInStreak}
            title="Click to record today's study check-in!"
          >
            <FlameIcon className="streak-flame-icon" />
            <span className="streak-pill-val">{streak}</span>
            <span className="streak-pill-label">day streak</span>
          </button>

          {/* Add Subject CTA */}
          <button
            type="button"
            className="btn-primary add-subject-btn"
            onClick={onOpenAddModal}
          >
            <PlusIcon className="icon-sm" />
            <span>Add Subject</span>
          </button>
        </div>
      </div>
    </header>
  );
}
