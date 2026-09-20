import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { IntroGlyphs } from "@/components/intro-glyphs";
import { Hero } from "@/components/sections/hero";
import { Worlds } from "@/components/sections/worlds";
import { About } from "@/components/sections/about";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { JobMatcherSection } from "@/components/sections/job-matcher-section";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1">
        <IntroGlyphs>
          <Hero />
        </IntroGlyphs>
        <Worlds />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <JobMatcherSection />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
