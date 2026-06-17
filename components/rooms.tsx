'use client';

type RoomType = "library" | "cafe" | "study" | "park";

type RoomsCardProps = {
  className?: string;
  room: RoomType;
  title?: string;
  peopleCount?: number;
  onClick?: () => void;
};

type RoomsListProps = {
  className?: string;
  onRoomSelect?: (roomId: string) => void;
};

const TopLeftBlob = ({ color }: { color: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-0 z-10 pointer-events-none">
    <path d="M0 0H90C90 0 95 60 50 85C20 101.667 0 90 0 90V0Z" fill={color} />
  </svg>
);

const BackgroundSwirl = () => (
  <div className="absolute right-0 top-0 h-[190px] w-[249px] pointer-events-none z-0 opacity-40 mix-blend-overlay">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 249 190" fill="none">
      <path d="M237.564 117.919C234.995 114.334 233.224 111.159 230.783 108.642C228.263 106.044 224.941 104.264 222.234 101.806C218.201 98.138 213.803 94.6508 210.631 90.2862C204.017 81.2133 205.473 71.7097 214.213 64.6596C218.145 61.4891 222.61 58.919 227.064 56.4633C233.242 53.0486 236.644 47.8921 238.137 41.1355C240.84 28.8944 231.696 17.6268 219.581 20.3215C201.8 24.2716 184.653 29.4237 172.31 45.3359C160.907 60.0542 150.759 75.0675 144.549 92.6571C143.076 96.8312 140.71 100.688 139.279 104.866C138.133 108.205 137.234 111.814 137.169 115.316C137.069 121.255 133.298 124.86 127.608 122.937C124.672 121.945 121.718 119.954 119.677 117.62C111.13 107.941 110.305 96.6425 114.258 84.9124C116.246 78.9979 119.046 73.3498 121.801 67.7262C122.989 65.3003 122.575 64.0617 120.463 62.6153C113.886 58.0793 107.285 57.9592 101.61 63.6173C98.3014 66.9204 95.702 71.2451 93.7259 75.5436C88.7932 86.2114 87.9154 97.6479 88.2764 109.262C88.3635 112.086 88.1466 115.068 87.2823 117.727C85.5183 123.115 80.1023 124.77 75.6988 121.195C73.464 119.376 71.5072 116.775 70.4081 114.113C61.3397 92.3856 64.0681 71.9895 78.0663 53.1481C79.6599 51.007 79.8914 49.5135 78.6206 47.2824C76.6067 43.7808 74.7026 40.1889 73.0228 36.5176C64.2852 17.3343 49.0795 6.04207 29.212 0.39074C27.7092 -0.0437137 26.2079 -0.492459 24.7051 -0.926927C23.2167 -1.36001 21.7254 -1.76443 20.1526 -2.22013C20.8141 -9.04287 21.4534 -15.6368 22.1649 -22.9744C56.2575 -12.5942 78.4831 9.23961 88.669 43.5644C104.805 35.7298 118.448 38.8718 130.355 51.721C131.161 50.7019 131.801 49.7677 132.56 48.9318C142.347 38.0849 151.556 26.6478 162.09 16.5809C174.66 4.57455 191.187 1.05145 207.87 -0.362914C215.018 -0.969272 222.54 -0.225439 229.558 1.40785C252.049 6.64948 262.002 28.1885 256.537 49.1133C253.802 59.6044 248.014 67.7782 238.654 73.3245C235.3 75.3093 231.934 77.2641 227.891 79.6442C229.935 81.5027 231.527 83.1008 233.297 84.4997C236.877 87.3302 241.077 89.5854 244.043 92.9483C248.403 97.8612 252.787 103.123 255.569 108.98C261.262 120.996 256.939 132.084 245.198 138.366C235.878 143.353 225.788 144.223 215.509 143.616C205.089 142.981 194.68 142.073 184.267 141.367C181.685 141.188 179.085 141.355 175.907 141.365C176.4 143.131 176.703 144.474 177.156 145.759C179.715 153.169 182.528 160.487 184.806 167.97C186.24 172.686 187.54 177.591 187.817 182.483C189.44 210.116 162.167 221.578 144.91 216.396C131.358 212.324 117.992 207.072 105.355 200.707C89.0705 192.501 73.4894 182.848 57.8103 173.459C40.1257 162.865 24.4169 149.762 10.1827 134.854C7.90186 132.467 6.71412 130.273 7.42623 126.949C7.95916 124.431 7.98271 121.805 8.29614 118.573C11.0183 119.833 13.3986 120.598 15.4073 121.919C20.5238 125.288 25.5863 128.768 30.4678 132.475C45.3806 143.811 61.1172 153.797 77.884 162.093C94.4847 170.315 111.07 178.551 127.872 186.33C133.62 188.996 139.929 190.632 146.121 192.142C149.437 192.94 153.178 193.072 156.518 192.429C163.814 191.042 166.351 186.914 164.962 179.647C164.395 176.704 163.536 173.806 162.523 170.993C159.382 162.141 156.318 153.239 152.833 144.513C147.417 130.979 150.625 120.823 168.176 119.247C182.057 117.994 195.736 118.079 209.546 119.793C216.58 120.663 223.82 119.993 230.961 119.762C232.778 119.779 234.59 118.814 237.564 117.919Z" fill="url(#roomsPaint)"/>
      <defs>
        <linearGradient id="roomsPaint" x1="145.76" y1="-10.99" x2="123.86" y2="214.88" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.8"/>
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.1"/>
        </linearGradient>
      </defs>
    </svg>
  </div>
);

const roomConfigs: Record<RoomType, {
  title: string;
  gradient: string;
  iconBg: string;
  icon: React.ReactNode;
}> = {
  library: {
    title: "Quiet Library",
    gradient: "linear-gradient(53.93deg, rgb(182, 126, 89) 2.5%, rgb(242, 234, 224) 325.59%)",
    iconBg: "#c09070",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#151515" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3v17a9 9 0 0 0-7-3.5H3V5h2a9 9 0 0 1 7 3.5c1.44-1.92 4-3.5 7-3.5h2v11.5h-2a9 9 0 0 0-7 3.5z"/>
      </svg>
    ),
  },
  cafe: {
    title: "Busy Cafe",
    gradient: "linear-gradient(54.84deg, rgb(175, 182, 250) 52.36%, rgb(109, 115, 177) 157.53%)",
    iconBg: "#afb6fa",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#151515" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3"/>
      </svg>
    ),
  },
  study: {
    title: "Study Hall",
    gradient: "linear-gradient(236.47deg, rgb(251, 222, 140) 30.24%, rgb(250, 206, 104) 89.95%)",
    iconBg: "#face68",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#151515" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72L12 15l5-2.73v3.72z"/>
      </svg>
    ),
  },
  park: {
    title: "Relaxing Park",
    gradient: "linear-gradient(230.52deg, rgb(179, 220, 209) 68.27%, rgb(65, 139, 126) 171.45%)",
    iconBg: "#73afa3",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="#151515" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L4 10H9L5 18H11V22H13V18H19L15 10H20L12 2Z"/>
      </svg>
    ),
  },
};

