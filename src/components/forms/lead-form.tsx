"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { contact, serviceArea } from "@/lib/content";
import { cn } from "@/lib/utils";

type Variant = "general" | "attorney";
type Status = "idle" | "submitting" | "success" | "error";

const roles = [
  "Probate attorney",
  "Licensed professional fiduciary",
  "Trustee or executor",
  "Other",
];

export function LeadForm({ variant = "general" }: { variant?: Variant }) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: variant }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg(
        "Something went wrong sending that. Please email or call me directly — details are just below.",
      );
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-card p-8">
        <span className="stamp px-2.5 py-1 text-[0.62rem]">Received</span>
        <h3 className="mt-5 font-display text-2xl font-medium text-foreground">
          Thank you — I&apos;ve got it.
        </h3>
        <p className="mt-2 max-w-sm text-muted-foreground">
          {contact.hours} If it&apos;s time-sensitive, you can also reach me
          directly:
        </p>
        <div className="mt-5 flex flex-col gap-1 font-mono text-sm">
          <a href={contact.phoneHref} className="text-foreground hover:text-stamp">
            {contact.phone}
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="text-foreground hover:text-stamp"
          >
            {contact.email}
          </a>
        </div>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form
      onSubmit={onSubmit}
      className="border border-border bg-card p-6 sm:p-8"
    >
      <div className="grid gap-5">
        <Field id="name" label="Your name" required>
          <Input id="name" name="name" required autoComplete="name" />
        </Field>

        {variant === "attorney" && (
          <Field id="organization" label="Firm or organization">
            <Input
              id="organization"
              name="organization"
              autoComplete="organization"
            />
          </Field>
        )}

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="email" label="Email" required>
            <Input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
            />
          </Field>
          <Field id="phone" label="Phone" hint="Optional">
            <Input id="phone" name="phone" type="tel" autoComplete="tel" />
          </Field>
        </div>

        {variant === "attorney" ? (
          <Field id="role" label="Your role">
            <SelectNative id="role" name="role" defaultValue="">
              <option value="" disabled>
                Select one
              </option>
              {roles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </SelectNative>
          </Field>
        ) : (
          <Field id="city" label="City" hint="Optional">
            <SelectNative id="city" name="city" defaultValue="">
              <option value="">Where&apos;s the home?</option>
              {[...serviceArea.core, ...serviceArea.extended].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
              <option value="Other">Somewhere else nearby</option>
            </SelectNative>
          </Field>
        )}

        <Field
          id="message"
          label={variant === "attorney" ? "About the matter" : "What's going on?"}
          hint="A sentence or two is plenty"
          required
        >
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={
              variant === "attorney"
                ? "Type of matter, timeline, and where the property is located."
                : "A little about the home, the timeline, and how I can help."
            }
          />
        </Field>

        {/* Honeypot — hidden from people, catches bots. */}
        <div className="hidden" aria-hidden>
          <label htmlFor="website">Website</label>
          <input
            id="website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <Button type="submit" size="lg" variant="ink" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="size-4 animate-spin" /> Sending…
            </>
          ) : variant === "attorney" ? (
            "Send secure inquiry"
          ) : (
            "Request a free walkthrough"
          )}
        </Button>

        {status === "error" && (
          <p className="text-sm text-stamp" role="alert">
            {errorMsg}
          </p>
        )}
        <p className="font-mono text-[0.68rem] leading-relaxed text-muted-foreground">
          {contact.hours}
        </p>
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  hint,
  required,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-2">
      <div className="flex items-baseline justify-between">
        <Label htmlFor={id}>
          {label}
          {required && <span className="ml-0.5 text-stamp">*</span>}
        </Label>
        {hint && (
          <span className="font-mono text-[0.68rem] text-muted-foreground">
            {hint}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}

function SelectNative({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "flex h-11 w-full rounded-sm border border-input bg-card px-3 py-2 text-base transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}
