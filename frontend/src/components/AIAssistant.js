import React, { useState, useRef, useEffect } from 'react';
import { FaRobot, FaLightbulb, FaCode, FaTimes } from 'react-icons/fa';

const AIAssistant = ({ onSuggestion, onCodeCompletion, onError }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [input, setInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        try {
            const response = await fetch('/api/ai/assist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: input }),
            });

            const data = await response.json();
            if (data.suggestions) {
                setSuggestions(data.suggestions);
                onSuggestion(data.suggestions[0]);
            }
        } catch (error) {
            onError('Failed to get AI assistance');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSuggestionClick = (suggestion) => {
        onSuggestion(suggestion);
        setSuggestions([]);
        setInput('');
    };

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    return (
        <div className="ai-assistant">
            <button
                className="ai-toggle"
                onClick={() => setIsOpen(!isOpen)}
                title="AI Assistant"
            >
                <FaRobot />
            </button>

            {isOpen && (
                <div className="ai-panel">
                    <div className="ai-header">
                        <h3>AI Assistant</h3>
                        <button onClick={() => setIsOpen(false)}>
                            <FaTimes />
                        </button>
                    </div>

                    <form onSubmit={handleSubmit} className="ai-form">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Ask for help or code suggestions..."
                            disabled={isLoading}
                        />
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Thinking...' : 'Ask'}
                        </button>
                    </form>

                    {suggestions.length > 0 && (
                        <div className="suggestions">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(suggestion)}
                                >
                                    <FaLightbulb />
                                    <span>{suggestion}</span>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="quick-actions">
                        <button onClick={() => onCodeCompletion('function')}>
                            <FaCode /> Complete Function
                        </button>
                        <button onClick={() => onCodeCompletion('loop')}>
                            <FaCode /> Complete Loop
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AIAssistant; 