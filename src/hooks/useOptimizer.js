import { useCallback, useRef, useState } from 'react';
import { optimizeCode, STATUS } from '../formatters/index.js';

export function useOptimizer() {
  const [status, setStatus] = useState(STATUS.idle);
  const [message, setMessage] = useState('Paste code, then click Optimize Code.');
  const [language, setLanguage] = useState(null);
  const busyRef = useRef(false);

  const runOptimize = useCallback(async (source, options) => {
    if (busyRef.current) {
      return null;
    }
    busyRef.current = true;
    setStatus(STATUS.optimizing);
    setMessage('Optimizing code in your browser...');

    await new Promise((resolve) => setTimeout(resolve, 0));

    try {
      const result = await optimizeCode(source, options);
      setStatus(result.status);
      setMessage(result.message);
      setLanguage(result.language);
      return result;
    } finally {
      busyRef.current = false;
    }
  }, []);

  const resetStatus = useCallback(() => {
    setStatus(STATUS.idle);
    setMessage('Paste code, then click Optimize Code.');
    setLanguage(null);
  }, []);

  return {
    status,
    message,
    language,
    runOptimize,
    resetStatus,
    isOptimizing: status === STATUS.optimizing,
  };
}
