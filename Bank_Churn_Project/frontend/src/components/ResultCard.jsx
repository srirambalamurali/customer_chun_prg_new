import { FiAlertTriangle, FiCheckCircle, FiTrendingUp } from 'react-icons/fi';

function riskTone(riskLevel) {
  if (riskLevel === 'High Risk') return 'risk-high';
  if (riskLevel === 'Medium Risk') return 'risk-medium';
  return 'risk-low';
}

export default function ResultCard({ result, loading }) {
  if (loading) {
    return (
      <section className="result-card glass-panel">
        <div className="result-header">
          <p className="eyebrow">Prediction status</p>
          <h2>Analyzing customer profile</h2>
        </div>
        <div className="skeleton-stack">
          <div className="skeleton-line short" />
          <div className="skeleton-line" />
          <div className="skeleton-line medium" />
        </div>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="result-card glass-panel empty-state">
        <div className="empty-icon">
          <FiTrendingUp />
        </div>
        <h2>Prediction results will appear here</h2>
        <p>
          Submit a validated customer profile to see churn probability and risk guidance in a
          polished results card.
        </p>
      </section>
    );
  }

  const toneClass = riskTone(result.risk_level);
  const probabilityPercent = Math.round((result.probability || 0) * 100);

  return (
    <section className="result-card glass-panel">
      <div className="result-header">
        <div>
          <p className="eyebrow">Prediction result</p>
          <h2>{result.prediction}</h2>
        </div>
        <span className={`risk-badge ${toneClass}`}>
          {result.risk_level === 'High Risk' ? <FiAlertTriangle /> : <FiCheckCircle />}
          {result.risk_level}
        </span>
      </div>

      <div className="result-metrics">
        <article>
          <span>Churn probability</span>
          <strong>{probabilityPercent}%</strong>
          <div className="metric-track">
            <div className={`metric-fill ${toneClass}`} style={{ width: `${probabilityPercent}%` }} />
          </div>
        </article>
        <article>
          <span>Risk level</span>
          <strong>{result.risk_level}</strong>
          <span>Based on the model's churn probability thresholds.</span>
        </article>
      </div>

      <div className={`decision-callout ${toneClass}`}>
        <div>
          <p>{result.prediction}</p>
          <strong>
            {result.risk_level === 'Low Risk'
              ? 'Healthy retention outlook.'
              : result.risk_level === 'Medium Risk'
                ? 'Monitor and engage proactively.'
                : 'Immediate retention intervention recommended.'}
          </strong>
        </div>
      </div>
    </section>
  );
}
