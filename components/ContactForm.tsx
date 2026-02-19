"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export interface ContactField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "select" | "textarea";
  required?: boolean;
  options?: string[];
}

interface ContactFormProps {
  headline: string;
  fields: ContactField[];
  submitButton: string;
  successMessage?: string;
}

const subjectMap: Record<string, string> = {
  "General Inquiry": "GENERAL",
  "Custom Order": "CUSTOM_ORDER",
  "Book Appointment": "BOOK_APPOINTMENT",
  "Order Status": "ORDER_STATUS",
  Feedback: "FEEDBACK",
};

export default function ContactForm({ headline, fields, submitButton, successMessage }: ContactFormProps) {
  const initialState = useMemo(() => {
    return fields.reduce<Record<string, string>>((acc, field) => {
      acc[field.name] = "";
      return acc;
    }, {});
  }, [fields]);

  const [values, setValues] = useState<Record<string, string>>(initialState);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string | null>(null);

  const updateValue = (name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    for (const field of fields) {
      if (field.required && !values[field.name]?.trim()) {
        return `${field.label} is required.`;
      }
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const error = validate();
    if (error) {
      setStatus("error");
      setMessage(error);
      return;
    }

    setStatus("loading");
    setMessage(null);

    const payload = {
      name: values.name,
      email: values.email,
      phone: values.phone,
      subject: subjectMap[values.subject] ?? "GENERAL",
      message: values.message,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      setMessage(successMessage ?? "Thanks for reaching out! We'll be in touch soon.");
      setValues(initialState);
    } catch (error) {
      setStatus("error");
      setMessage("Unable to send your message right now. Please try again later.");
    }
  };

  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-semibold text-center">{headline}</h2>
        <form onSubmit={handleSubmit} className="mt-10 rounded-lg border border-border bg-background p-6 md:p-8 space-y-5">
          <div className="grid md:grid-cols-2 gap-4">
            {fields.map((field) => {
              if (field.type === "textarea") return null;
              const isSelect = field.type === "select";
              return (
                <div key={field.name} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <Label htmlFor={field.name}>{field.label}</Label>
                  {isSelect ? (
                    <select
                      id={field.name}
                      value={values[field.name]}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                      className="mt-2 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground"
                    >
                      <option value="">Select an option</option>
                      {field.options?.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <Input
                      id={field.name}
                      type={field.type}
                      value={values[field.name]}
                      onChange={(event) => updateValue(field.name, event.target.value)}
                      placeholder={field.label}
                      className="mt-2"
                    />
                  )}
                </div>
              );
            })}
          </div>
          {fields.map((field) => {
            if (field.type !== "textarea") return null;
            return (
              <div key={field.name}>
                <Label htmlFor={field.name}>{field.label}</Label>
                <Textarea
                  id={field.name}
                  value={values[field.name]}
                  onChange={(event) => updateValue(field.name, event.target.value)}
                  placeholder={field.label}
                  className="mt-2"
                />
              </div>
            );
          })}
          <Button type="submit" className="w-full" disabled={status === "loading"}>
            {status === "loading" ? "Sending..." : submitButton}
          </Button>
          {message ? (
            <p className={`text-sm ${status === "error" ? "text-destructive" : "text-secondary"}`}>
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
