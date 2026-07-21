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
  Play,
  PlaySquare,
  RefreshCw,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Star,
  Target,
  Trophy,
  UserRound,
  Users,
  XCircle,
  X,
} from "lucide-react";
import CalendlyScriptLoader from "./CalendlyScriptLoader";
import useCalendlyPopup from "./useCalendlyPopup";

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
      { text: "Executive-level GTM diagnosis", icon: CheckCircle2 },
      { text: "Clear revenue constraints", icon: CheckCircle2 },
      { text: "Focused action plan", icon: CheckCircle2 },
      { text: "Clarity before committing more resources", icon: CheckCircle2 },
    ],
  },
  {
    title: "COMPARED TO ALTERNATIVES:",
    tone: "amber",
    items: [
      { text: "Cheaper than one wrong hire", icon: Star },
      { text: "Faster than months of trial and error", icon: Star },
      { text: "Less waste than misdirected ad spend", icon: Star },
    ],
    note: "One better sales quarter can justify this investment.",
  },
  {
    title: "WHY THIS APPROACH WORKS:",
    tone: "green",
    items: [
      { text: "Avoids scaling broken systems", icon: CheckCircle2 },
      { text: "Improves conversion without increasing spend", icon: CheckCircle2 },
      { text: "Aligns team execution", icon: CheckCircle2 },
      { text: "Creates clarity before major decisions", icon: CheckCircle2 },
    ],
  },
];

function Badge({ children }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-semibold uppercase tracking-[0.02em] text-blue-600">
      {children}
    </span>
  );
}

