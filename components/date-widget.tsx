'use client';

const dayLabels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

type CalendarDay = {
  label: string;
  date: number;
  isToday: boolean;
};

function buildCurrentWeek(): { title: string; monthYear: string; days: CalendarDay[] } {
  const today = new Date();
  const weekday = today.toLocaleDateString('en-US', { weekday: 'long' });
  const monthYear = today.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const days = dayLabels.map((label, index) => {
    const day = new Date(startOfWeek);
    day.setDate(startOfWeek.getDate() + index);
    return {
      label,
      date: day.getDate(),
      isToday: day.toDateString() === today.toDateString(),
    };
  });

  return {
    title: weekday,
    monthYear,
    days,
  };
}

export default function DateWidget() {
  const calendar = buildCurrentWeek();

  return (
    <section className="max-w-md rounded-4xl bg-white p-6 text-[#1a1a1a] shadow-[0_24px_60px_rgba(0,0,0,0.12)]">
      <div className="flex flex-col gap-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[48px] leading-14.5 font-serif font-bold tracking-[-0.02em]">
            {calendar.title}
          </h2>
          <p className="text-sm font-semibold text-[#151515]">{calendar.monthYear}</p>
        </div>

        <div className="grid grid-cols-7 gap-4">
          {calendar.days.map((day) => (
            <div key={day.label} className="flex flex-col items-center gap-2">
              <span className={`text-[14px] font-semibold ${day.isToday ? 'text-[#2f685f]' : 'text-[#2f685f]/70'}`}>
                {day.label}
              </span>
              <span
                className={`flex h-9 w-9 items-center justify-center rounded-full text-[14px] font-semibold ${
                  day.isToday ? 'bg-[#1a1a1a] text-white' : 'text-[#2f685f]'
                }`}
              >
                {day.date}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
