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

const roomConfigs: Record<RoomType, {
  title: string;
  gradient: string;
  iconBg: string;
  vector: string;
  group: string;
  icon: string;
  iconAlt?: string;
}> = {
  library: {
    title: "Quiet Library",
    gradient: "linear-gradient(53.93769067214052deg, rgb(182, 126, 89) 2.526%, rgb(242, 234, 224) 325.59%)",
    iconBg: "#c09070",
    vector: "https://www.figma.com/api/mcp/asset/695c1cdb-c19b-49a7-9395-9acb3ebddac9",
    group: "https://www.figma.com/api/mcp/asset/d6b62b4a-b749-4d27-8f94-48c207c260d9",
    icon: "https://www.figma.com/api/mcp/asset/eddc4046-b575-445f-a605-c953a42b25ad",
    iconAlt: "Book icon",
  },
  cafe: {
    title: "Busy Cafe",
    gradient: "linear-gradient(54.8480029007699deg, rgb(175, 182, 250) 52.364%, rgb(109, 115, 177) 157.53%)",
    iconBg: "#afb6fa",
    vector: "https://www.figma.com/api/mcp/asset/5cb84622-f2b1-46c0-98c9-0fcd1f82897e",
    group: "https://www.figma.com/api/mcp/asset/a0f0ef48-fe9f-4a76-9c59-9644823314f5",
    icon: "https://www.figma.com/api/mcp/asset/0319ab57-21a3-4c00-a61a-d8629d6ab865",
    iconAlt: "Drink icon",
  },
  study: {
    title: "Study Hall",
    gradient: "linear-gradient(236.47421819045053deg, rgb(251, 222, 140) 30.249%, rgb(250, 206, 104) 89.955%)",
    iconBg: "#face68",
    vector: "https://www.figma.com/api/mcp/asset/d49114df-dc61-494e-aea6-c7bd8433e33c",
    group: "https://www.figma.com/api/mcp/asset/4ad3303d-840b-4669-b0fe-ebfeeb6a5ddf",
    icon: "https://www.figma.com/api/mcp/asset/42b5ebde-3a13-4603-bdd5-cfe79386ea83",
    iconAlt: "Mortarboard icon",
  },
  park: {
    title: "Relaxing Park",
    gradient: "linear-gradient(230.52238589363404deg, rgb(179, 220, 209) 68.279%, rgb(65, 139, 126) 171.45%)",
    iconBg: "#73afa3",
    vector: "https://www.figma.com/api/mcp/asset/d3e4e538-74c7-49d6-8585-ef7db0d8a9f8",
    group: "https://www.figma.com/api/mcp/asset/6fd6ea11-662e-4913-aa51-f12e3cd9d8f4",
    icon: "https://www.figma.com/api/mcp/asset/d9479926-fea2-4e2b-9ed1-e8b9f3185c4c",
    iconAlt: "Tree icon",
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
    <button
      onClick={onClick}
      className={
        className ||
        "content-stretch flex flex-col gap-[10px] h-[148px] items-start justify-end overflow-clip pb-[20px] pt-[64px] px-[16px] relative rounded-[40px] w-[368px] transition-transform duration-200 hover:scale-105 active:scale-95 cursor-pointer"
      }
      data-node-id="294:4004"
      style={{
        backgroundImage: config.gradient,
      }}
    >
      {/* Decorative Vector Background */}
      <div className="absolute flex h-[410.742px] items-center justify-center left-[16px] top-[-95px] w-[406.077px] pointer-events-none">
        <div className="flex-none rotate-[35.88deg]">
          <div
            className="h-[302.892px] relative w-[282.089px]"
            data-node-id="288:3927"
            data-name="Vector"
          >
            <img
              alt=""
              className="absolute block inset-0 max-w-none size-full"
              src={config.vector}
            />
          </div>
        </div>
      </div>

      {/* Decorative Group */}
      <div
        className="absolute h-[152.5px] left-[-20px] top-[-39px] w-[149.383px] pointer-events-none"
        data-node-id="292:3942"
      >
        <img
          alt=""
          className="absolute block inset-0 max-w-none size-full"
          src={config.group}
        />
      </div>

      {/* Content Text */}
      <div
        className="content-stretch flex flex-col items-start relative shrink-0 z-10"
        data-node-id="292:3949"
      >
        <p
          className="[word-break:break-word] font-['Source_Serif_Pro:SemiBold'] leading-[42px] not-italic relative shrink-0 text-[32px] text-black w-full"
          data-node-id="288:3925"
        >
          {displayTitle}
        </p>
        <div
          className="content-stretch flex items-center overflow-clip pl-[4px] relative shrink-0 w-full"
          data-node-id="292:3950"
        >
          <p
            className="[word-break:break-word] font-['Poppins:Regular'] leading-[16px] not-italic relative shrink-0 text-[#151515] text-[12px] whitespace-nowrap"
            data-node-id="288:3926"
          >
            {peopleCount} people
          </p>
        </div>
      </div>

      {/* Icon Container */}
      <div
        className="absolute bg-[#c09070] content-stretch flex items-center justify-center left-[10px] rounded-[30px] size-[48px] top-[10px] z-20"
        data-node-id="292:3944"
        style={{
          backgroundColor: config.iconBg,
        }}
      >
        <div
          className="relative shrink-0 size-[24px]"
          data-node-id="292:3945"
          data-name="Book_open_alt_fill"
        >
          <div
            className="absolute h-[15px] left-[3px] top-[4px] w-[18px]"
            data-node-id="I292:3945;233:12133"
            data-name="Vector"
          >
            <div className="absolute inset-[-6.67%_-5.56%]">
              <img
                alt={config.iconAlt || "Room icon"}
                className="block max-w-none size-full"
                src={config.icon}
              />
            </div>
          </div>
        </div>
      </div>
    </button>
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
        "grid gap-10 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2"
      }
    >
      {rooms.map((room) => (
        <RoomCard
          key={room.id}
          room={room.id}
          title={room.title}
          peopleCount={room.peopleCount}
          onClick={() => handleRoomClick(room.id)}
        />
      ))}
    </div>
  );
}

export default RoomCard;
