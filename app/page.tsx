'use client';
import Button from "../components/button";
import DateWidget from "../components/date-widget";
import {
  TextLabel,
  Dropdown,
  EditLabel,
} from "../components/task-label";

import { RoomsList } from '@/components/rooms';
import {useState} from 'react';
import { Subtask } from "../components/subtask";

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

  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="mx-auto flex min-h-screen max-w-5xl flex-col gap-10 px-6 py-12 md:px-10">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-zinc-500">Havenly UI preview</p>
          <h1 className="text-4xl font-semibold tracking-tight text-white">Crisis Help button system</h1>
          <p className="max-w-2xl text-base leading-7 text-zinc-400">
            Responsive button variants inspired by your Figma design. Each row shows Disabled, Default, and Active states for the same token.
          </p>
        </div>

        <div className="flex flex-col gap-10">
          <DateWidget />

         <div className="max-w-7xl">
                  <h1 className="text-2xl md:text-3xl font-semibold mb-2">Discover Rooms</h1>
                  <p className="text-gray-300">Join a space and connect with others</p>
        
                {/* Room Grid */}
                <RoomsList
                  onRoomSelect={(roomId) => {
                    setSelectedRoom(roomId);
                  }}
                />
          </div>


        <section className="space-y-6 bg-white">

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
          
          </section>

          <div className="space-y-8">
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
