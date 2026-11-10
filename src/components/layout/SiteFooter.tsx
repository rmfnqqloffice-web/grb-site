import Link from "next/link";
import { Container } from "./Container";
import { LogoMark } from "./Logo";
import content from "@/content/content.json";
import { CASES } from "@/lib/cases";

export function SiteFooter() {
  const c = content.company;
  // 위 바깥 여백을 두지 않는다 — 문의 구역(그린)과 바닥글(네이비) 사이에 흰 띠가 생겼다.
  // 다른 페이지(개인정보처리방침)는 본문 아래 여백이 있다.
  return (
    <footer className="border-t border-border/60 bg-secondary text-text-on-dark">
      <Container className="grid gap-10 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 text-lg font-extrabold">
            <LogoMark className="h-7 w-7 shrink-0 text-primary-bright" />
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
            {/* 머리 메뉴와 같은 구역(메인 개편). "성과"는 공개할 사례가 있을 때만 */}
            {[
              ...(CASES.length ? [{ href: "/#cases", label: "성과" }] : []),
              { href: "/#services", label: "서비스" },
              { href: "/#tools", label: "도구" },
              { href: "/#process", label: "일하는 방식" },
              { href: "/#partners", label: "파트너" },
              { href: "/#contact", label: "문의" },
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
          <div className="flex items-center gap-3">
            <Link href="/privacy" className="font-semibold text-white/80 hover:text-white">
              개인정보 처리방침
            </Link>
            <span aria-hidden>·</span>
            <p>Made with care for our clients.</p>
          </div>
        </Container>
      </div>
    </footer>
  );
}
