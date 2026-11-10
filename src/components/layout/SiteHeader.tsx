"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "./Container";
import { LogoMark } from "./Logo";
import { cn } from "@/lib/utils";
import { CASES } from "@/lib/cases";

// 키보드 포커스 링 — 전역 outline-ring/50(반투명 초록 1px)은 흰 머리글 위에서 거의 안 보인다
const FOCUS = "rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-strong";

// 메인 개편 구역 순서와 같게. "성과"는 공개할 사례가 있을 때만(사례 구역이 없으면 갈 곳이 없다).
const NAV = [
  ...(CASES.length ? [{ label: "성과", href: "/#cases" }] : []),
  { label: "서비스", href: "/#services" },
  { label: "도구", href: "/#tools" },
  { label: "일하는 방식", href: "/#process" },
  { label: "파트너", href: "/#partners" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/#top"
          className={cn("flex items-center gap-2 text-lg font-extrabold tracking-tight text-text-strong", FOCUS)}
        >
          <LogoMark className="h-7 w-7 shrink-0 text-primary" />
          그룹비
        </Link>

        <nav className="hidden items-center gap-7 md:flex" aria-label="주요 메뉴">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-medium text-text-muted transition-colors",
                "hover:text-text-strong",
                FOCUS,
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <Link
          href="/#contact"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hidden bg-primary text-base font-semibold text-white hover:bg-primary-strong md:inline-flex",
          )}
        >
          문의하기
        </Link>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "md:hidden",
            )}
            aria-label="메뉴 열기"
          >
            <Menu className="h-5 w-5" />
          </SheetTrigger>
          <SheetContent side="right" className="w-[78%] sm:max-w-sm">
            <SheetTitle className="sr-only">사이트 메뉴</SheetTitle>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between px-1 pt-2">
                <span className="flex items-center gap-2 text-lg font-extrabold text-text-strong">
                  <LogoMark className="h-6 w-6 shrink-0 text-primary" />
                  그룹비
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="메뉴 닫기"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="mt-8 flex flex-col gap-2" aria-label="주요 메뉴">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={cn("rounded-md px-3 py-3 text-base font-medium text-text-default hover:bg-neutral active:bg-neutral", FOCUS)}
                  >
                    {item.label}
                  </a>
                ))}
                <Link
                  href="/#contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-md bg-primary px-3 py-3 text-center text-base font-semibold text-white hover:bg-primary-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-strong"
                >
                  문의하기
                </Link>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
