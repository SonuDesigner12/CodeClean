import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function OptimizeButton({ onClick, disabled, loading }) {
  return (
    <button
      type="button"
      className="btn cc-optimize-btn rounded-4 px-4 py-3"
      onClick={onClick}
      disabled={disabled}
    >
      <FontAwesomeIcon icon={loading ? faSpinner : faArrowRightArrowLeft} spin={loading} className="mb-1" />
      <span className="d-block fw-bold">Optimize Code</span>
      <small className="d-none d-xl-block opacity-75">One Click Magic</small>
    </button>
  );
}
