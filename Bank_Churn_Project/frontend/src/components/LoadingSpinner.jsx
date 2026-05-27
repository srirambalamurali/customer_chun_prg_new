import { FiLoader } from 'react-icons/fi';

export default function LoadingSpinner() {
  return (
    <span className="spinner-wrap" aria-hidden="true">
      <FiLoader className="spinner-icon" />
    </span>
  );
}
