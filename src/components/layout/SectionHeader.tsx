import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary-strong">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-3xl font-black leading-[1.15] tracking-[-0.04em] text-secondary sm:text-4xl md:text-[44px]">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-sm leading-relaxed text-text-muted sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}