function PrimaryButton({ children, href = "#book-call", className = "", onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3 text-sm font-regular text-white shadow-[0_12px_24px_rgba(37,99,235,0.22)] transition hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-[0_16px_30px_rgba(37,99,235,0.28)] ${className}`}
    >
      {children}
      <ArrowRight className="h-4 w-4" />
    </a>
  );
}

function SectionShell({ children, className = "" }) {
  return (
    <div className={`mx-auto w-full max-w-screen-2xl px-5 sm:px-8 lg:px-12 ${className}`}>
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
      {items.map((item, idx) => {
        const text = typeof item === "string" ? item : item.text;
        const Icon =
          typeof item === "object" && item.icon ? item.icon : CheckCircle2;

        return (
          <li key={text ?? idx} className="flex gap-2.5 leading-relaxed">
            <Icon className={`mt-0.5 h-4 w-4 shrink-0 ${tones[tone]}`} />
            <span>{text}</span>
          </li>
        );
      })}
    </ul>
  );
}

function PricingCard({ className = "" }) {
  return (
    <div className={`flex min-w-0 items-center gap-2.5 rounded-lg border border-blue-300 bg-blue-50/80 px-3 py-2 shadow-[0_10px_26px_rgba(37,99,235,0.12)] ring-1 ring-blue-100 sm:min-w-[290px] sm:gap-4 sm:px-4 sm:py-4 ${className}`}>
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white text-blue-600 ring-1 ring-blue-200 sm:h-10 sm:w-10">
        <ShieldCheck className="h-5 w-5 sm:h-6 sm:w-6" />
      </div>
      <div>
        <p className="text-[11px] font-medium text-slate-700 sm:text-xs">Fixed-price diagnostic</p>
        <p className="text-lg font-semibold leading-tight text-ink sm:text-2xl">USD 2,500</p>
        <p className="text-[10px] leading-[14px] text-slate-500 sm:text-xs sm:leading-5">3 focused days</p>
        <p className="text-[10px] leading-[14px] text-slate-500 sm:text-xs sm:leading-5">No open-ended consulting scope.</p>
      </div>
    </div>
  );
}

function Header({ onBookCall }) {
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
        <a href="#top">
          <svg width="180" viewBox="0 0 1000 135" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M83.2554 0H107.181V86.2864C107.181 95.7448 104.945 104.064 100.474 111.244C96.0457 118.423 89.8118 124.034 81.7722 128.075C73.7325 132.074 64.3386 134.073 53.5904 134.073C42.7993 134.073 33.3839 132.074 25.3442 128.075C17.3046 124.034 11.0706 118.423 6.64238 111.244C2.21413 104.064 0 95.7448 0 86.2864V0H23.9255V84.2872C23.9255 89.7903 25.1292 94.6915 27.5368 98.9908C29.9874 103.29 33.4268 106.665 37.8551 109.116C42.2833 111.523 47.5285 112.727 53.5904 112.727C59.6524 112.727 64.8975 111.523 69.3258 109.116C73.797 106.665 77.2364 103.29 79.644 98.9908C82.0516 94.6915 83.2554 89.7903 83.2554 84.2872V0Z" fill="#061D43"/>
            <path d="M155.499 74.0335V132.074H132.154V33.0184H154.467V49.8501H155.628C157.907 44.304 161.54 39.8972 166.527 36.6298C171.557 33.3624 177.77 31.7286 185.164 31.7286C192 31.7286 197.955 33.1904 203.028 36.1139C208.144 39.0374 212.099 43.2722 214.894 48.8182C217.731 54.3643 219.129 61.0927 219.086 69.0033V132.074H195.74V72.6147C195.74 65.9938 194.021 60.8132 190.581 57.0728C187.185 53.3325 182.477 51.4623 176.458 51.4623C172.374 51.4623 168.741 52.3651 165.56 54.1708C162.421 55.9335 159.949 58.4916 158.143 61.845C156.381 65.1985 155.499 69.2613 155.499 74.0335Z" fill="#061D43"/>
            <path d="M243.849 132.074V0H267.194V49.3986H268.162C269.366 46.9911 271.064 44.433 273.256 41.7244C275.449 38.9729 278.415 36.6298 282.156 34.6951C285.896 32.7175 290.668 31.7286 296.472 31.7286C304.125 31.7286 311.025 33.6848 317.173 37.5971C323.364 41.4665 328.266 47.206 331.877 54.8157C335.531 62.3824 337.359 71.6689 337.359 82.675C337.359 93.5522 335.574 102.796 332.006 110.405C328.438 118.015 323.579 123.819 317.431 127.817C311.283 131.816 304.319 133.815 296.537 133.815C290.862 133.815 286.154 132.869 282.414 130.977C278.673 129.086 275.664 126.807 273.385 124.141C271.15 121.433 269.409 118.875 268.162 116.467H266.807V132.074H243.849ZM266.743 82.546C266.743 88.952 267.646 94.5625 269.452 99.3777C271.3 104.193 273.944 107.955 277.384 110.663C280.866 113.329 285.079 114.662 290.024 114.662C295.183 114.662 299.503 113.286 302.986 110.534C306.468 107.74 309.091 103.935 310.854 99.1197C312.659 94.2615 313.562 88.737 313.562 82.546C313.562 76.3981 312.681 70.938 310.918 66.1658C309.155 61.3936 306.533 57.6532 303.05 54.9447C299.568 52.2362 295.226 50.8819 290.024 50.8819C285.036 50.8819 280.802 52.1932 277.319 54.8157C273.837 57.4383 271.193 61.1142 269.387 65.8434C267.624 70.5726 266.743 76.1401 266.743 82.546Z" fill="#061D43"/>
            <path d="M380.55 0V132.074H357.205V0H380.55Z" fill="#061D43"/>
            <path d="M447.764 134.008C438.09 134.008 429.707 131.88 422.613 127.624C415.519 123.368 410.016 117.413 406.104 109.76C402.235 102.108 400.3 93.1652 400.3 82.933C400.3 72.7007 402.235 63.7367 406.104 56.041C410.016 48.3453 415.519 42.3693 422.613 38.1131C429.707 33.8568 438.09 31.7286 447.764 31.7286C457.437 31.7286 465.821 33.8568 472.915 38.1131C480.008 42.3693 485.49 48.3453 489.359 56.041C493.272 63.7367 495.228 72.7007 495.228 82.933C495.228 93.1652 493.272 102.108 489.359 109.76C485.49 117.413 480.008 123.368 472.915 127.624C465.821 131.88 457.437 134.008 447.764 134.008ZM447.893 115.306C453.138 115.306 457.523 113.866 461.049 110.986C464.574 108.062 467.197 104.15 468.916 99.2487C470.679 94.3475 471.56 88.8875 471.56 82.8685C471.56 76.8065 470.679 71.3249 468.916 66.4238C467.197 61.4796 464.574 57.5458 461.049 54.6223C457.523 51.6987 453.138 50.237 447.893 50.237C442.519 50.237 438.047 51.6987 434.479 54.6223C430.954 57.5458 428.31 61.4796 426.547 66.4238C424.827 71.3249 423.967 76.8065 423.967 82.8685C423.967 88.8875 424.827 94.3475 426.547 99.2487C428.31 104.15 430.954 108.062 434.479 110.986C438.047 113.866 442.519 115.306 447.893 115.306Z" fill="#061D43"/>
            <path d="M558.25 134.008C548.361 134.008 539.87 131.837 532.777 127.495C525.726 123.153 520.287 117.155 516.461 109.502C512.677 101.807 510.786 92.9503 510.786 82.933C510.786 72.8727 512.72 63.9947 516.59 56.299C520.459 48.5603 525.919 42.5413 532.97 38.242C540.064 33.8998 548.447 31.7286 558.121 31.7286C566.16 31.7286 573.276 33.2119 579.467 36.1784C585.701 39.1019 590.666 43.2507 594.364 48.6248C598.061 53.9559 600.168 60.1898 600.684 67.3266H578.37C577.468 62.5544 575.318 58.5776 571.921 55.3961C568.568 52.1717 564.075 50.5594 558.443 50.5594C553.671 50.5594 549.479 51.8492 545.868 54.4288C542.256 56.9654 539.44 60.6197 537.42 65.3919C535.442 70.1641 534.453 75.8822 534.453 82.546C534.453 89.2959 535.442 95.0999 537.42 99.9581C539.397 104.773 542.17 108.492 545.739 111.115C549.35 113.694 553.585 114.984 558.443 114.984C561.883 114.984 564.957 114.339 567.665 113.049C570.417 111.717 572.717 109.803 574.565 107.31C576.414 104.816 577.682 101.785 578.37 98.2169H600.684C600.125 105.225 598.061 111.437 594.493 116.854C590.924 122.228 586.066 126.442 579.918 129.494C573.77 132.504 566.547 134.008 558.25 134.008Z" fill="#061D43"/>
            <path d="M641.134 100.99L641.07 72.8082H644.81L680.408 33.0184H707.687L663.899 81.7722H659.062L641.134 100.99ZM619.853 132.074V0H643.198V132.074H619.853ZM682.02 132.074L649.776 86.9958L665.511 70.5511L709.944 132.074H682.02Z" fill="#061D43"/>
            <path d="M772.675 69.6234C772.286 65.9791 770.644 63.1416 767.751 61.1108C764.886 59.08 761.158 58.0647 756.568 58.0647C753.341 58.0647 750.573 58.5515 748.264 59.5251C745.955 60.4988 744.189 61.8202 742.965 63.4893C741.74 65.1585 741.115 67.064 741.087 69.2061C741.087 70.9865 741.49 72.5304 742.297 73.8379C743.131 75.1454 744.258 76.2582 745.677 77.1762C747.096 78.0664 748.667 78.8175 750.392 79.4295C752.117 80.0415 753.856 80.5562 755.608 80.9735L763.62 82.9764C766.847 83.7275 769.949 84.7429 772.925 86.0226C775.93 87.3022 778.614 88.9157 780.979 90.863C783.371 92.8104 785.263 95.161 786.654 97.9151C788.045 100.669 788.74 103.896 788.74 107.596C788.74 112.603 787.461 117.013 784.901 120.824C782.342 124.607 778.642 127.57 773.802 129.712C768.989 131.826 763.161 132.883 756.318 132.883C749.669 132.883 743.896 131.854 739 129.795C734.132 127.737 730.321 124.732 727.567 120.782C724.841 116.832 723.366 112.019 723.144 106.344H738.374C738.597 109.321 739.515 111.797 741.128 113.772C742.742 115.747 744.842 117.221 747.429 118.195C750.044 119.169 752.965 119.656 756.192 119.656C759.558 119.656 762.507 119.155 765.039 118.153C767.598 117.124 769.601 115.705 771.048 113.897C772.494 112.061 773.231 109.919 773.259 107.471C773.231 105.245 772.578 103.409 771.298 101.963C770.018 100.488 768.224 99.2643 765.915 98.2907C763.634 97.2892 760.963 96.399 757.903 95.6201L748.181 93.1164C741.142 91.3082 735.579 88.568 731.489 84.8959C727.428 81.196 725.397 76.286 725.397 70.1658C725.397 65.1306 726.76 60.7214 729.486 56.938C732.24 53.1546 735.982 50.2197 740.711 48.1333C745.44 46.0191 750.796 44.962 756.777 44.962C762.841 44.962 768.154 46.0191 772.717 48.1333C777.307 50.2197 780.909 53.1268 783.524 56.8545C786.139 60.5544 787.489 64.8107 787.572 69.6234H772.675Z" fill="#155DFC"/>
            <path d="M820.318 132.883C816.257 132.883 812.598 132.16 809.344 130.714C806.117 129.239 803.557 127.069 801.666 124.204C799.802 121.339 798.87 117.806 798.87 113.605C798.87 109.988 799.538 106.998 800.873 104.633C802.208 102.269 804.03 100.377 806.339 98.9583C808.648 97.5396 811.249 96.4685 814.142 95.7453C817.063 94.9941 820.082 94.4517 823.197 94.1178C826.953 93.7284 829.999 93.3806 832.336 93.0746C834.673 92.7408 836.37 92.2401 837.427 91.5724C838.512 90.877 839.054 89.8059 839.054 88.3594V88.109C839.054 84.9655 838.122 82.5313 836.258 80.8065C834.395 79.0818 831.71 78.2194 828.205 78.2194C824.505 78.2194 821.57 79.0261 819.4 80.6396C817.258 82.2531 815.812 84.1587 815.06 86.3564L800.956 84.3534C802.069 80.4588 803.905 77.204 806.464 74.589C809.024 71.9462 812.153 69.9711 815.853 68.6636C819.553 67.3283 823.643 66.6607 828.121 66.6607C831.209 66.6607 834.283 67.0223 837.343 67.7456C840.403 68.4689 843.199 69.6651 845.731 71.3342C848.262 72.9755 850.293 75.215 851.823 78.0525C853.381 80.89 854.16 84.4369 854.16 88.6932V131.59H839.638V122.785H839.138C838.22 124.566 836.926 126.235 835.257 127.793C833.616 129.323 831.543 130.561 829.039 131.506C826.564 132.424 823.656 132.883 820.318 132.883ZM824.241 121.784C827.273 121.784 829.902 121.186 832.127 119.989C834.353 118.765 836.064 117.152 837.26 115.149C838.484 113.146 839.096 110.962 839.096 108.598V101.045C838.623 101.434 837.816 101.796 836.676 102.13C835.563 102.463 834.311 102.756 832.92 103.006C831.529 103.256 830.152 103.479 828.789 103.674C827.426 103.868 826.244 104.035 825.242 104.174C822.989 104.48 820.972 104.981 819.192 105.677C817.411 106.372 816.006 107.346 814.977 108.598C813.948 109.822 813.433 111.407 813.433 113.355C813.433 116.136 814.448 118.237 816.479 119.656C818.51 121.074 821.097 121.784 824.241 121.784Z" fill="#155DFC"/>
            <path d="M887.793 132.883C883.731 132.883 880.073 132.16 876.818 130.714C873.591 129.239 871.032 127.069 869.14 124.204C867.276 121.339 866.344 117.806 866.344 113.605C866.344 109.988 867.012 106.998 868.347 104.633C869.683 102.269 871.505 100.377 873.814 98.9583C876.123 97.5396 878.724 96.4685 881.617 95.7453C884.538 94.9941 887.556 94.4517 890.672 94.1178C894.428 93.7284 897.474 93.3806 899.81 93.0746C902.147 92.7408 903.844 92.2401 904.901 91.5724C905.986 90.877 906.529 89.8059 906.529 88.3594V88.109C906.529 84.9655 905.597 82.5313 903.733 80.8065C901.869 79.0818 899.185 78.2194 895.679 78.2194C891.979 78.2194 889.045 79.0261 886.875 80.6396C884.733 82.2531 883.286 84.1587 882.535 86.3564L868.431 84.3534C869.544 80.4588 871.38 77.204 873.939 74.589C876.498 71.9462 879.628 69.9711 883.328 68.6636C887.028 67.3283 891.117 66.6607 895.596 66.6607C898.684 66.6607 901.758 67.0223 904.818 67.7456C907.878 68.4689 910.674 69.6651 913.205 71.3342C915.737 72.9755 917.768 75.215 919.298 78.0525C920.855 80.89 921.634 84.4369 921.634 88.6932V131.59H907.113V122.785H906.612C905.694 124.566 904.401 126.235 902.731 127.793C901.09 129.323 899.018 130.561 896.514 131.506C894.038 132.424 891.131 132.883 887.793 132.883ZM891.715 121.784C894.747 121.784 897.376 121.186 899.602 119.989C901.827 118.765 903.538 117.152 904.734 115.149C905.958 113.146 906.57 110.962 906.57 108.598V101.045C906.098 101.434 905.291 101.796 904.15 102.13C903.038 102.463 901.786 102.756 900.395 103.006C899.004 103.256 897.627 103.479 896.264 103.674C894.901 103.868 893.718 104.035 892.717 104.174C890.463 104.48 888.446 104.981 886.666 105.677C884.886 106.372 883.481 107.346 882.452 108.598C881.422 109.822 880.908 111.407 880.908 113.355C880.908 116.136 881.923 118.237 883.954 119.656C885.984 121.074 888.572 121.784 891.715 121.784Z" fill="#155DFC"/>
            <path d="M983.935 69.6234C983.545 65.9791 981.904 63.1416 979.011 61.1108C976.145 59.08 972.418 58.0647 967.828 58.0647C964.601 58.0647 961.833 58.5515 959.524 59.5251C957.215 60.4988 955.448 61.8202 954.224 63.4893C953 65.1585 952.374 67.064 952.346 69.2061C952.346 70.9865 952.75 72.5304 953.556 73.8379C954.391 75.1454 955.518 76.2582 956.936 77.1762C958.355 78.0664 959.927 78.8175 961.652 79.4295C963.377 80.0415 965.115 80.5562 966.868 80.9735L974.88 82.9764C978.107 83.7275 981.208 84.7429 984.185 86.0226C987.189 87.3022 989.874 88.9157 992.239 90.863C994.631 92.8104 996.523 95.161 997.914 97.9151C999.305 100.669 1000 103.896 1000 107.596C1000 112.603 998.72 117.013 996.161 120.824C993.602 124.607 989.902 127.57 985.061 129.712C980.249 131.826 974.421 132.883 967.577 132.883C960.928 132.883 955.156 131.854 950.26 129.795C945.392 127.737 941.581 124.732 938.826 120.782C936.1 116.832 934.626 112.019 934.403 106.344H949.634C949.857 109.321 950.775 111.797 952.388 113.772C954.002 115.747 956.102 117.221 958.689 118.195C961.304 119.169 964.225 119.656 967.452 119.656C970.818 119.656 973.767 119.155 976.298 118.153C978.858 117.124 980.861 115.705 982.307 113.897C983.754 112.061 984.491 109.919 984.519 107.471C984.491 105.245 983.837 103.409 982.558 101.963C981.278 100.488 979.484 99.2643 977.175 98.2907C974.893 97.2892 972.223 96.399 969.163 95.6201L959.44 93.1164C952.402 91.3082 946.838 88.568 942.749 84.8959C938.687 81.196 936.657 76.286 936.657 70.1658C936.657 65.1306 938.02 60.7214 940.746 56.938C943.5 53.1546 947.242 50.2197 951.971 48.1333C956.7 46.0191 962.055 44.962 968.036 44.962C974.101 44.962 979.414 46.0191 983.976 48.1333C988.566 50.2197 992.169 53.1268 994.784 56.8545C997.399 60.5544 998.748 64.8107 998.832 69.6234H983.935Z" fill="#155DFC"/>
          </svg>
        </a>
        <nav className="hidden items-center gap-9 text-sm font-regular text-slate-600 lg:flex">
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
        <PrimaryButton className="hidden px-6 py-3 lg:inline-flex" href="#book-call" onClick={onBookCall}>
          Book Your Free Fit Call
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
              onClick={(event) => {
                setMenuOpen(false);
                onBookCall(event);
              }}
            >
              Book Your Free Fit Call
            </PrimaryButton>
          </SectionShell>
        </div>
      ) : null}
    </header>
  );
}

function Hero({ onBookCall }) {
  const [videoOpen, setVideoOpen] = useState(false);

  return (
    <section id="top" className="bg-white pb-5 pt-3 sm:pb-14 sm:pt-10 lg:pt-11">
      <SectionShell>
        <div className="grid items-start gap-3 sm:gap-10 lg:grid-cols-[1fr_0.94fr] lg:items-center lg:gap-14">
          <div className="order-1 sm:hidden">
            <Badge>
              <Clock3 className="h-3.5 w-3.5" />
              3-Day Revenue Diagnostic
            </Badge>
            <h1 className="mt-5 text-[26px] font-bold leading-[1.02] tracking-normal text-ink">
              Your Pipeline Looks Active
              <span className="mt-1 block text-blue-600">Your Revenue Doesn&apos;t</span>
            </h1>
          </div>

          <div className="order-2 sm:hidden">
            <PrimaryButton className="w-full !py-2.5" href="#book-call" onClick={onBookCall}>
              Book Your Free Fit Call
            </PrimaryButton>
            <div className="mt-2 flex items-start gap-2 text-[11px] leading-4 text-slate-500">
              <CalendarDays className="h-4 w-4 shrink-0 text-slate-500" />
              <p>
                No commitment.
                <span className="block">20 - 30 minute conversation to assess fit</span>
              </p>
            </div>
            <ul className="mt-3 space-y-2 text-[13px] leading-5 text-slate-600">
              {heroChecks.slice(0, 2).map((item, index) => (
                <li key={`${item}-${index}`} className="flex gap-3">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-4 sm:hidden">
            <p className="text-[13px] font-medium leading-5 text-slate-700">
              Most B2B SaaS teams don&apos;t have an activity problem.
              <span> They have hidden conversion constraints inside their GTM system.</span>
            </p>
            <PricingCard className="mt-3" />
          </div>

          <div className="hidden max-w-[630px] sm:order-1 sm:block">
            <Badge>
              <Clock3 className="h-3.5 w-3.5" />
              3-Day Revenue Diagnostic
            </Badge>
            <h1 className="mt-8 text-4xl font-bold leading-[1.08] tracking-normal text-ink sm:text-5xl lg:text-[42px] xl:text-[44px]">
              Your Pipeline Looks Active
              <span className="block text-blue-600 mt-2">Your Revenue Doesn&apos;t</span>
            </h1>
            <p className="mt-9 max-w-[610px] text-lg font-medium leading-8 text-slate-700">
              Most B2B SaaS teams don&apos;t have an activity problem.
              <span className="block">They have hidden conversion constraints inside their GTM system.</span>
            </p>
            <ul className="mt-6 space-y-4 text-sm text-slate-600">
              {heroChecks.map((item, index) => (
                <li key={`${item}-${index}`} className="flex lg:items-center gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-9 flex flex-col gap-5 sm:flex-row sm:items-center">
              <PricingCard className="hidden sm:flex" />
              <div>
                <PrimaryButton className="w-full sm:w-auto" href="#book-call" onClick={onBookCall}>
                  Book Your Free Fit Call
                </PrimaryButton>
                <div className="mt-4 flex items-start gap-2 text-xs leading-5 text-slate-500">
                  <CalendarDays className="h-4 w-4 shrink-0 text-slate-500" />
                  <p>
                    No commitment.
                    <span className="block">20 - 30 minute conversation to assess fit</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="order-3 pt-0 sm:order-2 lg:pt-0">
            <button
              type="button"
              onClick={() => setVideoOpen(true)}
              className="group relative block w-full overflow-hidden rounded-xl text-left shadow-sm outline-none ring-blue-500/40 transition hover:-translate-y-0.5 hover:shadow-card focus-visible:ring-4"
              aria-label="Play diagnostic video"
            >
              <img
                src="/images/video-poster-user-attachment.jpg"
                alt="Video poster"
                className="h-[135px] w-full object-cover sm:h-auto"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 via-slate-950/35 to-transparent px-3 pb-3 pt-8 text-white sm:px-5 sm:pb-5 sm:pt-20">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-blue-100 sm:text-xs">
                  Watch the Diagnostic
                </p>
                <p className="mt-1 max-w-[420px] text-[12px] font-semibold leading-4 sm:text-base sm:leading-6">
                  Why most SaaS teams mistake a conversion problem for a pipeline problem.
                </p>
              </div>
              <span className="absolute left-1/2 top-[42%] flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/90 text-blue-600 shadow-card backdrop-blur transition group-hover:scale-105 group-hover:bg-white sm:top-1/2 sm:h-10 sm:w-10">
                <Play className="ml-0.5 h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
              </span>
            </button>
          </div>
        </div>
      </SectionShell>
      {videoOpen ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/80 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Video"
          onClick={() => setVideoOpen(false)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-xl bg-black shadow-soft"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setVideoOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-slate-900 shadow-card transition hover:bg-white hover:text-blue-600"
              aria-label="Close video"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full">
              <iframe
                title="Unblocksaas intro video"
                src="https://www.youtube.com/embed/C8EKn3DPGOM?autoplay=1&rel=0"
                className="h-full w-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function FamiliarSection() {
  return (
    <section id="why-it-breaks" className="bg-slate-100 py-11 sm:py-12">
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[255px_1fr] lg:gap-8">
          <div>
            <h2 className="text-3xl font-semibold leading-tight text-navy">
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
            <p className="mt-6 max-w-[250px] text-sm font-semibold leading-5 text-blue-600">
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
                  <p className="text-xs leading-4 text-slate-700">{text}</p>
                </div>
              ))}
            </div>
            <div className="relative mt-6 overflow-hidden rounded-xl px-5 py-8 text-center text-white shadow-card">
              {/* Video background */}
              <video
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src="/videos/video-1.mp4" type="video/mp4" />
              </video>

              {/* Dark overlay for readability */}
              {/* <div className="absolute inset-0 bg-navy/80" /> */}

              {/* Content */}
              <div className="relative">
                <p className="text-sm font-medium text-blue-100">
                  You are not lacking activity.
                </p>
                <p className="mt-1 text-lg font-black">
                  You are lacking clarity on what&apos;s blocking conversion.
                </p>
              </div>
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
    <div className="rounded-xl p-[1px] bg-[linear-gradient(138.81deg,#E2E8F0_26.66%,#125CF7_111.39%)] h-full">
      <article className="relative z-10 rounded-xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-card h-full">
        
        <div className="mb-3 flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-base font-black text-white">
            {index + 1}
          </span>
          <h3 className="text-lg font-bold text-ink">{item.day}</h3>
        </div>

        <p className="mb-5 text-base text-ink">{item.title}</p>

        <div
          className={`
            grid transition-all duration-300 ease-in-out
            ${expanded ? "grid-rows-[1fr] opacity-100 mt-5" : "grid-rows-[0fr] opacity-0 mt-0"}
          `}
        >
          <div className="overflow-hidden">
            <ul className="space-y-3 text-sm text-slate-700">
              {item.items.map(([text, Icon]) => (
                <li key={text} className="flex items-start gap-3 leading-6">
                  <Icon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-md bg-blue-50 px-4 py-3 text-sm font-semibold leading-5 text-blue-600">
          <Search className="h-5 w-5 shrink-0" />
          <span>Outcome: {item.outcome}</span>
        </div>

      </article>
    </div>
  );
}

function CaseBreakdownPanel({ expanded, className = "" }) {
  return (
    <div
      className={`
        overflow-hidden rounded-xl shadow-card
        transition-all duration-300 ease-in-out
        ${expanded ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}
        ${className}
      `}
    >
      <div className="border border-slate-200 bg-[linear-gradient(145.48deg,#004FFF_-197.73%,#FFFFFF_40.15%)] px-6 py-8">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 lg:px-3 lg:py-3">
          {caseDetails.map((column) => (
            <div key={column.title}>
              <h3 className="mb-5 text-lg font-medium text-ink">
                {column.title}
              </h3>

              <ul className="space-y-4 text-sm leading-6 text-slate-700">
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
      </div>
    </div>
  );
}

function OfferSection() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="diagnostic" className="bg-white py-6 sm:py-10">
      <SectionShell>
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-14">
          <div>
            <Badge>The Offer</Badge>
            <h2 className="mt-6 max-w-[500px] text-3xl font-semibold leading-tight text-ink sm:text-[32px]">
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
            className="mx-auto mt-8 flex items-center gap-2 text-base font-medium text-blue-600 transition hover:text-blue-800"
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
      <div className="w-full pl-5 pr-5 sm:pl-8 sm:pr-0 lg:pl-[max(3rem,calc((100vw-1536px)/2+3rem))]">
        <div className="grid gap-10 pr-0 lg:grid-cols-[minmax(300px,0.9fr)_minmax(300px,0.92fr)_minmax(280px,0.8fr)] lg:gap-7 xl:grid-cols-[minmax(340px,0.9fr)_minmax(350px,0.95fr)_minmax(360px,0.9fr)] xl:gap-9">
          <div className="lg:border-r lg:border-slate-300 lg:pr-10 2xl:pr-10">
            <Badge>Credibility</Badge>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-navy">
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
            <div className="mt-8 flex gap-4 rounded-lg border border-blue-300 bg-[#155DF6]/10 px-5 py-5 text-blue-700 shadow-sm">
              <ShieldCheck className="h-7 w-7 shrink-0" />
              <p className="text-sm font-semibold leading-5">
                This is not outside-in advisory.
                <span className="block">This comes from operating inside revenue pressure.</span>
              </p>
            </div>
          </div>

          <div>
            <Badge>Case Study</Badge>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-navy">
              Many Demos.
              <span className="block">Weak Conversion.</span>
            </h2>
            <div className="mt-6 text-sm leading-7 text-slate-700">
              <p>A B2B SaaS company had strong activity:</p>
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
                {["Steady demo flow", "Strong product interest", "Active pipeline"].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-1.5 rounded-lg border border-blue-100 bg-white/70 px-2.5 py-2 text-xs font-medium leading-4 text-slate-700 shadow-sm xl:px-3 xl:text-sm"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-blue-600 xl:h-4 xl:w-4" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <p className="mt-3">But revenue remained inconsistent.</p>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-4 items-stretch">
              {["+22%|Demo-to-Proposal conversion", "Shorter|Sales cycles", "Fewer|Wasted demos"].map((stat) => {
                const [value, label] = stat.split("|");

                return (
                  <div
                    key={stat}
                    className="rounded-xl p-[1px] bg-[linear-gradient(138.81deg,#E2E8F0_26.66%,#125CF7_111.39%)] h-full"
                  >
                    <div className="h-full rounded-xl bg-white px-3 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-center">
                      <p className="text-2xl font-semibold text-blue-600">{value}</p>
                      <p className="text-xs leading-4 text-slate-700">{label}</p>
                    </div>
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
              className="mt-8 flex items-center gap-2 text-sm text-blue-600 transition hover:text-blue-800"
              aria-expanded={expanded}
            >
              Full case breakdown
              {expanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <CaseBreakdownPanel
              expanded={expanded}
              className={expanded ? "mt-6 lg:hidden" : "lg:hidden"}
            />
          </div>

          <div className="relative min-w-0 justify-self-end">
            <img
              src="/images/revenue-increase.webp"
              alt="Laptop showing revenue chart"
              className="block h-auto w-full object-contain"
            />
          </div>
        </div>
      </div>

      <SectionShell className="hidden lg:block">
        <CaseBreakdownPanel
          expanded={expanded}
          className={expanded ? "mt-12" : ""}
        />
      </SectionShell>
    </section>
  );
}

function InvestmentSection() {
  return (
    <section id="investment" className="bg-white py-12 sm:py-14">
      <SectionShell>
        <div className="grid gap-8 lg:grid-cols-[0.68fr_1.8fr] lg:gap-10">
          <div className="lg:w-4/5">
            <Badge>Investment</Badge>
            <h2 className="mt-5 text-3xl font-semibold leading-tight text-ink">
              A Smarter $2,500
              <span className="block">First Investment</span>
            </h2>
            <p className="mt-5 font-medium text-sm leading-6 text-slate-700">
              One stronger sales quarter can justify this investment.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {investmentCards.map((card) => (
              <div
                key={card.title}
                className="rounded-xl border border-slate-200 bg-white px-6 py-6 shadow-card transition hover:-translate-y-1 hover:shadow-soft"
              >
                <h3 className="mb-5 text-sm font-medium uppercase text-slate-800">{card.title}</h3>
                <BulletList items={card.items} tone={card.tone} />
                {card.note ? <p className="mt-4 text-sm font-medium leading-5 text-slate-800">{card.note}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

function FinalCTA({ bookingMessage, onBookCall }) {
  return (
    <section id="book-call" className="bg-[#071e43] py-12 text-white sm:py-14">
      <SectionShell>
        <div className="grid items-center gap-9 lg:grid-cols-[1.25fr_0.75fr]">
          <div className="flex gap-7">
            <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[linear-gradient(90deg,rgba(81,162,255,0.6),rgba(41,121,255,0.6))] sm:flex">
              <CalendarDays className="h-6 w-6" />
            </div>
            <div>
              <h2 className="max-w-[690px] text-3xl leading-tight sm:text-4xl">
                If the revenue feels harder than it should
                <span className="block font-bold text-blue-400">Let&apos;s Fix It.</span>
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
          <div className="text-left lg:text-center lg:ms-auto">
            <PrimaryButton className="w-full max-w-[280px] bg-blue-500 py-4 text-base hover:bg-blue-400" href="#book-call" onClick={onBookCall}>
              Book Your Free Fit Call
            </PrimaryButton>
            {bookingMessage ? (
              <p className="mx-auto mt-4 max-w-[320px] rounded-lg border border-blue-300/30 bg-white/10 px-4 py-3 text-sm font-semibold leading-5 text-blue-50">
                {bookingMessage}
              </p>
            ) : null}
            <p className="mt-5 text-sm font-medium text-white">No pressure. No obligation.</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-blue-100 lg:justify-center">
              <Star className="h-4 w-4 text-blue-400" />
              20 - 30 minute diagnostic call
            </p>
          </div>
        </div>
      </SectionShell>
    </section>
  );
}

export default function LandingPage() {
  const { bookingMessage, openCalendlyPopup } = useCalendlyPopup();

  return (
    <main>
      <CalendlyScriptLoader />
      <Header onBookCall={openCalendlyPopup} />
      <Hero onBookCall={openCalendlyPopup} />
      <FamiliarSection />
      <OfferSection />
      <CredibilitySection />
      <InvestmentSection />
      <FinalCTA bookingMessage={bookingMessage} onBookCall={openCalendlyPopup} />

      {/* FOOTER */}
      <footer className="bg-[#071e43] py-5">
        <SectionShell>
          <div className="flex flex-col items-center justify-center gap-3 text-center">
            <p className="text-sm text-slate-500">© {new Date().getFullYear()} UnblockSaaS. All rights reserved.</p>
          </div>
        </SectionShell>
      </footer>
    </main>
  );
}
