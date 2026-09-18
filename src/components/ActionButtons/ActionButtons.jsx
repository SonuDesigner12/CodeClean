import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopy, faDownload, faEraser } from '@fortawesome/free-solid-svg-icons';

export default function ActionButtons({ onCopy, onClear, onDownload, copyLabel = 'Copy' }) {
  return (
    <div className="d-flex flex-wrap gap-2">
      <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill" onClick={onCopy}>
        <FontAwesomeIcon icon={faCopy} className="me-2" />
        {copyLabel}
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill" onClick={onClear}>
        <FontAwesomeIcon icon={faEraser} className="me-2" />
        Clear
      </button>
      <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill" onClick={onDownload}>
        <FontAwesomeIcon icon={faDownload} className="me-2" />
        Download
      </button>
    </div>
  );
}
