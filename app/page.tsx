import Hero from "@components/sections/hero";
import About from "@components/sections/about";
import Expertise from "@components/sections/expertise";
import Experience from "@components/sections/experience";
import Projects from "@components/sections/projects";
import TechStack from "@components/sections/tech-stack";
import Contact from "@components/sections/contact";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      <main className="flex w-full max-w-2xl flex-1 flex-col items-center px-4 sm:items-start lg:max-w-3xl lg:px-12">
        <Hero />
        <About />
        <Expertise />
        <Experience />
        <Projects />
        <TechStack />
        <Contact />
      </main>
    </div>
  );
}
