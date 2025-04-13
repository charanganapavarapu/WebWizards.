import React, { useEffect, useState } from 'react';
import './DynamicCursor.css';

const DynamicCursor = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [isClicking, setIsClicking] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastUpdateTime, setLastUpdateTime] = useState(0);
    const [interactionType, setInteractionType] = useState('default');
    const [isDragging, setIsDragging] = useState(false);

    useEffect(() => {
        const updateCursorPosition = (e) => {
            // Throttle updates to every 10ms for performance
            const currentTime = Date.now();
            if (currentTime - lastUpdateTime < 10) return;
            
            setPosition({ x: e.clientX, y: e.clientY });
            setLastUpdateTime(currentTime);
        };

        const handleMouseDown = (e) => {
            setIsClicking(true);
            // Check if element is draggable
            if (e.target.draggable) {
                setIsDragging(true);
                setInteractionType('dragging');
            }
        };

        const handleMouseUp = () => {
            setIsClicking(false);
            setIsDragging(false);
        };
        
        const handleMouseEnter = () => setIsHidden(false);
        const handleMouseLeave = () => setIsHidden(true);

        const handleElementHover = (e) => {
            setIsHovering(true);
            const element = e.target;
            
            // Determine interaction type based on element
            if (element.tagName === 'A') {
                setInteractionType('link');
            } else if (element.tagName === 'BUTTON') {
                setInteractionType('button');
            } else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                setInteractionType('input');
            } else if (element.draggable) {
                setInteractionType('draggable');
            } else if (element.classList.contains('clickable')) {
                setInteractionType('clickable');
            } else {
                setInteractionType('hover');
            }
        };

        const handleElementLeave = () => {
            setIsHovering(false);
            setInteractionType('default');
        };

        // Add hover detection to interactive elements
        const hoverableElements = document.querySelectorAll(
            'button, a, input, select, textarea, .clickable, [draggable="true"]'
        );

        hoverableElements.forEach(element => {
            element.addEventListener('mouseenter', handleElementHover);
            element.addEventListener('mouseleave', handleElementLeave);
        });

        // Add main cursor event listeners
        document.addEventListener('mousemove', updateCursorPosition);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseenter', handleMouseEnter);
        document.addEventListener('mouseleave', handleMouseLeave);

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Cleanup
        return () => {
            document.removeEventListener('mousemove', updateCursorPosition);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('mouseenter', handleMouseEnter);
            document.removeEventListener('mouseleave', handleMouseLeave);

            hoverableElements.forEach(element => {
                element.removeEventListener('mouseenter', handleElementHover);
                element.removeEventListener('mouseleave', handleElementLeave);
            });

            // Restore default cursor
            document.body.style.cursor = 'auto';
        };
    }, [lastUpdateTime]);

    return (
        <>
            <div
                className={`cursor-dot ${isClicking ? 'clicking' : ''} ${
                    isHovering ? 'hovering' : ''
                } ${isHidden ? 'hidden' : ''} ${interactionType} ${
                    isDragging ? 'dragging' : ''
                }`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`
                }}
            />
            <div
                className={`cursor-ring ${isClicking ? 'clicking' : ''} ${
                    isHovering ? 'hovering' : ''
                } ${isHidden ? 'hidden' : ''} ${interactionType} ${
                    isDragging ? 'dragging' : ''
                }`}
                style={{
                    transform: `translate(${position.x}px, ${position.y}px)`
                }}
            />
        </>
    );
};

export default DynamicCursor; 