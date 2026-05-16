"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { Container } from "./Container";
import { cn } from "@/lib/utils";

const NAV = [
  { label: "강점", href: "#why" },
  { label: "서비스", href: "#services" },
  { label: "성과", href: "#cases" },
  { label: "팀", href: "#team" },
  { label: "파트너", href: "#partners" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/70">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="#top"
          className="flex items-center gap-2 text-lg font-extrabold tracking-tight text-text-strong"
        >
          <span className="inline-block h-7 w-7 rounded-md bg-primary" aria-hidden />
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
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className={cn(
            buttonVariants({ size: "lg" }),
            "hidden bg-primary text-base font-semibold text-white hover:bg-primary-strong md:inline-flex",
          )}
        >
          문의하기
        </a>

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
                <span className="text-lg font-extrabold text-text-strong">그룹비</span>
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
                    className="rounded-md px-3 py-3 text-base font-medium text-text-default hover:bg-neutral"
                  >
                    {item.label}
                  </a>
                ))}
                <a
                  href="#contact"
                  onClick={() => setOpen(false)}
                  className="mt-4 rounded-md bg-primary px-3 py-3 text-center text-base font-semibold text-white hover:bg-primary-strong"
                >
                  문의하기
                </a>
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </Container>
    </header>
  );
}
