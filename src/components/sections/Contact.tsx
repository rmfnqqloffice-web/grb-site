import { Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Reveal } from "@/components/fx/Reveal";
import content from "@/content/content.json";

export function Contact() {
  const c = content.contact;
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="bg-primary py-24 text-white sm:py-28"
    >
      <Container className="max-w-4xl text-center">
        <Reveal>
          <h2
            id="contact-heading"
            className="text-4xl font-black leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl"
          >
            {c.headline}
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p className="mx-auto mt-6 max-w-2xl text-base text-white/85 sm:text-lg">
            광고주의 비즈니스에 가장 적합한 마케팅을 함께 설계합니다. 편하신
            방법으로 그룹비에 문의해 주세요.
          </p>
        </Reveal>

        <Reveal delay={220}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <ContactPill
              icon={Phone}
              label="전화"
              value={c.phone}
              href={`tel:${c.phone.replace(/-/g, "")}`}
            />
            <ContactPill icon={Mail} label="이메일" value={c.email} href={`mailto:${c.email}`} />
            <ContactPill
              icon={Globe}
              label="웹사이트"
              value={c.website}
              href={`https://${c.website}`}
              external
            />
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-12">
            <a
              href={`mailto:${c.email}?subject=${encodeURIComponent("[그룹비] 마케팅 문의")}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-10 py-4 text-base font-black text-white transition hover:bg-secondary/85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              지금 문의 메일 보내기 <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}

function ContactPill({
  icon: Icon,
  label,
  value,
  href,
  external = false,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href: string;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer noopener" : undefined}
      className="inline-flex items-center gap-2 rounded-full border-2 border-white/40 px-5 py-2.5 text-sm font-bold text-white transition hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      <Icon className="h-4 w-4" aria-hidden />
      <span className="sr-only">{label} </span>
      <span className="font-mono">{value}</span>
    </a>
  );
}
