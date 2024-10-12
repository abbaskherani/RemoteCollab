import React, { useRef, useEffect, useState } from 'react'; // Added useState
import * as monaco from 'monaco-editor';

interface CodeEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const monacoRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const [theme, setTheme] = useState<'vs-dark' | 'vs'>('vs-dark'); // Added theme state
  const [language, setLanguage] = useState<'javascript' | 'typescript'>('typescript'); // Added language state

  useEffect(() => {
    if (editorRef.current) {
      monaco.languages.typescript.javascriptDefaults.setEagerModelSync(true);
      monaco.languages.typescript.typescriptDefaults.setEagerModelSync(true);

      monacoRef.current = monaco.editor.create(editorRef.current, {
        value,
        language,
        theme,
        automaticLayout: true,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
      });

      monacoRef.current.onDidChangeModelContent(() => {
        onChange(monacoRef.current?.getValue() || '');
      });
    }

    return () => {
      monacoRef.current?.dispose();
    };
  }, [theme, language]); // Added language dependency

  useEffect(() => {
    if (monacoRef.current) {
      const model = monacoRef.current.getModel();
      if (model) {
        monaco.editor.setModelLanguage(model, language);
      }
    }
  }, [language]);

  useEffect(() => {
    if (monacoRef.current) {
      if (value !== monacoRef.current.getValue()) {
        monacoRef.current.setValue(value);
      }
    }
  }, [value]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'vs-dark' ? 'vs' : 'vs-dark')); // Toggle theme
  };

  const executeCode = () => {
    const code = monacoRef.current?.getValue();
    if (code) {
      try {
        // Use eval for JavaScript execution
        // Note: Using eval can be dangerous; ensure to sanitize inputs in a real application
        const result = eval(code);
        console.log(result); // Output the result to the console
        alert(`Execution Result: ${result}`); // Display the result in an alert
      } catch (error) {
        console.error('Execution Error:', error);
        alert(`Execution Error: ${error}`); // Display error in an alert
      }
    }
  };

  return (
    <div>
      <button onClick={toggleTheme}>Toggle Theme</button> {/* Added button for theme toggle */}
      <select value={language} onChange={(e) => setLanguage(e.target.value as 'javascript' | 'typescript')}>
        <option value="javascript">JavaScript</option>
        <option value="typescript">TypeScript</option>
      </select> {/* Language selection dropdown */}
      <button onClick={executeCode}>Execute</button> {/* Execute button */}
      <div ref={editorRef} style={{ width: '100%', height: '500px' }} />
    </div>
  );
};

export default CodeEditor;