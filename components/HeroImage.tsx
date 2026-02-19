import { Button } from "@/components/ui/button";

interface CtaLink {
  label: string;
  href: string;
}

interface HeroImageProps {
  headline: string;
  subheadline?: string;
  primaryCta?: CtaLink;
  secondaryCta?: CtaLink;
  badge?: string;
  backgroundImage?: string;
}

export default function HeroImage({
  headline,
  subheadline,
  primaryCta,
  secondaryCta,
  badge,
  backgroundImage,
}: HeroImageProps) {
  return (
    <section className="relative overflow-hidden bg-foreground text-background">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            backgroundImage
              ? "url('https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?q=80&w=1800&auto=format&fit=crop')"
              : "linear-gradient(120deg, #1A1A2E, #2B2B44)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col items-center justify-center px-6 py-20 text-center md:min-h-[640px]">
        {badge ? (
          <span className="rounded-full bg-secondary/20 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-background">
            {badge}
          </span>
        ) : null}
        <h1 className="mt-6 text-4xl font-semibold tracking-tight text-background md:text-7xl">
          {headline}
        </h1>
        {subheadline ? (
          <p className="mt-5 max-w-3xl text-base text-background/80 md:text-lg">
            {subheadline}
          </p>
        ) : null}
        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          {primaryCta ? (
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a href={primaryCta.href}>{primaryCta.label}</a>
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button variant="outline" size="lg" className="border-background text-background hover:bg-background/10" asChild>
              <a href={secondaryCta.href}>{secondaryCta.label}</a>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
