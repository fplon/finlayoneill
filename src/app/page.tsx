import { Bio } from "@/components/bio/bio";
import { Contact } from "@/components/contact/contact";
import { Experience } from "@/components/experience/experience";
import { Header } from "@/components/header/header";
import { Hero } from "@/components/hero/hero";

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Bio />
      <Experience />
      {/* <Projects /> */}
      <Contact />
    </main>
  );
}
