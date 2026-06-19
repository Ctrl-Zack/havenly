'use client';
import Button from "../components/button";
import DateWidget from '@/components/date-widget';
import { People } from '@/components/people';
import { Progress } from '@/components/progress';
import { Task } from '@/components/task';
import {
  TextLabel,
  Dropdown,
  EditLabel,
} from "../components/task-label";

import { RoomsList } from '@/components/rooms';
import {useState} from 'react';
import { Subtask } from "../components/subtask";
import { DocumentButton } from "../components/document-button";
import { CurrentTaskCard } from "../components/current-task-card";
import { EmptyTaskCard } from "../components/empty-task-card";
import { CompletedTaskCard } from "../components/completed-task-card";
import { RoomTimer } from "../components/room-timer";
import { Plan } from "../components/plan";
import { Slider } from "../components/slider";
import { Feeling } from "../components/feeling";
import { AIDecompositionModal } from "../components/AIDecompositionModal";
import { ManualTaskModal } from "../components/ManualTaskModal";
import { TimerModal } from "../components/TimerModal";
import { TimesUpModal } from "../components/TimesUpModal";
import { FinishedTaskModal } from "../components/FinishedTaskModal";

const variants = [
  { label: "Danger", variant: "Danger" as const },
  { label: "Warning", variant: "Warning" as const },
  { label: "Dark Neutral", variant: "Dark Neutral" as const },
  { label: "Neutral", variant: "Neutral" as const },
  { label: "Green", variant: "Green" as const },
];

const states = ["Disabled", "Default", "Active"] as const;

export default function Home() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
  const [isAIModalOpen, setAIModalOpen] = useState(false);
  const [isManualModalOpen, setManualModalOpen] = useState(false);
  const [isTimerModalOpen, setTimerModalOpen] = useState(false);
  const [isTimesUpModalOpen, setTimesUpModalOpen] = useState(false);
  const [isFinishedModalOpen, setFinishedModalOpen] = useState(false);

  return (
    <div className="min-h-full bg-zinc-950 text-white">
      <main className="mx-auto flex min-h-full max-w-5xl flex-col gap-10 px-6 py-12 md:px-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Havenly App</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Components Preview</h1>
        </div>

        <div className="flex flex-col gap-10">
          <DateWidget />

         <div className="max-w-7xl space-y-6">
                  <h1 className="text-2xl md:text-3xl font-semibold mb-2">Discover Rooms</h1>
                  <p className="text-gray-300">Join a space and connect with others</p>
        
                {/* People Component */}
          <div className="w-[390px] p-6 border rounded-[40px] flex flex-col gap-4 bg-white/50 backdrop-blur-md">
            <h2 className="text-xl font-bold">People Component</h2>
            <div className="flex gap-4 p-4 bg-[#2c2c2c] rounded-xl items-center justify-center">
              <People variant="focus" />
              <People variant="idle" />
              <People variant="not focus" />
            </div>
          </div>

          {/* Progress Component */}
          <div className="w-[450px] p-6 border rounded-[40px] flex flex-col gap-4 bg-white/50 backdrop-blur-md">
            <h2 className="text-xl font-bold">Progress Component</h2>
            <div className="flex flex-col gap-4 p-6 bg-[#2c2c2c] rounded-xl items-center">
              <Progress value={1} />
              <Progress value={2} variant="warning" />
              <Progress value={3} />
              <Progress value={4} />
              <Progress value={5} />
              <Progress value={6} />
              <Progress value={0} />
            </div>
          </div>
          </div>

        <section className="space-y-6 bg-white inline-block p-4 rounded-3xl">

            <h2 className="text-xl font-bold text-black">
              Task Label Variants
            </h2>

            <TextLabel
              label="Current Task"
              task="Open the Document"
            />

            <Dropdown
              label="Current Task"
              task="Open the Document"
              onDropdownClick={() => {
                console.log("dropdown");
              }}
            />

            <EditLabel
              task="Open the Document"
              onEdit={() => {
                console.log("edit");
              }}
              onDelete={() => {
                console.log("delete");
              }}
            />

          <h2 className="text-xl font-bold text-black">
            Task Components
          </h2>

          <Subtask />
          <DocumentButton />

          <h2 className="text-xl font-bold text-black">
            Plan
          </h2>
          <Plan/>

          <h2 className="text-xl font-bold text-black">
            Slider
          </h2>
            <Slider />
          
          <h2 className="text-xl font-bold text-black">
            Room Timer
          </h2>
            <RoomTimer />

                <h2 className="text-2xl md:text-3xl font-semibold mb-2">Task Component</h2>
            <div className="flex flex-col gap-6 rounded-xl items-center">
              <Task variant="normal" />
              <Task variant="high-contrast" index={2} />
            </div>

        </section>

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
              Task List Cards
          </h2>
            <div className="flex flex-wrap gap-16">
              <EmptyTaskCard />
              <CurrentTaskCard />
              <CompletedTaskCard />
            </div>

          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Feeling
          </h2>
            <Feeling />
        </div>

        <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Rooms List
          </h2>
        <RoomsList
          onRoomSelect={(roomId) => {
            setSelectedRoom(roomId);
          }}
        />

        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Modals
          </h2>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setAIModalOpen(true)} className="px-4 py-2 bg-white text-black font-semibold rounded-lg">AI Decomposition Modal</button>
            <button onClick={() => setManualModalOpen(true)} className="px-4 py-2 bg-white text-black font-semibold rounded-lg">Manual Task Modal</button>
            <button onClick={() => setTimerModalOpen(true)} className="px-4 py-2 bg-white text-black font-semibold rounded-lg">Timer Modal</button>
            <button onClick={() => setTimesUpModalOpen(true)} className="px-4 py-2 bg-white text-black font-semibold rounded-lg">Time's Up Modal</button>
            <button onClick={() => setFinishedModalOpen(true)} className="px-4 py-2 bg-white text-black font-semibold rounded-lg">Finished Task Modal</button>
          </div>

          <AIDecompositionModal isOpen={isAIModalOpen} onClose={() => setAIModalOpen(false)} />
          <ManualTaskModal isOpen={isManualModalOpen} onClose={() => setManualModalOpen(false)} />
          <TimerModal isOpen={isTimerModalOpen} onClose={() => setTimerModalOpen(false)} />
          <TimesUpModal isOpen={isTimesUpModalOpen} onClose={() => setTimesUpModalOpen(false)} />
          <FinishedTaskModal isOpen={isFinishedModalOpen} onClose={() => setFinishedModalOpen(false)} />
        </div>

        <div className="space-y-8">
          <h2 className="text-2xl md:text-3xl font-semibold mb-2">
            Button Variants
          </h2>
            {variants.map((item) => (
              <section key={item.variant} className="space-y-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-400">{item.label}</p>
                  </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-3">
                  {states.map((state) => (
                    <Button
                      key={`${item.variant}-${state}`}
                      variant={item.variant}
                      state={state}
                      text="Crisis Help"
                    />
                  ))}
                </div>
              </section>
            ))}

            <section className="space-y-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-zinc-400">Size variants</p>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <Button variant="Green" state="Default" text="Crisis Help" size="default" iconPosition="right" />
                <Button variant="Green" state="Default" text="Crisis Help" size="compact" iconPosition="left" />
                <Button variant="Green" state="Default" size="icon" ariaLabel="Crisis Help" />
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
