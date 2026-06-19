'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ModalWrapper } from './modal-wrapper';
import { TaskTabs } from './task-tabs';
import { AITaskForm } from './ai-task-form';
import { ManualTaskForm } from './manual-task-form';

type AIDecompositionModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onTabSwitch?: (tab: 'ai' | 'manual') => void;
};

export function AIDecompositionModal({ isOpen = true, onClose, onTabSwitch }: AIDecompositionModalProps) {
  const router = useRouter();
  // Default to AI tab
  const [selectedTab, setSelectedTab] = useState<'ai' | 'manual'>('ai');

  const handleTabChange = (tab: 'ai' | 'manual') => {
    setSelectedTab(tab);
    if (onTabSwitch) onTabSwitch(tab);
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose} variant="bottom-sheet">
      <div className="w-full max-h-[85vh] h-[600px] pt-[12px] pb-[20px] px-[20px] flex flex-col items-center overflow-y-auto overflow-x-hidden">
        
        {/* Sliding Tabs */}
        <TaskTabs selectedTab={selectedTab} onTabChange={handleTabChange} />

        {/* Dynamic Content */}
        {selectedTab === 'ai' ? (
          <AITaskForm />
        ) : (
          <ManualTaskForm onSubmit={() => {
            if (onClose) onClose();
            router.push('/task/ai-processing');
          }} />
        )}

      </div>
    </ModalWrapper>
  );
}

export default AIDecompositionModal;
