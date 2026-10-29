import { sql } from "@/lib/db";

type ExpertiseCard = {
  id: number;
  title: string;
  description: string;
  icon_svg: string;
  icon_viewbox: string;
};

function ExpertiseCard({ card }: { card: ExpertiseCard }) {
  return (
    <div className="group border-foreground/10 hover:border-foreground/20 hover:bg-foreground/2 flex flex-col gap-3 rounded-xl border p-5 transition-all duration-300 hover:-translate-y-0.5">
      <span className="text-foreground/50 group-hover:text-foreground/80 transition-colors duration-300">
        <svg
          width="18"
          height="18"
          viewBox={card.icon_viewbox || "0 0 24 24"}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          dangerouslySetInnerHTML={{ __html: card.icon_svg }}
        />
      </span>
      <h3 className="text-base font-medium tracking-tight">{card.title}</h3>
      <p className="text-foreground/85 text-xs leading-relaxed">{card.description}</p>
    </div>
  );
}

export default async function Expertise() {
  const cards = (await sql`
    SELECT * FROM expertise ORDER BY sort_order, id
  `) as ExpertiseCard[];

  return (
    <section id="expertise" className="mx-auto w-full space-y-8 py-6 md:py-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-medium md:text-3xl">Core Expertise</h2>
        <p className="text-foreground/85 text-sm">
          Building scalable web products, from software architecture and reusable UI systems to
          backend APIs and integrations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <ExpertiseCard key={card.id} card={card} />
        ))}
      </div>
    </section>
  );
}
