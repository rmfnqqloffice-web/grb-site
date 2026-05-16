import { Container } from "./Container";
import content from "@/content/content.json";

export function SiteFooter() {
  const c = content.company;
  return (
    <footer className="mt-24 border-t border-border/60 bg-secondary text-text-on-dark">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold">
            <span className="inline-block h-7 w-7 rounded-md bg-primary" aria-hidden />
            {c.name_ko}
          </div>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            {c.tagline}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Contact
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-white/85">
            <li>
              <a href={`tel:${c.phone.replace(/-/g, "")}`} className="hover:text-white">
                {c.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${c.email}`} className="hover:text-white">
                {c.email}
              </a>
            </li>
            <li>
              <a
                href={`https://${c.domain}`}
                className="hover:text-white"
                target="_blank"
                rel="noreferrer noopener"
              >
                {c.domain}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-wider text-white/60">
            Quick Links
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-white/85">
            {[
              { href: "#why", label: "강점" },
              { href: "#services", label: "서비스" },
              { href: "#cases", label: "성과" },
              { href: "#team", label: "팀" },
              { href: "#partners", label: "파트너" },
              { href: "#contact", label: "문의" },
            ].map((l) => (
              <li key={l.href}>
                <a href={l.href} className="hover:text-white">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container className="flex flex-col items-center justify-between gap-2 py-5 text-xs text-white/55 sm:flex-row">
          <p>© {new Date().getFullYear()} {c.name_ko} ({c.name_en}). All rights reserved.</p>
          <p>Made with care for our clients.</p>
        </Container>
      </div>
    </footer>
  );
}
