"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  headline: string;
  faqs: FAQItem[];
}

export default function FAQAccordion({ headline, faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold text-center">{headline}</h2>
        <div className="mt-10 space-y-4">
          {faqs.map((faq, index) => {
            const open = openIndex === index;
            return (
              <div key={faq.question} className="rounded-lg border border-border bg-card">
                <button
                  className="w-full flex items-center justify-between p-5 text-left"
                  onClick={() => setOpenIndex(open ? null : index)}
                  aria-expanded={open}
                >
                  <span className="font-medium">{faq.question}</span>
                  <span className={`text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`}>▼</span>
                </button>
                {open ? (
                  <div className="px-5 pb-5 text-muted-foreground">
                    {faq.answer}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
