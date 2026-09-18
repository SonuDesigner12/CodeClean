import { useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlay,
  faCopy,
  faEraser,
  faDownload,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';
import EditorToolbar from '../components/Editor/EditorToolbar.jsx';
import EditorPanel from '../components/Editor/EditorPanel.jsx';
import OptimizeButton from '../components/OptimizeButton/OptimizeButton.jsx';
import StatusBar from '../components/StatusBar/StatusBar.jsx';
import { SAMPLE_HTML, INDENT_OPTIONS } from '../utils/constants.js';
import { useOptimizer } from '../hooks/useOptimizer.js';
import { copyText } from '../utils/clipboard.js';
import { downloadOptimizedCode } from '../utils/download.js';
import { STATUS } from '../formatters/index.js';

export default function OptimizerPage() {
  const [input, setInput] = useState(SAMPLE_HTML);
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('auto');
  const [indent, setIndent] = useState('2');
  const [preserveComments, setPreserveComments] = useState(true);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [printWidth, setPrintWidth] = useState(80);
  const [copyFeedback, setCopyFeedback] = useState('');

  const {
    status,
    message,
    language: detected,
    runOptimize,
    resetStatus,
    isOptimizing,
  } = useOptimizer();

  const indentConfig = useMemo(
    () => INDENT_OPTIONS.find((option) => option.id === indent) || INDENT_OPTIONS[0],
    [indent],
  );

  const editorLanguage = language === 'auto' ? detected?.id || 'html' : language;

  async function handleOptimize() {
    const result = await runOptimize(input, {
      language,
      tabWidth: indentConfig.tabWidth,
      indentStyle: indentConfig.indentStyle,
      preserveComments,
      printWidth,
    });
    if (!result) return;
    if (result.status === STATUS.success) {
      setOutput(result.output);
    }
  }

  function handleClear() {
    setInput('');
    setOutput('');
    setCopyFeedback('');
    resetStatus();
  }

  function handleReset() {
    setLanguage('auto');
    setIndent('2');
    setPreserveComments(true);
    setShowAdvanced(false);
    setPrintWidth(80);
    setInput(SAMPLE_HTML);
    setOutput('');
    setCopyFeedback('');
    resetStatus();
  }

  const handleCopy = useCallback(async () => {
    if (!output) return;
    try {
      await copyText(output);
      setCopyFeedback('Copied!');
      setTimeout(() => setCopyFeedback(''), 2500);
    } catch {
      setCopyFeedback('Copy failed — please select and copy manually.');
    }
  }, [output]);

  function handleDownload() {
    downloadOptimizedCode(output, editorLanguage);
  }

  const inputLines = input ? input.split('\n').length : 0;
  const inputChars = input ? input.length : 0;
  const outputLines = output ? output.split('\n').length : 0;
  const outputChars = output ? output.length : 0;

  return (
    <section className="py-4 py-lg-5">
      <div className="container-fluid px-3 px-md-4">
        {/* Page header */}
        <div className="d-flex flex-wrap align-items-start justify-content-between gap-3 mb-4">
          <div>
            <h1 className="fw-bold mb-1">Code Optimizer</h1>
            <p className="small mb-0" style={{ color: 'var(--cc-muted)' }}>
              Paste your code, click optimize, and get clean, professional code instantly.
            </p>
          </div>
          <Link to="/how-it-works" className="btn btn-outline-secondary btn-sm rounded-pill">
            <FontAwesomeIcon icon={faCirclePlay} className="me-2" />
            How it works?
          </Link>
        </div>

        {/* Toolbar */}
        <EditorToolbar
          language={language}
          indent={indent}
          preserveComments={preserveComments}
          showAdvanced={showAdvanced}
          printWidth={printWidth}
          onLanguageChange={setLanguage}
          onIndentChange={setIndent}
          onPreserveCommentsChange={setPreserveComments}
          onToggleAdvanced={() => setShowAdvanced((value) => !value)}
          onPrintWidthChange={setPrintWidth}
          onReset={handleReset}
        />

        {/* Editors */}
        <div className="row g-3 g-xl-4 align-items-stretch position-relative">
          {/* Input editor */}
          <div className="col-12 col-xl-5">
            <EditorPanel
              title="Input Code (Editable)"
              subtitle="Paste or type your code here..."
              actionLabel="Clear"
              actionIcon={faEraser}
              onAction={handleClear}
              value={input}
              onChange={setInput}
              languageId={editorLanguage}
              status={status}
              lines={inputLines}
              characters={inputChars}
              ariaLabel="Input Code editor"
            />
          </div>

          {/* Optimize button */}
          <div className="col-12 col-xl-2 d-flex align-items-center justify-content-center">
            <OptimizeButton
              onClick={handleOptimize}
              disabled={isOptimizing}
              loading={isOptimizing}
            />
          </div>

          {/* Output editor */}
          <div className="col-12 col-xl-5">
            <EditorPanel
              title="Optimized Code (Editable)"
              subtitle="Clean, formatted and optimized code"
              actionLabel={copyFeedback === 'Copied!' ? 'Copied!' : 'Copy'}
              actionIcon={copyFeedback === 'Copied!' ? faCheck : faCopy}
              onAction={handleCopy}
              extraActions={
                <button
                  type="button"
                  className="btn btn-sm btn-outline-secondary rounded-pill"
                  onClick={handleDownload}
                  disabled={!output}
                  title="Download optimized code"
                >
                  <FontAwesomeIcon icon={faDownload} className="me-2" />
                  Download
                </button>
              }
              value={output}
              onChange={setOutput}
              languageId={editorLanguage}
              status={status}
              lines={outputLines}
              characters={outputChars}
              ariaLabel="Optimized Code editor"
            />
          </div>
        </div>

        {/* Global status bar */}
        <div className="mt-3">
          <StatusBar status={status} message={message} />
        </div>
      </div>
    </section>
  );
}
