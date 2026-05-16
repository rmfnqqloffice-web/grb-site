import { Hero } from "@/components/sections/Hero";
import { WhyUs } from "@/components/sections/WhyUs";
import { Services } from "@/components/sections/Services";
import { Cases } from "@/components/sections/Cases";
import { Team } from "@/components/sections/Team";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyUs />
      <Services />
      <Cases />
      <Team />
      <Partners />
      <Contact />
    </>
  );
}
