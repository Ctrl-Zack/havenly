'use client';

import React, { useEffect, useState, useRef } from 'react';

type ModalWrapperProps = {
  children: React.ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  variant?: 'center' | 'bottom-sheet';
};

export function ModalWrapper({ children, isOpen = true, onClose, variant = 'center' }: ModalWrapperProps) {
  const [offsetY, setOffsetY] = useState(0);
  const startY = useRef(0);
  const isDragging = useRef(false);

  // Disable scrolling on the body when the modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Reset offset when opened
  useEffect(() => {
    if (isOpen) {
      setOffsetY(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    if (variant !== 'bottom-sheet') return;
    startY.current = e.clientY;
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || variant !== 'bottom-sheet') return;
    const currentY = e.clientY;
    const deltaY = currentY - startY.current;
    if (deltaY > 0) {
      setOffsetY(deltaY);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging.current || variant !== 'bottom-sheet') return;
    isDragging.current = false;
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    if (offsetY > 100) {
      if (onClose) onClose();
    } else {
      setOffsetY(0);
    }
  };

  return (
    <div 
      className={`absolute inset-0 z-50 flex ${variant === 'bottom-sheet' ? 'items-end' : 'items-center p-4'} justify-center`}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" 
        onClick={onClose}
      />
      
      {/* Modal Content container */}
      <div 
        className={`relative z-10 w-full ${variant === 'bottom-sheet' ? 'max-w-md bg-[#F2EAE0] rounded-t-[32px] pb-6' : 'max-w-[390px] bg-[#F2EAE0] rounded-[40px] p-0 shadow-xl overflow-hidden'} flex flex-col items-center animate-in fade-in ${variant === 'bottom-sheet' ? 'slide-in-from-bottom-full' : 'zoom-in-95'} duration-200`}
        style={variant === 'bottom-sheet' ? { transform: `translateY(${offsetY}px)`, transition: isDragging.current ? 'none' : 'transform 0.2s ease-out' } : {}}
      >
        {variant === 'bottom-sheet' && (
          <div 
            className="w-full flex justify-center py-3 cursor-grab active:cursor-grabbing shrink-0"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
          >
            <div className="h-[5px] w-12 rounded-full bg-[#A5A5A5]" />
          </div>
        )}
        {children}
      </div>
    </div>
  );
}

export default ModalWrapper;
