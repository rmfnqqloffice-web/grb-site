import { Hero } from "@/components/sections/Hero";
import { Cases } from "@/components/sections/Cases";
import { Services } from "@/components/sections/Services";
import { Tools } from "@/components/sections/Tools";
import { Process } from "@/components/sections/Process";
import { Partners } from "@/components/sections/Partners";
import { Contact } from "@/components/sections/Contact";
import { Marquee } from "@/components/fx/Marquee";
import content from "@/content/content.json";

const SERVICE_NAMES = content.services.items.map((s) => s.name);

// 구역 순서(메인 개편, 시안 2): 히어로 → 마키 → 사례 → 서비스 → 도구 → 일하는 방식 → 파트너 → 문의.
// 사례는 공개할 것이 없으면 Cases 가 스스로 빠진다.
export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee items={SERVICE_NAMES} variant="dark" />
      <Cases />
      <Services />
      <Tools />
      <Process />
      <Partners />
      <Contact />
    </>
  );
}
