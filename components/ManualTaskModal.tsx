'use client';

import React, { useState } from 'react';
import { ModalWrapper } from './modal-wrapper';
import { TaskTabs } from './task-tabs';
import { AITaskForm } from './ai-task-form';
import { ManualTaskForm } from './manual-task-form';

type ManualTaskModalProps = {
  isOpen?: boolean;
  onClose?: () => void;
  onTabSwitch?: (tab: 'ai' | 'manual') => void;
};

export function ManualTaskModal({ isOpen = true, onClose, onTabSwitch }: ManualTaskModalProps) {
  // Default to Manual tab
  const [selectedTab, setSelectedTab] = useState<'ai' | 'manual'>('manual');

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
          <ManualTaskForm onSubmit={onClose} />
        )}

      </div>
    </ModalWrapper>
  );
}

export default ManualTaskModal;
