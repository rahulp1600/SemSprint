import { FlashcardsIcon, RevisionIcon, ProgressIcon, SparklesIcon } from './Icons';

export default function PlaceholderView({ tab, onBackToDashboard }) {
  const configs = {
    flashcards: {
      title: 'Smart Flashcards',
      subtitle: 'Spaced repetition decks generated from your subject topics',
      icon: FlashcardsIcon,
      accent: 'violet',
      features: [
        'Automatic active recall cards based on subject chapters',
        'Leitner spaced repetition algorithm for long-term retention',
        'Quick 5-minute study blitz mode between classes',
      ],
      eta: 'Phase 2 Sprint',
    },
    revision: {
      title: 'Active Revision Schedule',
      subtitle: 'Targeted revision intervals to beat the forgetting curve',
      icon: RevisionIcon,
      accent: 'amber',
      features: [
        'Dynamic revision cues for topics studied 1, 3, 7, and 14 days ago',
        'High-yield topic prioritization for approaching exams',
        'Confidence score ratings (Hard, Medium, Easy)',
      ],
      eta: 'Phase 2 Sprint',
    },
    progress: {
      title: 'Syllabus & Analytics Progress',
      subtitle: 'In-depth velocity metrics and semester readiness reports',
      icon: ProgressIcon,
      accent: 'emerald',
      features: [
        'Weekly study velocity and completion forecasting',
        'Time investment and consistency breakdown per subject',
        'Target GPA and exam readiness milestones',
      ],
      eta: 'Phase 2 Sprint',
    },
  };

  const current = configs[tab] || configs.flashcards;
  const Icon = current.icon;

  return (
    <div className="placeholder-view">
      <div className={`placeholder-card accent-${current.accent}`}>
        <div className="placeholder-badge">
          <SparklesIcon className="icon-xs" />
          <span>{current.eta} Preview</span>
        </div>

        <div className="placeholder-icon-circle">
          <Icon className="placeholder-svg" />
        </div>

        <h2 className="placeholder-title">{current.title}</h2>
        <p className="placeholder-sub">{current.subtitle}</p>

        <div className="placeholder-roadmap">
          <h4 className="roadmap-heading">What will be included:</h4>
          <ul className="roadmap-list">
            {current.features.map((feature, idx) => (
              <li key={idx} className="roadmap-item">
                <span className="roadmap-bullet">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="placeholder-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={onBackToDashboard}
          >
            ← Return to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
