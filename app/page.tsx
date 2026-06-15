import Button from "../components/button";
import DateWidget from "../components/date-widget";

const variants = [
  { label: "Danger", variant: "Danger" as const },
  { label: "Warning", variant: "Warning" as const },
  { label: "Dark Neutral", variant: "Dark Neutral" as const },
  { label: "Neutral", variant: "Neutral" as const },
  { label: "Green", variant: "Green" as const },
];

const states = ["Disabled", "Default", "Active"] as const;

export default function Home() {
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
