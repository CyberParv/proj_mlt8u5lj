import { Star } from "lucide-react";

export interface TestimonialItem {
  name: string;
  title?: string;
  rating: number;
  quote: string;
}

interface TestimonialsGridProps {
  headline: string;
  subheadline?: string;
  testimonials: TestimonialItem[];
}

export default function TestimonialsGrid({ headline, subheadline, testimonials }: TestimonialsGridProps) {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-semibold">{headline}</h2>
          {subheadline ? (
            <p className="text-muted-foreground mt-3">{subheadline}</p>
          ) : null}
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="rounded-lg border border-border bg-card p-6 shadow-sm">
              <div className="flex gap-1 text-secondary">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4" />
                ))}
              </div>
              <p className="mt-4 text-muted-foreground">“{testimonial.quote}”</p>
              <div className="mt-5">
                <p className="font-semibold">{testimonial.name}</p>
                {testimonial.title ? (
                  <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                ) : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
