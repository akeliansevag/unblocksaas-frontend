"use client";

import { useEffect, useState } from "react";
import {
  Activity,
  ArrowRight,
  BadgeDollarSign,
  BarChart3,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Clock3,
  Gauge,
  Handshake,
  Menu,
  Megaphone,
  MessageSquareText,
  PlaySquare,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Trophy,
  UserRound,
  Users,
  XCircle,
  X,
} from "lucide-react";

const navItems = [
  ["Why it Breaks", "#why-it-breaks"],
  ["The Diagnostic", "#diagnostic"],
  ["3-Day Process", "#process"],
  ["Results", "#results"],
  ["Investment", "#investment"],
];

const heroChecks = [
  "Diagnose hidden conversion blockers across ICP, demos, pricing, and sales execution.",
  "Identify the few constraints creating the biggest revenue drag",
  "Diagnose hidden conversion blockers across ICP, demos, pricing, and sales execution.",
];

const familiarCards = [
  [Users, "Too many demos... but too few become customers"],
  [UserRound, "Founder still closes key deals while reps struggle"],
  [Clock3, "Sales cycles stretch without clear reasons"],
  [MessageSquareText, "Prospects show strong interest... then disappear"],
  [RefreshCw, "The same objections repeat every week"],
  [BarChart3, "Pipeline looks active... but forecasting feels unreliable"],
];

const clarityBullets = [
  "What is actually blocking deals from closing",
  "Where your sales process breaks down",
  "Why conversion becomes inconsistent",
  "What to fix — and what NOT to fix",
];

const takeawayBullets = [
  "Top 2-3 revenue constraints",
  "Revenue leak diagnosis",
  "Prioritized 90-day roadmap",
  "Clear GTM priorities",
];

const timeline = [
  {
    day: "Day 1",
    title: "Diagnose Revenue Motion",
    outcome: "Visibility into where revenue actually breaks down",
    icon: Handshake,
    items: [
      ["Won vs lost deal analysis", Handshake],
      ["ICP alignment", Target],
      ["Demo structure and messaging", MessageSquareText],
      ["Objection patterns", XCircle],
      ["Pricing timing and friction", BadgeDollarSign],
      ["Where deals drop or stall", Activity],
    ],
  },
  {
    day: "Day 2",
    title: "Identify Core Constraints",
    outcome: "Clarity on what is truly limiting growth",
    icon: SlidersHorizontal,
    items: [
      ["Separate symptoms from real causes", SlidersHorizontal],
      ["Identify top 2-3 constraints", Gauge],
      ["Estimate impact on conversion and cycle time", BarChart3],
      ["Prioritize what matters most", Target],
    ],
  },
  {
    day: "Day 3",
    title: "Define the 90-Day Plan",
    outcome: "A practical roadmap toward more predictable revenue",
    icon: Search,
    items: [
      ["ICP refinement", SlidersHorizontal],
      ["Sales process improvements", Megaphone],
      ["Demo redesign", PlaySquare],
      ["Pricing repositioning adjustments", BadgeDollarSign],
      ["KPI definition", Activity],
      ["Execution priorities", Sparkles],
    ],
  },
];

const caseDetails = [
  {
    title: "What was actually happening:",
    items: [
      "Low-fit prospects entering the funnel",
      "Demos focused on features instead of ROI",
      "Pricing introduced too late",
      "Inconsistent follow-up",
    ],
  },
  {
    title: "What we identified:",
    items: [
      "Mismatch between ICP and deal velocity",
      "Lack of structured demo narrative",
      "Hidden pricing friction",
    ],
  },
  {
    title: "What changed operationally:",
    items: [
      "ICP tightened toward high-intent segments",
      "Demo redesigned around business outcomes",
      "Pricing introduced earlier",
      "Consistent sales execution",
    ],
  },
  {
    title: "Impact beyond metrics:",
    items: [
      "Stronger pipeline confidence",
      "Improved rep alignment",
      "More predictable revenue",
    ],
  },
];

