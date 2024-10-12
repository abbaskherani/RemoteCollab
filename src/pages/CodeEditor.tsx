import React, { useState } from 'react';
import CodeEditor from '../components/CodeEditor';

const CodeEditorPage: React.FC = () => {
  const [code, setCode] = useState('// Start coding here\n');

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  return (
    <div className="h-[calc(100vh-6rem)]">
      <h1 className="text-2xl font-bold mb-4">Code Editor</h1>
      <CodeEditor
        // language="javascript"
        value={code}
        onChange={handleCodeChange}
      />
    </div>
  );
};

export default CodeEditorPage;