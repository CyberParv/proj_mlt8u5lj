import { Award, RefreshCw, Shield, Truck } from "lucide-react";

const iconMap = {
  Shield,
  RefreshCw,
  Truck,
  Award,
};

export interface FeatureItem {
  icon: keyof typeof iconMap;
  title: string;
  description: string;
}

interface FeaturesGridProps {
  headline: string;
  subheadline?: string;
  features: FeatureItem[];
}

export default function FeaturesGrid({ headline, subheadline, features }: FeaturesGridProps) {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold">{headline}</h2>
          {subheadline ? (
            <p className="text-muted-foreground mt-3">{subheadline}</p>
          ) : null}
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div key={feature.title} className="rounded-lg border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:shadow-xl">
                <Icon className="h-6 w-6 text-secondary" />
                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
