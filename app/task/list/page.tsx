'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EditLabel } from '@/components/task-label';
import Navbar from '@/components/navbar';

type Subtask = {
  id: string;
  text: string;
};

export default function SubtaskList() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Subtask[]>([
    { id: '1', text: 'Open the document' },
    { id: '2', text: 'Read the last paragraph written' },
    { id: '3', text: 'Write for 5 minutes' },
    { id: '4', text: 'Review the paragraph' }
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);

  // Drag and drop state
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const handleEdit = (id: string) => {
    setEditingId(id);
  };

  const handleSave = () => {
    setEditingId(null);
  };

  const handleTaskChange = (id: string, newText: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text: newText } : t));
  };

  const handleDelete = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const handleAdd = () => {
    const newId = Date.now().toString();
    setTasks([...tasks, { id: newId, text: 'New subtask' }]);
    setEditingId(newId);
  };

  // Drag handlers
  const handleDragStart = (e: React.DragEvent, id: string) => {
    setDraggedTaskId(id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    if (!draggedTaskId || draggedTaskId === targetId) return;

    const draggedIndex = tasks.findIndex(t => t.id === draggedTaskId);
    const targetIndex = tasks.findIndex(t => t.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newTasks = [...tasks];
    const [draggedItem] = newTasks.splice(draggedIndex, 1);
    newTasks.splice(targetIndex, 0, draggedItem);

    setTasks(newTasks);
    setDraggedTaskId(null);
  };

  const handleDragEnd = () => {
    setDraggedTaskId(null);
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-b from-[#b3dcd1] to-[#418b7e] font-['Poppins',sans-serif]">

      {/* Main Content Card */}
      <div className="absolute top-[100px] bottom-0 left-0 right-0 bg-[#FCFEE8] rounded-t-[48px] shadow-2xl pt-[40px] px-6 flex flex-col items-center pb-[100px]">

        {/* Header Section */}
        <div className="flex w-full max-w-[368px] items-start justify-between mb-[40px]">
          <div className="flex flex-col">
            <h1 className="font-serif text-[32px] leading-[42px] font-bold text-[#151515] w-[200px]">
              Final Project HCI
            </h1>
            <p className="text-[14px] leading-[18px] text-[#767676] mt-1">
              You only need to do the first one.
            </p>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            className="flex items-center justify-center gap-2 bg-[#1a1a1a] text-white px-[14px] py-[10px] rounded-[30px] hover:opacity-80 transition-opacity mt-2"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className="font-semibold text-[16px]">Back</span>
          </button>
        </div>

        {/* Task List */}
        <div className="flex flex-col gap-6 items-center w-full max-w-[368px] mt-4 flex-1">
          {tasks.map((t, index) => (
            <div
              key={t.id}
              className={`w-full transition-opacity duration-300 ${draggedTaskId === t.id ? 'opacity-50' : 'opacity-100'}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, t.id)}
            >
              <EditLabel
                className="relative w-full"
                label={`#${index + 1}`}
                task={t.text}
                isEditing={editingId === t.id}
                onEdit={() => handleEdit(t.id)}
                onChange={(val) => handleTaskChange(t.id, val)}
                onSave={handleSave}
                onDelete={() => handleDelete(t.id)}
                draggable={true}
                onDragStart={(e) => handleDragStart(e, t.id)}
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}

          {/* Add Button */}
          <button
            onClick={handleAdd}
            className="flex items-center justify-center w-[60px] h-[60px] bg-[#1a1a1a] rounded-full mt-4 hover:scale-105 transition-transform"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          {/* Start First Step Button */}
          <button 
            onClick={() => router.push('/focus')}
            className="mt-1 mb-[100px] flex items-center justify-center gap-2 w-full bg-[#418b7e] text-white py-[18px] rounded-full hover:opacity-90 transition-opacity"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 3L19 12L5 21V3Z" fill="currentColor" />
            </svg>
            <span className="font-semibold text-[16px]">Start First Step</span>
          </button>
        </div>
      
      </div>
        <Navbar className="!fixed" />
    </div>
  );
}
