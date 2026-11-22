import {
  DashboardIcon,
  BookOpenIcon,
  FlashcardsIcon,
  RevisionIcon,
  ProgressIcon,
  LightningIcon,
  XIcon,
  FlameIcon
} from './Icons';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isMobileOpen,
  onCloseMobile,
  subjectCount,
  streak
}) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: DashboardIcon },
    { id: 'subjects', label: 'My Subjects', icon: BookOpenIcon, badge: subjectCount },
    { id: 'flashcards', label: 'Flashcards', icon: FlashcardsIcon, tag: 'Soon' },
    { id: 'revision', label: 'Revision', icon: RevisionIcon, tag: 'Soon' },
    { id: 'progress', label: 'Progress', icon: ProgressIcon },
  ];

  const handleNavClick = (id) => {
    setActiveTab(id);
    if (isMobileOpen && onCloseMobile) {
      onCloseMobile();
    }
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileOpen && (
        <div 
          className="sidebar-backdrop" 
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isMobileOpen ? 'sidebar-mobile-open' : ''}`}>
        {/* Brand Header */}
        <div className="sidebar-brand">
          <div className="brand-logo-wrap">
            <div className="brand-icon">
              <LightningIcon className="brand-svg" />
            </div>
            <div className="brand-text-wrap">
              <span className="brand-name">SemSprint</span>
              <span className="brand-tag">MVP</span>
            </div>
          </div>
          {isMobileOpen && (
            <button 
              className="sidebar-close-btn" 
              onClick={onCloseMobile}
              aria-label="Close navigation"
            >
              <XIcon className="icon-sm" />
            </button>
          )}
        </div>

        {/* Navigation list */}
        <nav className="sidebar-nav" aria-label="Main Navigation">
          <div className="nav-group-label">STUDY WORKSPACE</div>
          <ul className="nav-list">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <li key={item.id} className="nav-item">
                  <button
                    type="button"
                    className={`nav-btn ${isActive ? 'nav-btn-active' : ''}`}
                    onClick={() => handleNavClick(item.id)}
                  >
                    <span className="nav-icon-wrapper">
                      <Icon className="nav-icon" />
                    </span>
                    <span className="nav-label">{item.label}</span>
                    {item.badge !== undefined && (
                      <span className="nav-counter">{item.badge}</span>
                    )}
                    {item.tag && (
                      <span className="nav-pill-tag">{item.tag}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom Study Widget */}
        <div className="sidebar-footer">
          <div className="streak-card">
            <div className="streak-header">
              <div className="streak-flame-circle">
                <FlameIcon className="flame-svg" />
              </div>
              <div className="streak-info">
                <span className="streak-count">{streak} Day Streak</span>
                <span className="streak-sub">Consistency unlocked</span>
              </div>
            </div>
            <div className="streak-bar-track">
              <div 
                className="streak-bar-fill" 
                style={{ width: `${Math.min(100, (streak / 7) * 100)}%` }}
              />
            </div>
            <span className="streak-goal-text">Target: 7-day milestone</span>
          </div>

          <div className="user-mini-profile">
            <div className="user-avatar">
              <span>SP</span>
            </div>
            <div className="user-meta">
              <span className="user-name">Semester Sprint</span>
              <span className="user-plan">Student Pro</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
