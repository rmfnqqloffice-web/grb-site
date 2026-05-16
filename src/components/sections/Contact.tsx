import { Phone, Mail, Globe, ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import content from "@/content/content.json";

export function Contact() {
  const c = content.contact;
  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="relative overflow-hidden bg-secondary py-24 text-text-on-dark sm:py-32"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" aria-hidden />
      <div
        className="absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-primary/20 blur-3xl"
        aria-hidden
      />
      <div
        className="absolute -bottom-40 -left-32 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        aria-hidden
      />

      <Container className="max-w-4xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          Contact
        </p>
        <h2
          id="contact-heading"
          className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl"
        >
          {c.headline}
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-base text-white/75 sm:text-lg">
          광고주의 비즈니스에 가장 적합한 마케팅을 함께 설계합니다.
          편하신 방법으로 그룹비에 문의해 주세요.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          <ContactCard
            icon={Phone}
            label="전화"
            value={c.phone}
            href={`tel:${c.phone.replace(/-/g, "")}`}
          />
          <ContactCard
            icon={Mail}
            label="이메일"
            value={c.email}
            href={`mailto:${c.email}`}
          />
          <ContactCard
            icon={Globe}
            label="웹사이트"
            value={c.website}
            href={`https://${c.website}`}
            external
          />
        </div>

        <div className="mt-12">
          <a
            href={`mailto:${c.email}?subject=${encodeURIComponent("[그룹비] 마케팅 문의")}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-primary text-base font-semibold text-white hover:bg-primary-strong",
            )}
          >
            지금 문의 메일 보내기 <ArrowRight className="ml-1.5 h-4 w-4" />
          </a>
        </div>
      </Container>
    </section>
  );
}

function ContactCard({
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
      className="group flex flex-col items-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur transition hover:-translate-y-0.5 hover:border-primary/50 hover:bg-white/[0.08]"
    >
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 text-primary">
        <Icon className="h-6 w-6" aria-hidden />
      </span>
      <span className="text-xs font-semibold uppercase tracking-wider text-white/55">
        {label}
      </span>
      <span className="font-mono text-base font-semibold text-white group-hover:text-primary">
        {value}
      </span>
    </a>
  );
}
