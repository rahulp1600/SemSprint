import {
  BookOpenIcon,
  CheckCircleIcon,
  AlertCircleIcon,
  FlameIcon
} from './Icons';

export default function OverviewCards({ subjects, streak, onCheckInStreak }) {
  // Aggregate calculations
  const totalSubjects = subjects.length;
  
  const totalTopics = subjects.reduce(
    (sum, s) => sum + (Number(s.totalTopics) || 0),
    0
  );

  const topicsStudied = subjects.reduce(
    (sum, s) => sum + (Number(s.completedTopics) || 0),
    0
  );

  const revisionDue = subjects.reduce((sum, s) => {
    if (s.revisionDue !== undefined) {
      return sum + Number(s.revisionDue);
    }
    const remaining = Math.max(0, (Number(s.totalTopics) || 0) - (Number(s.completedTopics) || 0));
    return sum + (remaining > 0 ? Math.ceil(remaining * 0.2) : 0);
  }, 0);

  const overallPercentage = totalTopics > 0 
    ? Math.round((topicsStudied / totalTopics) * 100) 
    : 0;

  const stats = [
    {
      id: 'total-subjects',
      label: 'Total Subjects',
      value: totalSubjects,
      detail: totalSubjects === 1 ? '1 active course' : `${totalSubjects} active courses`,
      icon: BookOpenIcon,
      accentColor: 'violet',
      trend: totalSubjects > 0 ? 'Active term' : 'None yet',
    },
    {
      id: 'topics-studied',
      label: 'Topics Studied',
      value: topicsStudied,
      detail: totalTopics > 0 ? `${overallPercentage}% of syllabus (${topicsStudied}/${totalTopics})` : '0 topics logged',
      icon: CheckCircleIcon,
      accentColor: 'emerald',
      trend: `${overallPercentage}% completed`,
    },
    {
      id: 'revision-due',
      label: 'Revision Due',
      value: revisionDue,
      detail: revisionDue > 0 ? 'Topics pending recall' : 'All caught up!',
      icon: AlertCircleIcon,
      accentColor: 'amber',
      trend: revisionDue > 0 ? 'High priority' : 'Optimal',
    },
    {
      id: 'study-streak',
      label: 'Study Streak',
      value: `${streak} Days`,
      detail: 'Daily session tracker',
      icon: FlameIcon,
      accentColor: 'rose',
      trend: '+1 day boost',
      isClickable: true,
      onClick: onCheckInStreak,
    },
  ];

  return (
    <section className="overview-grid" aria-label="Study Metrics Overview">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.id}
            className={`stat-card stat-${stat.accentColor} ${stat.isClickable ? 'stat-card-interactive' : ''}`}
            onClick={stat.onClick}
            role={stat.isClickable ? 'button' : undefined}
            tabIndex={stat.isClickable ? 0 : undefined}
            title={stat.isClickable ? 'Click to add a day to your streak!' : undefined}
            onKeyDown={(e) => {
              if (stat.isClickable && (e.key === 'Enter' || e.key === ' ')) {
                e.preventDefault();
                stat.onClick();
              }
            }}
          >
            <div className="stat-card-top">
              <div className="stat-icon-wrap">
                <Icon className="stat-icon" />
              </div>
              <span className="stat-trend-badge">{stat.trend}</span>
            </div>

            <div className="stat-card-body">
              <span className="stat-label">{stat.label}</span>
              <div className="stat-value">{stat.value}</div>
              <span className="stat-detail">{stat.detail}</span>
            </div>
          </div>
        );
      })}
    </section>
  );
}
