'use client';

import { useState } from 'react';
import { RoomsList } from '@/components/rooms';

export default function RoomsPage() {
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold mb-2">Discover Rooms</h1>
          <p className="text-gray-300">Join a space and connect with others</p>
        </div>

        {/* Room Grid */}
        <RoomsList
          onRoomSelect={(roomId) => {
            setSelectedRoom(roomId);
          }}
        />
      </div>
    </main>
  );
}
