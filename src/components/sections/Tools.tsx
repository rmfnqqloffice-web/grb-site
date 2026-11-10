import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import { ToolTabs, type Tool } from "./ToolTabs";
import content from "@/content/content.json";

// 그룹비가 직접 만든 분석·보고 도구(메인 개편). 시연 화면만 쓰고 광고주 이름·수치는 가린다.
export function Tools() {
  const t = content.tools;
  return (
    <section id="tools" aria-labelledby="tools-heading" className="bg-secondary py-20 text-text-on-dark sm:py-24">
      <Container>
        <Reveal>
          <h2
            id="tools-heading"
            className="text-3xl font-black leading-[1.15] tracking-[-0.04em] text-white sm:text-4xl md:text-[44px]"
          >
            {t.heading}
          </h2>
          <p className="mt-4 max-w-[56ch] text-sm text-white/75 sm:text-base">{t.description}</p>
        </Reveal>
        <ToolTabs tools={t.items as Tool[]} />
      </Container>
    </section>
  );
}
