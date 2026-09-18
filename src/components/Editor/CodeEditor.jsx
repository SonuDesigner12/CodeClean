import { useEffect, useRef } from 'react';
import { EditorView, basicSetup } from 'codemirror';
import { Compartment } from '@codemirror/state';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { json } from '@codemirror/lang-json';
import { xml } from '@codemirror/lang-xml';
import { php } from '@codemirror/lang-php';
import { oneDark } from '@codemirror/theme-one-dark';

function languageExtension(languageId) {
  switch (languageId) {
    case 'css':
      return css();
    case 'javascript':
      return javascript();
    case 'json':
      return json();
    case 'xml':
      return xml();
    case 'php':
    case 'wordpress':
      return php();
    case 'liquid':
    case 'html':
    default:
      return html();
  }
}

export default function CodeEditor({ value, onChange, languageId, ariaLabel }) {
  const parentRef = useRef(null);
  const viewRef = useRef(null);
  const languageRef = useRef(new Compartment());
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    if (!parentRef.current || viewRef.current) {
      return undefined;
    }

    const view = new EditorView({
      doc: value || '',
      parent: parentRef.current,
      extensions: [
        basicSetup,
        oneDark,
        languageRef.current.of(languageExtension(languageId)),
        EditorView.lineWrapping,
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current?.(update.state.doc.toString());
          }
        }),
      ],
    });

    viewRef.current = view;
    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // Editor instance is created once; language and value sync below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }
    const current = view.state.doc.toString();
    if (value !== current) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value || '' },
      });
    }
  }, [value]);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) {
      return;
    }
    view.dispatch({
      effects: languageRef.current.reconfigure(languageExtension(languageId)),
    });
  }, [languageId]);

  return <div ref={parentRef} className="cc-codemirror" aria-label={ariaLabel} />;
}
