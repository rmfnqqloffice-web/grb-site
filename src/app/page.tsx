import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { Team } from "@/components/sections/Team";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/fx/Marquee";
import content from "@/content/content.json";

const SERVICE_NAMES = content.services.items.map((s) => s.name);

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={SERVICE_NAMES} variant="dark" />
      <WhyUs />
      <Services />
      <Cases />
      <Team />
      <Partners />
      <Contact />
    </>
  );
}
