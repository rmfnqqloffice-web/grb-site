import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";
import content from "@/content/content.json";

export function Hero() {
  const { intro, company } = content;
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-secondary text-text-on-dark"
    >
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center opacity-30"
        style={{ backgroundImage: `url(${intro.image})` }}
        aria-hidden
      />
      <div
        className="absolute inset-0 -z-10 bg-gradient-to-r from-secondary/95 via-secondary/85 to-secondary/55"
        aria-hidden
      />

      <Container className="flex min-h-[640px] flex-col justify-center py-24 sm:py-32 md:py-40">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">
          {company.name_en} · Performance Marketing Agency
        </p>
        <h1
          id="hero-heading"
          className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl"
        >
          <span className="text-primary">{intro.headline_main}</span>
          <br />
          {intro.headline_sub}
        </h1>
        <div className="mt-8 max-w-2xl space-y-2 text-base text-white/85 sm:text-lg">
          {intro.body.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href="#contact"
            className={cn(
              buttonVariants({ size: "lg" }),
              "bg-primary text-base font-semibold text-white hover:bg-primary-strong",
            )}
          >
            지금 문의하기 <ArrowRight className="ml-1.5 h-4 w-4" />
          </a>
          <a
            href="#services"
            className={cn(
              buttonVariants({ variant: "outline", size: "lg" }),
              "border-white/30 bg-transparent text-base font-semibold text-white hover:bg-white/10 hover:text-white",
            )}
          >
            서비스 살펴보기
          </a>
        </div>
      </Container>
    </section>
  );
}
