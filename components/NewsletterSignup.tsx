"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface NewsletterSignupProps {
  headline: string;
  subheadline?: string;
  incentive?: string;
  placeholder?: string;
  buttonText?: string;
  privacyNote?: string;
}

export default function NewsletterSignup({
  headline,
  subheadline,
  incentive,
  placeholder = "Enter your email",
  buttonText = "Subscribe",
  privacyNote,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim()) {
      setStatus("error");
      setMessage("Please enter a valid email address.");
      return;
    }
    setStatus("loading");
    setMessage(null);
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscription failed");
      }

      setStatus("success");
      setMessage("You're subscribed! Watch your inbox for our next release.");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setMessage("Unable to subscribe right now. Please try again later.");
    }
  };

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-semibold">{headline}</h2>
        {subheadline ? (
          <p className="text-muted-foreground mt-3">{subheadline}</p>
        ) : null}
        <form onSubmit={handleSubmit} className="mt-8 flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={placeholder}
            className="flex-1"
            aria-label="Email address"
          />
          <Button type="submit" disabled={status === "loading"} className="px-8">
            {status === "loading" ? "Submitting..." : buttonText}
          </Button>
        </form>
        {incentive ? <p className="text-sm text-muted-foreground mt-3">{incentive}</p> : null}
        {privacyNote ? <p className="text-xs text-muted-foreground mt-2">{privacyNote}</p> : null}
        {message ? (
          <p className={`mt-4 text-sm ${status === "error" ? "text-destructive" : "text-secondary"}`}>
            {message}
          </p>
        ) : null}
      </div>
    </section>
  );
}