const investmentCards = [
  {
    title: "FOR USD 2,500 YOU GET:",
    tone: "blue",
    items: [
      "Executive-level GTM diagnosis",
      "Clear revenue constraints",
      "Focused action plan",
      "Clarity before committing more resources",
    ],
  },
  {
    title: "COMPARED TO ALTERNATIVES:",
    tone: "amber",
    items: [
      "Cheaper than one wrong hire",
      "Faster than months of trial and error",
      "Less waste than misdirected ad spend",
    ],
    note: "One better sales quarter can justify this investment.",
  },
  {
    title: "WHY THIS APPROACH WORKS:",
    tone: "green",
    items: [
      "Avoids scaling broken systems",
      "Improves conversion without increasing spend",
      "Aligns team execution",
      "Creates clarity before major decisions",
    ],
  },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.02em] text-blue-600">
      {children}
    </span>
  );
}

function PrimaryButton({ children, href = "#book-call", className = "", onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_30px_rgba(37,99,235,0.28)] ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function SectionShell({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-[1280px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
}

function BulletList({ items, tone = "blue", className = "" }) {
  const tones = {
    blue: "text-blue-600",
    amber: "text-amber-500",
    green: "text-emerald-500",
  };

  return (
    <ul className={`space-y-3 text-sm text-slate-700 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2.5 leading-relaxed">
          <CheckCircle2 className={`mt-0.5 h-4 w-4 shrink-0 ${tones[tone]}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("why-it-breaks");

  useEffect(() => {
    const sectionIds = navItems.map(([, href]) => href.replace("#", ""));

    const updateActiveSection = () => {
      const marker = window.scrollY + 140;
      let current = sectionIds[0];

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (section && section.offsetTop <= marker) {
          current = id;
        }
      });

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const navLinkClass = (href) => {
    const isActive = activeSection === href.replace("#", "");
    return `transition hover:text-blue-600 ${isActive ? "text-blue-600" : "text-slate-600"}`;
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <SectionShell className="flex h-[72px] items-center justify-between">
        <a href="#top" className="text-2xl font-black tracking-tight text-navy sm:text-3xl">
          Unblock<span className="text-blue-600">SaaS</span>
        </a>
        <nav className="hidden items-center gap-9 text-sm font-semibold text-slate-600 lg:flex">
          {navItems.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className={navLinkClass(href)}
            >
              {label}
            </a>
          ))}
        </nav>
        <PrimaryButton className="hidden px-6 py-3 lg:inline-flex" href="#book-call">
          Book Your Call
        </PrimaryButton>
        <button
          type="button"
          onClick={() => setMenuOpen((value) => !value)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-slate-200 text-slate-800 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600 lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </SectionShell>
      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white shadow-card lg:hidden">
          <SectionShell className="py-4">
            <nav className="flex flex-col gap-1 text-sm font-semibold">
              {navItems.map(([label, href]) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`rounded-lg px-3 py-3 ${navLinkClass(href)} ${
                    activeSection === href.replace("#", "") ? "bg-blue-50" : "hover:bg-slate-50"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
            <PrimaryButton
              className="mt-4 w-full py-3"
              href="#book-call"
              onClick={() => setMenuOpen(false)}
            >
              Book Your Call
            </PrimaryButton>
          </SectionShell>
        </div>
      ) : null}
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="bg-white pb-12 pt-10 sm:pb-14 lg:pt-11">
      <SectionShell>
        <div className="grid items-start gap-10 lg:grid-cols-[1fr_0.94fr] lg:gap-14">
          <div className="max-w-[630px]">
            <Badge>
              <Clock3 className="h-3.5 w-3.5" />
              3-Day Revenue Diagnostic
            </Badge>
            <h1 className="mt-8 text-4xl font-black leading-[1.08] tracking-normal text-ink sm:text-5xl lg:text-[42px] xl:text-[44px]">
              Your Pipeline Looks Active
              <span className="block text-blue-600">Your Revenue Doesn&apos;t</span>
            </h1>
            <p className="mt-9 max-w-[610px] text-lg font-medium leading-8 text-slate-700">
              Most B2B SaaS teams don&apos;t have an activity problem.
              <span className="block">They have hidden conversion constraints inside their GTM system.</span>
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              {heroChecks.map((item, index) => (
                <li key={`${item}-${index}`} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex min-w-[290px] items-center gap-4 rounded-lg border border-blue-100 bg-slate-50 px-4 py-4 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600 ring-1 ring-blue-100">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-700">Fixed-price diagnostic</p>
                  <p className="text-2xl font-black leading-tight text-ink">USD 2,500</p>
                  <p className="text-xs leading-5 text-slate-500">3 focused days</p>
                  <p className="text-xs leading-5 text-slate-500">No open-ended consulting scope.</p>
                </div>
              </div>
              <div>
                <PrimaryButton className="w-full sm:w-auto" href="#book-call">
                  Book Your Free Fit Call
                </PrimaryButton>
                <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
                  <CalendarDays className="h-4 w-4 shrink-0 text-slate-500" />
                  <p>
                    No commitment.
                    <span className="block">20-30 minute conversation to assess fit</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-0 lg:pt-0">
            <img
              src="/images/hero-meeting.jpg"
              alt="Revenue diagnostic discussion around a tablet"
              className="h-auto w-full rounded-xl object-cover shadow-sm"
            />
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

function FamiliarSection() {
  return (
    <section id="why-it-breaks" className="bg-slate-100 py-11 sm:py-12">
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[255px_1fr] lg:gap-8">
          <div>
            <h2 className="text-3xl font-black leading-tight text-navy">
              Revenue
              <span className="block">Shouldn&apos;t Feel</span>
              <span className="block">This Hard</span>
            </h2>
            <p className="mt-6 text-sm leading-6 text-slate-600">
              You&apos;re generating demos.
              <span className="block">You have pipeline activity.</span>
              <span className="block">The team is busy.</span>
              <span className="block">But revenue still feels harder than it should.</span>
              <span className="mt-2 block">Usually this is not a lead problem. It&apos;s a conversion system problem.</span>
            </p>
            <p className="mt-6 max-w-[250px] text-sm font-extrabold leading-5 text-blue-600">
              Most founders feel this long before they can clearly explain it.
            </p>
          </div>
          <div>
            <p className="mb-4 text-center text-[10px] font-extrabold uppercase tracking-[0.18em] text-slate-500">
              Does this feel familiar?
            </p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-6">
              {familiarCards.map(([Icon, text]) => (
                <div
                  key={text}
                  className="flex min-h-[118px] flex-col items-center justify-center rounded-xl border border-blue-500/70 bg-white px-4 py-4 text-center shadow-sm transition hover:-translate-y-1 hover:border-blue-600 hover:shadow-card"
                >
                  <Icon className="mb-3 h-6 w-6 text-blue-600" />
                  <p className="text-xs font-medium leading-4 text-slate-700">{text}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl bg-navy px-5 py-8 text-center text-white shadow-card [background-image:radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:18px_18px]">
              <p className="text-sm text-blue-100">You are not lacking activity.</p>
              <p className="mt-1 text-lg font-black">You are lacking clarity on what&apos;s blocking conversion.</p>
            </div>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

function OfferCard({ title, items, icon }) {
  return (
    <div className="relative rounded-xl border border-slate-200 bg-white px-7 py-7 shadow-card transition hover:-translate-y-1 hover:shadow-soft">
      <h3 className="mb-5 text-sm font-black uppercase text-blue-600">{title}</h3>
      <BulletList items={items} />
      {icon ? (
        <div className="absolute bottom-7 right-6 hidden h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 ring-1 ring-blue-100 md:flex">
          {icon}
        </div>
      ) : null}
    </div>
  );
}

function TimelineCard({ item, index, expanded }) {
  return (
    <article className="relative z-10 rounded-xl border border-blue-300 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card">
      <div className="mb-3 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-base font-black text-white">
          {index + 1}
        </span>
        <h3 className="text-lg font-black text-ink">{item.day}</h3>
      </div>
      <p className="mb-5 text-base font-medium text-ink">{item.title}</p>
      {expanded ? (
        <ul className="mb-6 space-y-3 text-sm text-slate-700">
          {item.items.map(([text, Icon]) => (
            <li key={text} className="flex items-start gap-3 leading-6">
              <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <span>{text}</span>
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex items-center gap-3 rounded-md bg-blue-50 px-4 py-3 text-sm font-extrabold leading-5 text-blue-600">
        <Search className="h-5 w-5 shrink-0" />
        <span>Outcome: {item.outcome}</span>
      </div>
    </article>
  );
}

function OfferSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="diagnostic" className="bg-white py-16 sm:py-20">
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div>
            <Badge>The Offer</Badge>
            <h2 className="mt-6 max-w-[500px] text-3xl font-black leading-tight text-ink sm:text-[32px]">
              A Focused 3-Day Diagnostic
              <span className="block">to Fix What&apos;s Blocking Revenue</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <OfferCard title="In 3 Days You Get Clarity On" items={clarityBullets} />
            <OfferCard title="What You Walk Away With" items={takeawayBullets} icon={<Trophy className="h-5 w-5" />} />
          </div>
        </div>

        <div id="process" className="relative mt-12 scroll-mt-28">
          <div className="absolute left-[12%] right-[12%] top-[68px] hidden h-px bg-blue-300 lg:block" />
          <div className="grid gap-6 lg:grid-cols-3">
            {timeline.map((item, index) => (
              <TimelineCard key={item.day} item={item} index={index} expanded={expanded} />
            ))}
          </div>
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            className="mx-auto mt-8 flex items-center gap-2 text-base font-semibold text-blue-600 transition hover:text-blue-800"
            aria-expanded={expanded}
          >
            Detailed breakdown
            {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
          </button>
        </div>
      </SectionShell>
    </section>
  );
}

function CredibilitySection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="results" className="overflow-hidden bg-slate-100 py-12 sm:py-14">
      <div className="w-full pl-5 pr-0 sm:pl-8 lg:pl-[max(3rem,calc((100vw-1280px)/2+3rem))]">
        <div className="grid gap-10 pr-5 sm:pr-8 lg:grid-cols-[0.86fr_1.05fr_1.12fr] lg:gap-9 lg:pr-0">
          <div className="lg:border-r lg:border-slate-300 lg:pr-10">
            <Badge>Credibility</Badge>
            <h2 className="mt-5 text-3xl font-black leading-tight text-navy">
              Built on Real Sales
              <span className="block">and GTM Execution</span>
            </h2>
            <p className="mt-6 text-sm leading-6 text-slate-700">
              Trusted commercial perspective.
              <span className="block">Built on real revenue responsibility — not theory.</span>
            </p>
            <BulletList
              className="mt-5"
              items={[
                "15+ years leading enterprise sales and GTM initiatives",
                "Engineering + business leadership background",
                "Experience across SaaS, cloud, AI, and enterprise technology environments",
              ]}
            />
            <div className="mt-8 flex gap-4 rounded-lg border border-blue-100 bg-blue-50 px-5 py-5 text-blue-700 shadow-sm">
              <ShieldCheck className="h-7 w-7 shrink-0" />
              <p className="text-sm font-extrabold leading-5">
                This is not outside-in advisory.
                <span className="block">This comes from operating inside revenue pressure.</span>
              </p>
            </div>
          </div>

          <div>
            <Badge>Case Study</Badge>
            <h2 className="mt-5 text-3xl font-black leading-tight text-navy">
              Many Demos.
              <span className="block">Weak Conversion.</span>
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-700">
              A B2B SaaS company had strong activity:
              <span className="block">• Steady demo flow&nbsp;&nbsp; • Strong product interest&nbsp;&nbsp; • Active pipeline</span>
              <span className="block">But revenue remained inconsistent.</span>
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {["+22%|Demo-to-Proposal conversion", "Shorter|Sales cycles", "Fewer|Wasted demos"].map((stat) => {
                const [value, label] = stat.split("|");
                return (
                  <div key={stat} className="rounded-xl border border-blue-200 bg-white px-3 py-5 text-center shadow-sm">
                    <p className="text-2xl font-black text-blue-600">{value}</p>
                    <p className="text-xs leading-4 text-slate-700">{label}</p>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 space-y-3 text-sm text-slate-700">
              <p className="flex items-center gap-3">
                <XCircle className="h-4 w-4 text-red-500" />
                They didn&apos;t need more leads.
              </p>
              <p className="flex items-center gap-3">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                They needed better conversion clarity.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="mt-8 flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
              aria-expanded={expanded}
            >
              Full case breakdown
              {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
          </div>

          <div className="relative justify-self-end lg:min-w-[380px] xl:min-w-[500px]">
            <img
              src="/images/revenue-increase.webp"
              alt="Laptop showing revenue chart"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>

      <SectionShell>
        {expanded ? (
          <div className="mt-12 grid gap-8 rounded-xl border border-slate-200 bg-white px-6 py-8 shadow-card md:grid-cols-2 lg:grid-cols-4 lg:px-9 lg:py-9">
            {caseDetails.map((column) => (
              <div key={column.title}>
                <h3 className="mb-5 text-lg font-black text-ink">{column.title}</h3>
                <ul className="space-y-4 text-base leading-6 text-slate-700">
                  {column.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-600" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
      </SectionShell>
    </section>
  );
}

function InvestmentSection() {
  return (
    <section id="investment" className="bg-white py-12 sm:py-14">
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.8fr] lg:gap-10">
          <div>
            <Badge>Investment</Badge>
            <h2 className="mt-5 text-3xl font-black leading-tight text-ink">
              A Smarter $2,500
              <span className="block">First Investment</span>
            </h2>
            <p className="mt-5 text-sm leading-6 text-slate-700">
              Most SaaS teams try to scale before understanding what is broken.
            </p>
            <p className="mt-4 text-sm leading-6 text-slate-700">
              Before hiring, scaling, or increasing spend — get clarity first.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {investmentCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-slate-200 bg-white px-6 py-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="mb-5 text-sm font-black uppercase text-slate-800">{card.title}</h3>
                <BulletList items={card.items} tone={card.tone} />
                {card.note ? <p className="mt-4 text-sm font-extrabold leading-5 text-slate-800">{card.note}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

function FinalCTA() {
  return (
    <section id="book-call" className="bg-[#071e43] py-12 text-white sm:py-14">
      <SectionShell>
        <div className="grid items-center gap-9 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="flex gap-7">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-blue-500/80 sm:flex">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <h2 className="max-w-[690px] text-3xl font-medium leading-tight sm:text-4xl">
                If the revenue feels harder than it should
                <span className="block font-black text-blue-400">Let&apos;s Fix It.</span>
              </h2>
              <p className="mt-7 text-sm font-black uppercase tracking-[0.08em] text-white">We&apos;ll quickly assess:</p>
              <ul className="mt-4 space-y-3 text-sm text-blue-100">
                {[
                  "Your current revenue motion",
                  "Where deals may be leaking",
                  "Whether this diagnostic is the right next step",
                ].map((item) => (
                  <li key={item} className="flex gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="text-left lg:text-center">
            <PrimaryButton className="w-full max-w-[280px] bg-blue-500 py-4 text-base hover:bg-blue-400" href="#book-call">
              Book Your Free Call
            </PrimaryButton>
            <p className="mt-5 text-sm font-extrabold text-white">No pressure. No obligation.</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-blue-100 lg:justify-center">
              <Sparkles className="h-4 w-4 text-blue-400" />
              15-minute diagnostic call
            </p>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

export default function LandingPage() {
  return (
    <main>
      <Header />
      <Hero />
      <FamiliarSection />
      <OfferSection />
      <CredibilitySection />
      <InvestmentSection />
      <FinalCTA />
    </main>
  );
}
