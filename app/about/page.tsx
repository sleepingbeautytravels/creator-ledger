import Link from "next/link";
import { Card } from "@/components/card";
import { SupportButton } from "@/components/support-button";

const sections = [
  {
    heading: "Why it exists",
    body: "Creator Ledger was built to bring quiet clarity to creator income, expenses, and gifted work — without turning that work into a spreadsheet maze."
  },
  {
    heading: "Why I built it",
    body: "I built it from a creator’s perspective, while also bringing the structure of a CPA background. I wanted something calmer, clearer, and more useful than the usual mix of notes, screenshots, and scattered spreadsheets."
  },
  {
    heading: "Who it’s for",
    body: "It’s designed for creators who want a private, practical way to understand what their work is actually worth — across paid work, gifted value, and the costs behind it."
  },
  {
    heading: "Founder note",
    body: "Creator Ledger was built by Tessa Zhang — a creator with a CPA background, trying to make the financial side of creative work feel clearer and lighter."
  },
  {
    heading: "Free to use",
    body: "Creator Ledger is free to use. If Creator Ledger has been helpful, you’re welcome to support its continued development."
  }
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10 sm:py-14">
      <header className="mb-14 flex items-center justify-between gap-4">
        <Link href="/" className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">
          CREATOR LEDGER
        </Link>
        <Link href="/auth" className="text-sm text-[var(--muted)] transition hover:text-[var(--foreground)]">
          Start tracking
        </Link>
      </header>

      <section className="space-y-5">
        <p className="text-xs uppercase tracking-[0.28em] text-[var(--muted)]">ABOUT</p>
        <h1 className="text-5xl font-semibold leading-[1.02] text-[var(--foreground)] sm:text-6xl">
          About Creator Ledger
        </h1>
        <p className="max-w-2xl text-lg leading-8 text-[var(--muted)]">
          A calm financial lens for creators.
        </p>
      </section>

      <section className="mt-12 grid gap-4">
        {sections.map((section) => (
          <Card key={section.heading} className="space-y-3">
            <h2 className="text-2xl font-medium text-[var(--foreground)]">{section.heading}</h2>
            <p className="max-w-3xl text-[15px] leading-7 text-[var(--muted)]">{section.body}</p>
            {section.heading === "Founder note" ? (
              <a
                href="https://www.instagram.com/sleepingbeautytravels/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex pt-1 text-sm text-[var(--muted)] underline decoration-[rgba(120,104,90,0.25)] underline-offset-4 transition hover:text-[var(--foreground)] hover:decoration-[rgba(120,104,90,0.7)]"
              >
                Visit founder profile
              </a>
            ) : null}
            {section.heading === "Free to use" ? (
              <div className="pt-2">
                <SupportButton />
              </div>
            ) : null}
          </Card>
        ))}

        <Card className="space-y-3">
          <h2 className="text-2xl font-medium text-[var(--foreground)]">A gentle note</h2>
          <div className="space-y-4 max-w-3xl text-[15px] leading-7 text-[var(--muted)]">
            <p>
              Creator Ledger is designed to bring clarity to your numbers in a simple, intuitive
              way.
            </p>
            <p>
              Some terms and categories are intentionally simplified to keep the experience calm and
              easy to use. While the tool is informed by a CPA background, it is not a substitute
              for formal accounting or tax advice.
            </p>
            <p>
              If you’re preparing for compliance, reporting, or tax purposes, it’s always best to
              work with a qualified bookkeeper or accountant.
            </p>
            <p>
              Creator Ledger is simply a tool — the clarity it offers comes from how you choose to
              use it.
            </p>
          </div>
        </Card>
      </section>
    </main>
  );
}
