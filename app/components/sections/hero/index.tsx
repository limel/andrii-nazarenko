import Image from "next/image";
import Link from "next/link";
import { sql } from "@/lib/db";

type Hero = {
  name: string;
  role: string;
  badge: string;
  description: string;
  cv_url: string;
};

export default async function Hero() {
  const [hero] = (await sql`SELECT * FROM hero WHERE id = 1`) as Hero[];

  return (
    <section className="relative isolate mx-auto w-full space-y-5 overflow-hidden py-8 text-center sm:text-left md:py-12">
      <Image
        src="/avatar.jpg"
        alt={hero.name}
        width={160}
        height={160}
        className="mx-auto rounded-full sm:mx-0 sm:size-30 md:size-35"
      />

      <span className="mx-auto block w-fit rounded-md border border-foreground/10 px-3 py-1 text-xs sm:mx-0">
        {hero.badge}
      </span>

      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
        {hero.name}
      </h1>

      <h2 className="text-lg text-foreground/75 sm:text-xl md:text-2xl">
        {hero.role}
      </h2>

      <p className="whitespace-pre-wrap text-sm leading-7 text-foreground/75 sm:text-base sm:leading-8">
        {hero.description}
      </p>

      <div className="flex items-center justify-center gap-3 sm:justify-start">
        <Link
          href={hero.cv_url}
          className="rounded-lg bg-foreground px-4 py-2 text-sm text-background transition-opacity hover:opacity-75"
        >
          Download CV
        </Link>
        <Link
          href="#contact"
          className="rounded-lg border border-foreground/15 px-4 py-2 text-sm transition-colors hover:border-foreground/30"
        >
          Contact Me
        </Link>
      </div>
    </section>
  );
}
