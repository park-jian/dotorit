import React, { useEffect, useRef, useState } from 'react';
import './BottomSheet.css';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({ isOpen, onClose, children }) => {
  const [startY, setStartY] = useState<number | null>(null);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!startY) return;
    const currentY = e.touches[0].clientY;
    const diff = currentY - startY;
    if (diff > 0) { // Only allow downward drag
      setCurrentTranslate(diff);
    }
  };

  const handleTouchEnd = () => {
    if (currentTranslate > 100) {
      onClose();
    }
    setCurrentTranslate(0);
    setStartY(null);
  };

  if (!isOpen) return null;

  return (
    <div className="bottom-sheet-container">
      <div 
        className="bottom-sheet-backdrop"
        onClick={onClose}
      />
      <div
        ref={sheetRef}
        className="bottom-sheet-content"
        style={{ 
          transform: `translateY(${currentTranslate}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="bottom-sheet-handle" />
        {children}
      </div>
    </div>
  );
};