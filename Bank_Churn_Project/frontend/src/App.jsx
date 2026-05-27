import { useEffect, useState } from 'react';
import { predictCustomer } from './api/client';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import PredictionForm from './components/PredictionForm';
import ResultCard from './components/ResultCard';
import Toast from './components/Toast';

export default function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!toast) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setToast(null);
    }, 3200);

    return () => window.clearTimeout(timer);
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const handlePredict = async (payload) => {
    setLoading(true);
    try {
      const response = await predictCustomer(payload);
      setResult(response.data);
      showToast('Prediction completed successfully.', 'success');
    } catch (error) {
      const message =
        error?.response?.data?.detail || error?.message || 'Prediction request failed.';
      showToast(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    showToast('Form cleared.', 'info');
  };

  return (
    <div className="app-shell">
      <div className="bg-orb bg-orb-a" />
      <div className="bg-orb bg-orb-b" />
      <div className="bg-grid" />

      <div className="app-content">
        <Navbar />

        <main className="dashboard-grid">
          <PredictionForm loading={loading} onPredict={handlePredict} onReset={handleReset} />
          <ResultCard result={result} loading={loading} />
        </main>

        <Footer />
      </div>

      <Toast toast={toast} />
    </div>
  );
}
