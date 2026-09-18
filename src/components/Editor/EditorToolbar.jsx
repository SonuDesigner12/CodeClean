import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faSliders } from '@fortawesome/free-solid-svg-icons';
import LanguageSelector from '../LanguageSelector/LanguageSelector.jsx';
import { LANGUAGE_OPTIONS } from '../../detector/detectLanguage.js';
import { INDENT_OPTIONS } from '../../utils/constants.js';

export default function EditorToolbar({
  language,
  indent,
  preserveComments,
  showAdvanced,
  printWidth,
  onLanguageChange,
  onIndentChange,
  onPreserveCommentsChange,
  onToggleAdvanced,
  onPrintWidthChange,
  onReset,
}) {
  return (
    <div className="cc-card p-3 p-md-4 mb-4">
      <div className="d-flex flex-wrap align-items-center gap-3">
        <LanguageSelector
          id="language-select"
          value={language}
          options={LANGUAGE_OPTIONS}
          onChange={onLanguageChange}
        />
        <LanguageSelector
          id="indent-select"
          label="Indentation"
          value={indent}
          options={INDENT_OPTIONS}
          onChange={onIndentChange}
        />
        <div className="form-check form-switch mb-0">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="preserveComments"
            checked={preserveComments}
            onChange={(event) => onPreserveCommentsChange(event.target.checked)}
          />
          <label className="form-check-label" htmlFor="preserveComments">
            Preserve Comments
          </label>
        </div>
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary rounded-pill ms-md-auto"
          onClick={onToggleAdvanced}
        >
          <FontAwesomeIcon icon={faSliders} className="me-2" />
          Advanced Options
        </button>
        <button type="button" className="btn btn-sm btn-outline-secondary rounded-pill" onClick={onReset}>
          <FontAwesomeIcon icon={faRotateLeft} className="me-2" />
          Reset
        </button>
      </div>
      {showAdvanced ? (
        <div className="row g-3 mt-2">
          <div className="col-12 col-md-4">
            <label className="form-label small text-secondary" htmlFor="printWidth">
              Print width
            </label>
            <input
              id="printWidth"
              type="number"
              min="40"
              max="120"
              className="form-control"
              value={printWidth}
              onChange={(event) => onPrintWidthChange(Number(event.target.value))}
            />
          </div>
          <div className="col-12 col-md-8">
            <p className="small text-secondary mb-0 mt-md-4">
              Advanced options only change formatting layout. They never rename variables or rewrite
              application logic.
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
