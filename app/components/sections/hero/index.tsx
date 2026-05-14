import Image from "next/image";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative isolate mx-auto w-full space-y-5 overflow-hidden py-8 text-center sm:text-left md:py-12">
      <Image
        src="/avatar.jpg"
        alt="Andrii Nazarenko"
        width={160}
        height={160}
        className="mx-auto rounded-full sm:mx-0 sm:size-30 md:size-35"
      />

      <span className="mx-auto block w-fit rounded-md border border-foreground/10 px-3 py-1 text-xs sm:mx-0">
        Product-Oriented Frontend Development
      </span>

      <h1 className="text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
        Andrii Nazarenko
      </h1>

      <h2 className="text-lg text-foreground/75 sm:text-xl md:text-2xl">
        Frontend Engineer — React / Next.js / TypeScript
      </h2>

      <p className="text-sm leading-7 text-foreground/75 sm:text-base sm:leading-8">
        Building scalable product-oriented applications with focus on maintainable architecture,
        performance optimization, and modern user experiences.
      </p>

      <div className="flex items-center justify-center gap-3 sm:justify-start">
        <Link
          href="/Andrii-Nazarenko-CV.pdf"
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

export default Hero;
