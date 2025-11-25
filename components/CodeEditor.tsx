'use client';

import React from 'react';
import Editor, { OnMount } from '@monaco-editor/react';

interface CodeEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange, language = 'haskell' }) => {
  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Register Haskell language syntax highlighting
    monaco.languages.register({ id: 'haskell' });
    
    monaco.languages.setMonarchTokensProvider('haskell', {
      keywords: [
        'as', 'case', 'class', 'data', 'default', 'deriving', 'do', 'else',
        'family', 'forall', 'foreign', 'hiding', 'if', 'import', 'in',
        'infix', 'infixl', 'infixr', 'instance', 'let', 'mdo', 'module',
        'newtype', 'of', 'proc', 'qualified', 'rec', 'then', 'type', 'where'
      ],
      typeKeywords: [
        'Int', 'Integer', 'Float', 'Double', 'Char', 'String', 'Bool',
        'Maybe', 'Either', 'IO', 'Ordering'
      ],
      operators: [
        '=', '>', '<', '!', '~', '?', ':', '==', '<=', '>=', '!=',
        '&&', '||', '++', '+', '-', '*', '/', '&', '|', '^', '%',
        '<<', '>>', '>>>', '+=', '-=', '*=', '/=', '&=', '|=',
        '^=', '%=', '<<=', '>>=', '>>>='
      ],
      symbols: /[=><!~?:&|+\-*\/\^%]+/,
      escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
      
      tokenizer: {
        root: [
          [/[a-z_$][\w$]*/, {
            cases: {
              '@keywords': 'keyword',
              '@default': 'identifier'
            }
          }],
          [/[A-Z][\w\$]*/, {
            cases: {
              '@typeKeywords': 'type',
              '@default': 'type.identifier'
            }
          }],
          { include: '@whitespace' },
          [/[{}()\[\]]/, '@brackets'],
          [/[<>](?!@symbols)/, '@brackets'],
          [/@symbols/, {
            cases: {
              '@operators': 'operator',
              '@default': ''
            }
          }],
          [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
          [/0[xX][0-9a-fA-F]+/, 'number.hex'],
          [/\d+/, 'number'],
          [/"([^"\\]|\\.)*$/, 'string.invalid'],
          [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],
          [/'[^\\']'/, 'string'],
          [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
          [/'/, 'string.invalid']
        ],
        
        comment: [
          [/[^\-\}]+/, 'comment'],
          [/\-\}/, 'comment', '@pop'],
          [/[\-\}]/, 'comment']
        ],
        
        string: [
          [/[^\\"]+/, 'string'],
          [/@escapes/, 'string.escape'],
          [/\\./, 'string.escape.invalid'],
          [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
        ],
        
        whitespace: [
          [/[ \t\r\n]+/, 'white'],
          [/\{-/, 'comment', '@comment'],
          [/--.*$/, 'comment'],
        ],
      },
    });

    // Define a light theme that matches the aesthetic with enhanced Haskell tokens
    monaco.editor.defineTheme('custom-light', {
      base: 'vs',
      inherit: true,
      rules: [
        { token: '', foreground: '1e293b' }, // slate-800
        { token: 'keyword', foreground: 'c2410c' }, // orange-700
        { token: 'string', foreground: '15803d' }, // green-700
        { token: 'string.quote', foreground: '15803d' },
        { token: 'string.escape', foreground: '166534' }, // green-800
        { token: 'number', foreground: '0284c7' }, // sky-600
        { token: 'number.float', foreground: '0284c7' },
        { token: 'number.hex', foreground: '0369a1' }, // sky-700
        { token: 'comment', foreground: '94a3b8', fontStyle: 'italic' }, // slate-400
        { token: 'type', foreground: 'b45309' }, // amber-700
        { token: 'type.identifier', foreground: 'b45309' }, // amber-700
        { token: 'operator', foreground: '7c3aed' }, // violet-600
        { token: 'identifier', foreground: '1e293b' }, // slate-800
      ],
      colors: {
        'editor.background': '#ffffff', // white
        'editor.foreground': '#1e293b', // slate-800
        'editor.lineHighlightBackground': '#f1f5f9', // slate-100
        'editorCursor.foreground': '#c2410c', // orange-700
        'editor.selectionBackground': '#fed7aa', // orange-200
        'editorLineNumber.foreground': '#cbd5e1', // slate-300
        'editorLineNumber.activeForeground': '#64748b', // slate-500
      },
    });
    monaco.editor.setTheme('custom-light');
  };

  return (
    <div className="h-full w-full overflow-hidden rounded-lg border border-slate-200 bg-white">
      <Editor
        height="100%"
        defaultLanguage={language}
        language={language}
        value={value}
        onChange={onChange}
        onMount={handleEditorDidMount}
        theme="custom-light"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          padding: { top: 16, bottom: 16 },
          fontFamily: 'JetBrains Mono, monospace',
        }}
      />
    </div>
  );
};

export default CodeEditor;
