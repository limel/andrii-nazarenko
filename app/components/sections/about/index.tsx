function About() {
  return (
    <section id="about" className="mx-auto w-full space-y-4 py-6 text-center sm:text-left md:py-8">
      <h2 className="text-xl font-medium sm:text-2xl md:text-3xl">About</h2>

      <div className="space-y-3">
        <p className="text-sm leading-7 text-foreground/75 sm:text-base sm:leading-8">
          Frontend Engineer with 6 years of experience building product-oriented web applications,
          marketplaces, admin dashboards, and customer-facing platforms.
        </p>

        <p className="text-sm leading-7 text-foreground/75 sm:text-base sm:leading-8">
          Specialized in React, Next.js, and TypeScript development with focus on scalable frontend
          architecture, maintainable UI systems, API integrations, and performance optimization.
        </p>

        <p className="text-sm leading-7 text-foreground/75 sm:text-base sm:leading-8">
          Experienced in SaaS platforms, e-commerce products, growth funnels, and modern frontend
          workflows within product and distributed teams.
        </p>
      </div>
    </section>
  );
}

export default About;
