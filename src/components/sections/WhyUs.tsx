import { UserCheck, LineChart, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Container } from "@/components/layout/Container";
import { SectionHeader } from "@/components/layout/SectionHeader";
import content from "@/content/content.json";

const ICON_MAP = {
  user: UserCheck,
  "monitor-chart": LineChart,
  lightbulb: Lightbulb,
} as const;

export function WhyUs() {
  const items = content.value_propositions.items;
  return (
    <section id="why" aria-labelledby="why-heading" className="bg-neutral py-24 sm:py-28">
      <Container>
        <SectionHeader
          eyebrow="Why GROUPB"
          title={
            <span id="why-heading">
              왜 <span className="text-primary-strong">그룹비</span>여야 합니까
            </span>
          }
          description="다양한 분야의 전문가가 모여, 광고주에게 가장 필요한 마케팅을 제안합니다."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((item) => {
            const Icon = ICON_MAP[item.icon as keyof typeof ICON_MAP] ?? UserCheck;
            return (
              <Card
                key={item.title}
                className="border-border/60 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <CardContent className="flex flex-col gap-5 p-7">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary-soft text-primary-strong">
                    <Icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="text-xl font-bold text-text-strong">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-muted">
                    {item.body}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
