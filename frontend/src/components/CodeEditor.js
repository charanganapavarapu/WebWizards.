import React, { useState, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import { FaPlay, FaStop, FaCode, FaFileCode, FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';
import AIAssistant from './AIAssistant';
import { api } from '../services/api';
import './CodeEditor.css';

const CodeEditor = ({ challenge, onComplete }) => {
    const [code, setCode] = useState(challenge.initialCode || '');
    const [output, setOutput] = useState('');
    const [isRunning, setIsRunning] = useState(false);
    const [language, setLanguage] = useState('c');
    const [theme, setTheme] = useState('vs-dark');
    const [error, setError] = useState(null);
    const [testResults, setTestResults] = useState([]);

    useEffect(() => {
        // Set initial code when challenge changes
        setCode(challenge.initialCode || '');
        setOutput('');
        setError(null);
        setTestResults([]);
    }, [challenge]);

    const handleEditorChange = (value) => {
        setCode(value);
        setError(null);
    };

    const handleRun = async () => {
        setIsRunning(true);
        setError(null);
        setOutput('Compiling and running...\n');
        setTestResults([]);

        try {
            const data = await api.challenges.runCode({
                code,
                language,
                challengeId: challenge._id,
            });

            setOutput(data.output || 'No output');
            setTestResults(data.testResults || []);
            
            if (data.success) {
                onComplete(challenge.points);
            } else {
                setError(data.message || 'Code execution failed');
            }
        } catch (error) {
            setError(error.message);
            setOutput(`Error: ${error.message}`);
        } finally {
            setIsRunning(false);
        }
    };

    const handleAISuggestion = (suggestion) => {
        setCode(prevCode => prevCode + '\n' + suggestion);
        setError(null);
    };

    const handleCodeCompletion = async (type) => {
        try {
            const data = await api.ai.completeCode(code, type, language);
            if (data.completedCode) {
                setCode(prevCode => prevCode + '\n' + data.completedCode);
            }
        } catch (error) {
            setError(error.message);
            console.error('Error completing code:', error);
        }
    };

    return (
        <div className="code-editor-container">
            <div className="editor-header">
                <div className="language-selector">
                    <FaFileCode />
                    <select 
                        value={language} 
                        onChange={(e) => setLanguage(e.target.value)}
                        disabled={isRunning}
                    >
                        <option value="c">C</option>
                        <option value="cpp">C++</option>
                        <option value="python">Python</option>
                        <option value="javascript">JavaScript</option>
                    </select>
                </div>
                <div className="theme-selector">
                    <FaCode />
                    <select 
                        value={theme} 
                        onChange={(e) => setTheme(e.target.value)}
                        disabled={isRunning}
                    >
                        <option value="vs-dark">Dark</option>
                        <option value="vs-light">Light</option>
                    </select>
                </div>
            </div>

            <div className="editor-wrapper">
                <Editor
                    height="500px"
                    language={language}
                    theme={theme}
                    value={code}
                    onChange={handleEditorChange}
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        lineNumbers: 'on',
                        roundedSelection: false,
                        scrollBeyondLastLine: false,
                        readOnly: isRunning,
                        automaticLayout: true,
                    }}
                />
            </div>

            <div className="editor-footer">
                <button 
                    className="run-button" 
                    onClick={handleRun}
                    disabled={isRunning}
                >
                    {isRunning ? <FaStop /> : <FaPlay />}
                    {isRunning ? 'Running...' : 'Run Code'}
                </button>
                <div className="output-container">
                    <h4>Output:</h4>
                    {error && (
                        <div className="error-message">
                            <FaExclamationTriangle />
                            <span>{error}</span>
                        </div>
                    )}
                    <pre className={error ? 'error' : ''}>{output}</pre>
                </div>

                {testResults.length > 0 && (
                    <div className="test-results">
                        <h4>Test Results:</h4>
                        {testResults.map((result, index) => (
                            <div key={index} className={`test-case ${result.passed ? 'passed' : 'failed'}`}>
                                <div className="test-case-header">
                                    <span className="test-case-icon">
                                        {result.passed ? <FaCheck /> : <FaTimes />}
                                    </span>
                                    <span>Test Case {index + 1}</span>
                                </div>
                                {!result.passed && (
                                    <div className="test-case-details">
                                        <div className="test-case-input">
                                            <strong>Input:</strong> {result.testCase}
                                        </div>
                                        <div className="test-case-expected">
                                            <strong>Expected:</strong> {result.expected}
                                        </div>
                                        <div className="test-case-actual">
                                            <strong>Actual:</strong> {result.actual}
                                        </div>
                                        {result.error && (
                                            <div className="test-case-error">
                                                <strong>Error:</strong> {result.error}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <AIAssistant
                onSuggestion={handleAISuggestion}
                onCodeCompletion={handleCodeCompletion}
                onError={(error) => setError(error)}
            />
        </div>
    );
};

export default CodeEditor; 