export function RoomCard({
  className,
  room,
  title,
  peopleCount = 42,
  onClick,
}: RoomsCardProps) {
  const config = roomConfigs[room];
  const displayTitle = title || config.title;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className={
        className ||
        "relative flex flex-col items-start justify-end h-[148px] w-full max-w-[368px] overflow-hidden rounded-[40px] px-6 pb-5 pt-16 transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer text-left shadow-md hover:shadow-lg"
      }
      style={{
        backgroundImage: config.gradient,
      }}
    >
      <BackgroundSwirl />
      <TopLeftBlob color={config.iconBg} />

      {/* Icon Container */}
      <div className="absolute left-[24px] top-[24px] z-20 flex items-center justify-center">
        {config.icon}
      </div>

      {/* Content Text */}
      <div className="relative z-30 flex flex-col w-full pr-12">
        <h3 className="font-serif text-[32px] font-semibold leading-tight text-black">
          {displayTitle}
        </h3>
        <p className="text-[12px] text-[#151515] mt-1">
          {peopleCount} people
        </p>
      </div>

      {/* Plus Button */}
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          console.log("Plus button clicked");
        }}
        className="absolute bottom-6 right-6 z-40 flex h-[42px] w-[42px] items-center justify-center rounded-full bg-[#1a1a1a] text-white hover:bg-black hover:scale-105 active:scale-95 transition-all focus:outline-none focus:ring-4 focus:ring-black/20 shadow-md cursor-pointer"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export function RoomsList({
  className,
  onRoomSelect,
}: RoomsListProps) {
  const rooms: Array<{
    id: RoomType;
    title: string;
    peopleCount: number;
  }> = [
    { id: "library", title: "Quiet Library", peopleCount: 42 },
    { id: "cafe", title: "Busy Cafe", peopleCount: 100 },
    { id: "study", title: "Study Hall", peopleCount: 20 },
    { id: "park", title: "Relaxing Park", peopleCount: 67 },
  ];

  const handleRoomClick = (roomId: RoomType) => {
    onRoomSelect?.(roomId);
  };

  return (
    <div
      className={
        className ||
        "grid gap-10 md:gap-8 grid-cols-1 sm:grid-cols-2"
      }
    >
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room.id}
          title={room.title}
          peopleCount={room.peopleCount || 100}
          onClick={() => handleRoomClick(room.id)}
        />
      ))}
    </div>
  );
}

export default RoomCard;
