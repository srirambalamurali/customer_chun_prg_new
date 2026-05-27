import { FiActivity } from 'react-icons/fi';

export default function Navbar() {
  return (
    <header className="topbar glass-panel">
      <div className="brand-lockup">
        <div className="brand-mark">
          <FiActivity />
        </div>
        <div>
          <p className="eyebrow">Churn Intelligence</p>
          <h1>Bank Churn Prediction</h1>
        </div>
      </div>
    </header>
  );
}
