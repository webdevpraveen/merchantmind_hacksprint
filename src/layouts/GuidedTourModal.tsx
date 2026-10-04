import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  Sparkles,
  ChevronRight,
  ChevronLeft,
  X,
  ShieldAlert,
  Calculator,
  CheckSquare,
  Network,
  Activity,
  Zap,
  CheckCircle2,
  LayoutDashboard,
  Heart,
  Trophy,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';
import { useMerchant } from '../context/MerchantContext';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { formatINR } from '../utils/formatters';

interface TourStep {
  title: string;
  badge: string;
  icon: React.ComponentType<{ className?: string }>;
  targetId: string;
  targetName: string;
  preferredPlacement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  keyMetricLabel: string;
  keyMetricValue: string;
  metricVariant?: 'default' | 'rose' | 'amber' | 'emerald' | 'indigo' | 'cyan';
  content: React.ReactNode;
  actionLabel: string;
  onApply: () => void;
}

interface PopoverCoords {
  top: number;
  left: number;
  placement: 'top' | 'bottom' | 'left' | 'right' | 'center';
  arrowOffset: number;
}

export const GuidedTourModal: React.FC = () => {
  const {
    isTourOpen,
    closeTour,
    setActiveWorld,
    setActiveAppTab,
    openEvidenceDrawer,
    closeEvidenceDrawer,
  } = useMerchant();

  const [currentStep, setCurrentStep] = useState(0);
  const [coords, setCoords] = useState<PopoverCoords | null>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const steps: TourStep[] = [
    {
      title: '1. The Problem: Working Capital Blindspots',
      badge: 'MSME Reality',
      icon: LayoutDashboard,
      targetId: 'tour-merchant-header',
      targetName: 'Executive Command Center & Store Header',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'The Core Challenge',
      keyMetricValue: 'Rolling Liquidity Squeeze',
      metricVariant: 'rose',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p className="font-semibold text-slate-900">
            India’s 63M+ retail merchants lack real-time runway visibility:
          </p>
          <ul className="space-y-1 text-slate-600 list-disc list-inside text-[11px]">
            <li>Customer Khata delays collide with wholesale supplier maturities</li>
            <li>No dedicated CFO, accounting staff, or real-time runway tools</li>
            <li>Forced into emergency 24–36% APR credit or inventory stockouts</li>
          </ul>
          <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
            <strong className="text-slate-800">MerchantMind&rsquo;s Mission:</strong> Connect everyday business signals into explainable, automated foresight before capital cliffs occur.
          </div>
        </div>
      ),
      actionLabel: 'Meet the Merchant',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        closeEvidenceDrawer();
      },
    },
    {
      title: '2. Merchant Scenario: Rajesh Mobile',
      badge: 'Simulated Persona',
      icon: LayoutDashboard,
      targetId: 'tour-merchant-header',
      targetName: 'Executive Command Center & Store Header',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Store Scale',
      keyMetricValue: '40+ Daily Txns • ₹1,42,800/mo',
      metricVariant: 'indigo',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            <strong>Rajesh Kumar</strong> runs <em>Rajesh Mobile & Accessories</em> in Gomti Nagar Market, Jaipur.
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-indigo-50/60 border border-indigo-200 rounded-lg">
              <span className="text-[10px] text-indigo-800 block font-sans font-medium">Monthly Revenue:</span>
              <strong className="text-slate-900 text-sm">₹1,42,800</strong>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block font-sans font-medium">Gross Margin:</span>
              <strong className="text-slate-900 text-sm">24.5% (+8.4% MoM)</strong>
            </div>
          </div>
          <p className="text-slate-500 text-[11px]">
            Profitable on paper, but everyday cash is trapped across customer credit and slow-moving shelf stock.
          </p>
        </div>
      ),
      actionLabel: 'Inspect Cash Reality',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        closeEvidenceDrawer();
      },
    },
    {
      title: '3. Financial Squeeze: Available Cash',
      badge: 'Financial Health',
      icon: Activity,
      targetId: 'tour-kpi-cash',
      targetName: 'Available Operating Cash Card',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Liquid Cash vs Safe Minimum',
      keyMetricValue: '₹40,607 (Buffer: 90% • 11d Runway)',
      metricVariant: 'amber',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            Operating cash balance in SBI Current Account ending in 4910 is dangerously thin:
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs font-mono">
            <div className="p-2 bg-amber-50/60 border border-amber-200 rounded-lg">
              <span className="text-[10px] text-amber-800 block font-sans font-medium">Available Cash:</span>
              <strong className="text-slate-900 text-sm">{formatINR(40607)}</strong>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] text-slate-500 block font-sans font-medium">Safe Reserve:</span>
              <strong className="text-slate-900 text-sm">{formatINR(45000)}</strong>
            </div>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Rajesh holds <strong>₹40,607</strong> in liquid funds with only 11.4 days of operational runway.
          </p>
        </div>
      ),
      actionLabel: 'Inspect 5-Day Cliff',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        closeEvidenceDrawer();
      },
    },
    {
      title: '4. Detection: Impending Liquidity Cliff',
      badge: 'Cashflow Radar',
      icon: ShieldAlert,
      targetId: 'tour-supplier-cliff',
      targetName: 'Impending 5-Day Supplier Cliff Alert',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Liquidity Deficit Detected',
      keyMetricValue: '-₹4,393 Gap (Due in 5 Days)',
      metricVariant: 'rose',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            In 5 days, wholesale bill <strong>BILL-SUP-201</strong> from Sharma Telecom Distributor falls due for <strong>₹45,000</strong>:
          </p>
          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl space-y-1 font-mono text-xs">
            <div className="flex justify-between">
              <span className="text-rose-900 font-sans">Operating Cash Available:</span>
              <span className="font-bold text-slate-900">{formatINR(40607)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-rose-900 font-sans">Wholesale Bill Due:</span>
              <span className="font-bold text-rose-700">{formatINR(45000)}</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-rose-200 font-bold text-rose-950">
              <span className="font-sans">Immediate Cash Deficit:</span>
              <span>-₹4,393</span>
            </div>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Detected autonomously 5 days in advance, completely avoiding bounced payments or emergency debt.
          </p>
        </div>
      ),
      actionLabel: 'Inspect Evidence',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        closeEvidenceDrawer();
      },
    },
    {
      title: '5. Evidence: Forensic Audit Lineage',
      badge: 'Audit Lineage',
      icon: Calculator,
      targetId: 'tour-evidence-tree',
      targetName: 'Audit & Evidence Explorer (Deterministic Formula)',
      preferredPlacement: 'left',
      keyMetricLabel: 'Forensic Evidence Grounding',
      keyMetricValue: '100% Deterministic Arithmetic',
      metricVariant: 'indigo',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            Every flagged anomaly is backed by immutable source ledger records:
          </p>
          <div className="p-2.5 bg-slate-900 text-slate-100 rounded-xl space-y-1 text-[11px] font-mono">
            <div className="text-indigo-300 font-sans font-semibold">Canonical Source Records:</div>
            <ul className="space-y-0.5 text-slate-300">
              <li>• <strong>BILL-SUP-201:</strong> ₹45,000 Sharma Telecom distributor invoice.</li>
              <li>• <strong>INV-REC-101/103:</strong> ₹3,700 overdue customer Khata (Amit & Neha).</li>
              <li>• <strong>SKUs (IP11, Pouch, OTG):</strong> ₹10,660 locked in 47+ day stagnant inventory.</li>
            </ul>
          </div>
          <p className="text-slate-600 text-[11px]">
            Zero black-box hallucinations. Verifiable proof at every step.
          </p>
        </div>
      ),
      actionLabel: 'Review Recommendation',
      onApply: () => {
        setActiveWorld('app');
        setActiveAppTab('command-center');
        openEvidenceDrawer('evi_01');
      },
    },
    {
      title: '6. Recommendation: Dual Capital Levers',
      badge: 'Opportunity Engine',
      icon: Zap,
      targetId: 'tour-opportunities-top',
      targetName: 'Ranked Opportunities List',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Combined Capital Liberated',
      keyMetricValue: '+₹11,500 Recovery in 48h',
      metricVariant: 'emerald',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            MerchantMind formulates two concrete, high-velocity operational levers:
          </p>
          <div className="space-y-1.5">
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-xs">
              <div>
                <strong className="text-slate-900 block">1. Overdue Khata Paylinks:</strong>
                <span className="text-[10px] text-slate-500">Amit Verma (₹2.2K) + Neha Sharma (₹1.5K)</span>
              </div>
              <span className="font-mono font-bold text-emerald-700">+₹3,700</span>
            </div>
            <div className="p-2 bg-slate-50 border border-slate-200 rounded-lg flex justify-between items-center text-xs">
              <div>
                <strong className="text-slate-900 block">2. Dead Stock Clearance:</strong>
                <span className="text-[10px] text-slate-500">iPhone 11 & OnePlus 7 cases weekend bundle</span>
              </div>
              <span className="font-mono font-bold text-emerald-700">+₹7,800</span>
            </div>
          </div>
          <p className="text-emerald-800 font-semibold text-[11px]">
            Total Recovery: <strong>+₹11,500</strong>—more than enough to eliminate the -₹4,393 deficit!
          </p>
        </div>
      ),
      actionLabel: 'Go to Action Approval',
      onApply: () => {
        closeEvidenceDrawer();
        setActiveWorld('app');
        setActiveAppTab('opportunities');
      },
    },
    {
      title: '7. Action: Human-in-the-Loop Gate',
      badge: 'Decision Matrix',
      icon: CheckSquare,
      targetId: 'tour-action-card',
      targetName: 'Proprietor Action Approval Gate',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Proprietor Governance',
      keyMetricValue: 'Mandatory Merchant Consent',
      metricVariant: 'indigo',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            Zero unilateral execution: Actions require explicit proprietor consent before dispatch.
          </p>
          <div className="p-2.5 bg-indigo-50/70 border border-indigo-200 rounded-xl space-y-1 text-xs">
            <div className="flex justify-between items-center font-bold text-slate-900 text-xs">
              <span>Action: WhatsApp UPI Collection Paylink</span>
              <Badge variant="indigo" size="sm">Low Friction</Badge>
            </div>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Dispatches courteous WhatsApp reminders with dynamic 1-click Paytm UPI links directly to Amit and Neha.
            </p>
          </div>
          <p className="text-slate-600 text-[11px]">
            Click &ldquo;Approve Action&rdquo; to launch the professional confirmation and simulation flow.
          </p>
        </div>
      ),
      actionLabel: 'View Measured Outcome',
      onApply: () => {
        closeEvidenceDrawer();
        setActiveWorld('app');
        setActiveAppTab('actions');
      },
    },
    {
      title: '8. Outcome: Measured Business Delta',
      badge: 'Outcome Verification',
      icon: CheckCircle2,
      targetId: 'tour-outcome-card',
      targetName: 'Closed-Loop Telemetry Verification Panel',
      preferredPlacement: 'top',
      keyMetricLabel: 'Net Transformation',
      keyMetricValue: '-₹4,393 Deficit → +₹7,107 Surplus',
      metricVariant: 'emerald',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            Closed-loop telemetry measures downstream bank and inventory updates:
          </p>
          <div className="p-2.5 bg-emerald-50 border border-emerald-200 rounded-xl space-y-1.5 text-xs">
            <span className="font-bold text-emerald-950 block text-[11px] uppercase tracking-wider">
              Financial Transformation Measured:
            </span>
            <div className="flex justify-between font-mono font-semibold text-xs">
              <span className="text-slate-700">Cash Recovered (Khata + Stock):</span>
              <span className="text-emerald-700">+₹11,500</span>
            </div>
            <div className="flex justify-between font-mono font-semibold text-xs">
              <span className="text-slate-700">Sharma Telecom Bill Settled:</span>
              <span className="text-rose-700">-₹45,000</span>
            </div>
            <div className="flex justify-between pt-1 border-t border-emerald-200 font-mono font-bold text-emerald-950 text-xs">
              <span>Resulting Operating Balance:</span>
              <span>+₹7,107 Safe Surplus!</span>
            </div>
          </div>
          <p className="text-slate-600 text-[11px]">
            The -₹4,393 crisis was averted with no debt taken, recorded to the immutable audit log.
          </p>
        </div>
      ),
      actionLabel: 'Inspect Architecture',
      onApply: () => {
        closeEvidenceDrawer();
        setActiveWorld('app');
        setActiveAppTab('actions');
      },
    },
    {
      title: '9. Architecture: Deterministic Core',
      badge: 'Technical Rigor',
      icon: Network,
      targetId: 'tour-architecture-pipeline',
      targetName: 'Paytm Ingestion & System Architecture',
      preferredPlacement: 'bottom',
      keyMetricLabel: 'Decoupled Topology',
      keyMetricValue: 'Deterministic Core vs AI Copilot',
      metricVariant: 'indigo',
      content: (
        <div className="space-y-2 text-xs text-slate-700">
          <p>
            MerchantMind’s architecture maintains strict boundaries across three layers:
          </p>
          <div className="p-2.5 bg-slate-900 text-slate-100 rounded-xl font-mono text-[11px] space-y-1">
            <p className="text-cyan-300">1. External Integration Boundary (Paytm, SBI, Tally)</p>
            <p className="text-slate-400">   &darr; Canonical Deduplication & Normalization</p>
            <p className="text-amber-300">2. Deterministic Financial Core (100% Verifiable)</p>
            <p className="text-slate-400">   &darr; Audit Lineage & Decision Matrix</p>
            <p className="text-emerald-400">3. AI Copilot Overlay (Explanation only, not math)</p>
          </div>
          <p className="text-slate-500 text-[11px]">
            All financial arithmetic is deterministic. Zero model hallucinations in financial statements.
          </p>
        </div>
      ),
      actionLabel: 'Paytm & Jury Tribute 💌',
      onApply: () => {
        closeEvidenceDrawer();
        setActiveWorld('app');
        setActiveAppTab('architecture');
      },
    },
    {
      title: '10. Paytm Ecosystem & A Tribute to Our Judges 🙏',
      badge: 'Paytm & MAHE Shortlist',
      icon: Heart,
      targetId: 'tour-judges-tribute',
      targetName: 'Special Dedication & Offline Grand Finale Appeal',
      preferredPlacement: 'center',
      keyMetricLabel: 'Our Dream & Aspiration',
      keyMetricValue: 'MAHE Karnataka Offline Round Shortlist 🌟',
      metricVariant: 'emerald',
      content: (
        <div className="space-y-3 text-xs text-slate-700 max-h-[55vh] overflow-y-auto pr-1">
          {/* Paytm Ecosystem Note */}
          <div className="p-3 bg-cyan-950 text-cyan-100 rounded-xl border border-cyan-800 space-y-1">
            <div className="flex items-center justify-between text-xs font-bold text-cyan-300">
              <span>Paytm Sponsor Ecosystem Integration</span>
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-cyan-900 border border-cyan-700">CONNECTOR READY</span>
            </div>
            <p className="text-[11px] text-cyan-200/90 leading-relaxed">
              Designed integration boundary ingests continuous Paytm QR standee and Soundbox voice events, turning counter transaction velocity into 14-day cashflow radar and instant UPI recovery paylinks.
            </p>
          </div>

          {/* Top Warm Greeting Banner */}
          <div className="p-3.5 bg-gradient-to-br from-amber-50 via-orange-50/40 to-amber-50 rounded-xl border border-amber-200/90 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs">
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse shrink-0" />
              <span>Respected Judges, Evaluators & Mentors 🙏</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-xs">
              First and foremost, <strong>thank you deeply from the bottom of our hearts</strong> for investing your valuable time, sharp feedback, and mentorship to review <strong>MerchantMind</strong> today. Having esteemed industry leaders evaluate our work means everything to our student team.
            </p>
          </div>

          {/* Sleepless Nights & Passion */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
            <span className="font-bold text-slate-900 block text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
              <span>Our Dedication & The Problem We Care About</span>
            </span>
            <p className="text-slate-600 leading-relaxed text-xs">
              Over tireless days and sleepless nights, we poured our absolute energy and heart into building this solution. We refused to make just another superficial prototype or generic AI chatbot wrapper. Instead, we spent days analyzing the authentic working capital pains of India&rsquo;s <strong>63+ million micro-retailers</strong>—shopkeepers like <em>Rajesh Kumar</em> whose livelihoods depend on everyday rolling liquidity.
            </p>
            <p className="text-slate-600 leading-relaxed text-xs">
              Every formula, every ledger reconciliation, and every line of code was crafted with mathematical integrity—ensuring zero hallucination, verifiable audit lineage, and real merchant safety.
            </p>
          </div>

          {/* MAHE Karnataka Offline Round Dream */}
          <div className="p-4 bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-900 text-white rounded-xl border border-indigo-500/60 shadow-md space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold text-xs">
              <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="uppercase tracking-wider">Our Greatest Dream: MAHE Karnataka Offline Round</span>
            </div>
            <p className="text-white text-xs font-semibold leading-relaxed">
              We humbly request and hope that you consider shortlisting our team for the <strong>Offline Grand Finale at MAHE Karnataka (Manipal Academy of Higher Education)</strong>!
            </p>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Standing on campus at MAHE Karnataka would be the greatest honor and milestone for our team. It would give us the platform to demonstrate live hardware integrations (Paytm Soundbox audio triggers & smart POS ingestion), defend our system architecture under your toughest questions, and prove that student innovation can genuinely empower India&rsquo;s MSME economy.
            </p>
          </div>

          {/* Sincere Promise */}
          <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 text-xs flex items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="font-bold block text-xs">Our Sincere Promise to the Jury:</span>
              <p className="text-[11px] text-emerald-800 leading-relaxed">
                If shortlisted for MAHE Karnataka, we promise to bring unmatched technical depth, passion, and presentation rigor to the grand finale!
              </p>
            </div>
            <span className="text-2xl shrink-0">🇮🇳</span>
          </div>

          {/* Signoff */}
          <div className="pt-1 text-right">
            <p className="text-xs text-slate-500 italic">With highest respect, gratitude, and hopeful hearts,</p>
            <p className="text-xs font-bold text-slate-900 font-sans tracking-tight mt-0.5">
              — Team Aarambh Coders ❤️ 🙏
            </p>
          </div>
        </div>
      ),
      actionLabel: 'Complete Tour & Explore',
      onApply: () => {
        closeEvidenceDrawer();
      },
    },
  ];

const current = steps[currentStep];
const isJudgesTribute = currentStep === steps.length - 1;

// Helper to calculate exact anchored coordinates next to target element
const calculateAnchoredPosition = useCallback(() => {
  if (!isTourOpen) return;
  const step = steps[currentStep];

  // For the final Tribute Step (Step 9), center the card on screen
  if (step.preferredPlacement === 'center') {
    const modalWidth = Math.min(500, window.innerWidth - 32);
    const modalHeight = Math.min(620, window.innerHeight - 60);
    setCoords({
      top: Math.max(20, (window.innerHeight - modalHeight) / 2),
      left: Math.max(16, (window.innerWidth - modalWidth) / 2),
      placement: 'center',
      arrowOffset: 0,
    });
    // Remove spotlight from all elements
    document.querySelectorAll('.tour-spotlight-active').forEach((node) => {
      node.classList.remove('tour-spotlight-active');
    });
    return;
  }

  if (!step?.targetId) return;

  const el = document.getElementById(step.targetId);
  if (!el) {
    // Fallback position if element not yet in DOM
    setCoords({
      top: window.innerHeight - 360,
      left: Math.max(16, window.innerWidth / 2 - 190),
      placement: 'top',
      arrowOffset: 190,
    });
    return;
  }

  // Highlight target element with active spotlight ring
  document.querySelectorAll('.tour-spotlight-active').forEach((node) => {
    if (node !== el) node.classList.remove('tour-spotlight-active');
  });
  el.classList.add('tour-spotlight-active');

  const rect = el.getBoundingClientRect();
  const tooltipWidth = Math.min(390, window.innerWidth - 32);
  const popoverEl = popoverRef.current;
  const tooltipHeight = popoverEl ? popoverEl.offsetHeight : 320;
  const margin = 14;

  let placement = step.preferredPlacement;

  // Check if placement fits on screen, otherwise adapt intelligently
  if (placement === 'left') {
    if (rect.left < tooltipWidth + margin + 16) {
      placement = rect.bottom + tooltipHeight + margin < window.innerHeight ? 'bottom' : 'top';
    }
  } else if (placement === 'bottom') {
    if (rect.bottom + tooltipHeight + margin > window.innerHeight) {
      if (rect.top > tooltipHeight + margin) {
        placement = 'top';
      }
    }
  } else if (placement === 'top') {
    if (rect.top < tooltipHeight + margin) {
      if (window.innerHeight - rect.bottom > tooltipHeight + margin) {
        placement = 'bottom';
      }
    }
  }

  let top = 0;
  let left = 0;
  let arrowOffset = tooltipWidth / 2;

  if (placement === 'bottom') {
    top = Math.min(window.innerHeight - tooltipHeight - 16, rect.bottom + margin);
    const idealLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(16, Math.min(window.innerWidth - tooltipWidth - 16, idealLeft));
    const targetCenterX = rect.left + rect.width / 2;
    arrowOffset = Math.max(28, Math.min(tooltipWidth - 28, targetCenterX - left));
  } else if (placement === 'top') {
    top = Math.max(16, rect.top - tooltipHeight - margin);
    const idealLeft = rect.left + rect.width / 2 - tooltipWidth / 2;
    left = Math.max(16, Math.min(window.innerWidth - tooltipWidth - 16, idealLeft));
    const targetCenterX = rect.left + rect.width / 2;
    arrowOffset = Math.max(28, Math.min(tooltipWidth - 28, targetCenterX - left));
  } else if (placement === 'left') {
    left = Math.max(16, rect.left - tooltipWidth - margin);
    const idealTop = rect.top + Math.min(100, rect.height / 2) - tooltipHeight / 2;
    top = Math.max(70, Math.min(window.innerHeight - tooltipHeight - 16, idealTop));
    const targetCenterY = rect.top + Math.min(100, rect.height / 2);
    arrowOffset = Math.max(28, Math.min(tooltipHeight - 28, targetCenterY - top));
  } else if (placement === 'right') {
    left = Math.min(window.innerWidth - tooltipWidth - 16, rect.right + margin);
    const idealTop = rect.top + Math.min(100, rect.height / 2) - tooltipHeight / 2;
    top = Math.max(70, Math.min(window.innerHeight - tooltipHeight - 16, idealTop));
    const targetCenterY = rect.top + Math.min(100, rect.height / 2);
    arrowOffset = Math.max(28, Math.min(tooltipHeight - 28, targetCenterY - top));
  }

  setCoords({
    top,
    left,
    placement,
    arrowOffset,
  });
}, [isTourOpen, currentStep, steps]);

// Handle step change & smooth scroll to target
useEffect(() => {
  if (!isTourOpen) {
    document.querySelectorAll('.tour-spotlight-active').forEach((node) => {
      node.classList.remove('tour-spotlight-active');
    });
    setCoords(null);
    return;
  }

  const step = steps[currentStep];
  if (step?.onApply) {
    step.onApply();
  }

  const timer = setTimeout(() => {
    if (step?.targetId && step.preferredPlacement !== 'center') {
      const el = document.getElementById(step.targetId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    calculateAnchoredPosition();
  }, 200);

  return () => clearTimeout(timer);
}, [currentStep, isTourOpen]);

// Window scroll and resize listeners to keep anchored popover tightly locked to target
useEffect(() => {
  if (!isTourOpen) return;

  const handleUpdate = () => {
    requestAnimationFrame(calculateAnchoredPosition);
  };

  window.addEventListener('scroll', handleUpdate, { passive: true });
  window.addEventListener('resize', handleUpdate);

  return () => {
    window.removeEventListener('scroll', handleUpdate);
    window.removeEventListener('resize', handleUpdate);
  };
}, [isTourOpen, calculateAnchoredPosition]);

// Keyboard navigation
useEffect(() => {
  if (!isTourOpen) return;
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'ArrowRight') handleNext();
    if (e.key === 'ArrowLeft') handlePrev();
    if (e.key === 'Escape') handleClose();
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, [isTourOpen, currentStep]);

const handleNext = () => {
  if (currentStep < steps.length - 1) {
    setCurrentStep(currentStep + 1);
  } else {
    handleClose();
  }
};

const handlePrev = () => {
  if (currentStep > 0) {
    setCurrentStep(currentStep - 1);
  }
};

const handleJumpToStep = (index: number) => {
  setCurrentStep(index);
};

const handleClose = () => {
  document.querySelectorAll('.tour-spotlight-active').forEach((node) => {
    node.classList.remove('tour-spotlight-active');
  });
  closeEvidenceDrawer();
  closeTour();
};

if (!isTourOpen || !coords) return null;

return (
  <>
    {/* ========================================================
          ON-PAGE ANCHORED TUTORIAL POPOVER (Travels to each section/button)
          ZERO BACKDROP BLUR • NO MODAL OVERLAY • 100% Page Visible!
         ======================================================== */}
    <aside
      ref={popoverRef}
      aria-label="Interactive Onboarding Walkthrough"
      style={{
        position: 'fixed',
        top: coords.top,
        left: coords.left,
        zIndex: 60,
        width: isJudgesTribute
          ? Math.min(500, window.innerWidth - 32)
          : Math.min(390, window.innerWidth - 32),
      }}
      className="transition-all duration-300 ease-out select-none"
    >
      <div
        className={`relative bg-white/98 rounded-2xl shadow-2xl backdrop-blur-md overflow-visible text-slate-900 animate-in fade-in zoom-in-95 duration-200 ${isJudgesTribute
          ? 'border-2 border-amber-300/90 ring-4 ring-amber-500/10'
          : 'border border-slate-200/90'
          }`}
      >
        {/* ====================================================
              ARROW BEAK POINTER (Connects Tooltip directly to Target)
              (Rendered for Steps 1-8 where anchored)
             ==================================================== */}
        {coords.placement === 'bottom' && (
          <>
            {/* Arrow Square rotated 45deg on Top Edge pointing UP */}
            <div
              style={{ left: coords.arrowOffset }}
              className="absolute -top-2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-t border-l border-slate-200/90 shadow-xs z-20 pointer-events-none"
            />
            {/* Pulsing beacon dot at arrow tip */}
            <span
              style={{ left: coords.arrowOffset }}
              className="absolute -top-3.5 -translate-x-1/2 flex h-2 w-2 z-30 pointer-events-none"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
          </>
        )}

        {coords.placement === 'top' && (
          <>
            {/* Arrow Square rotated 45deg on Bottom Edge pointing DOWN */}
            <div
              style={{ left: coords.arrowOffset }}
              className="absolute -bottom-2 -translate-x-1/2 w-4 h-4 rotate-45 bg-white border-b border-r border-slate-200/90 shadow-xs z-20 pointer-events-none"
            />
            {/* Pulsing beacon dot at arrow tip */}
            <span
              style={{ left: coords.arrowOffset }}
              className="absolute -bottom-3.5 -translate-x-1/2 flex h-2 w-2 z-30 pointer-events-none"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
          </>
        )}

        {coords.placement === 'left' && (
          <>
            {/* Arrow Square rotated 45deg on Right Edge pointing RIGHT */}
            <div
              style={{ top: coords.arrowOffset }}
              className="absolute -right-2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-t border-r border-slate-200/90 shadow-xs z-20 pointer-events-none"
            />
            {/* Pulsing beacon dot at arrow tip */}
            <span
              style={{ top: coords.arrowOffset }}
              className="absolute -right-3.5 -translate-y-1/2 flex h-2 w-2 z-30 pointer-events-none"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
          </>
        )}

        {coords.placement === 'right' && (
          <>
            {/* Arrow Square rotated 45deg on Left Edge pointing LEFT */}
            <div
              style={{ top: coords.arrowOffset }}
              className="absolute -left-2 -translate-y-1/2 w-4 h-4 rotate-45 bg-white border-b border-l border-slate-200/90 shadow-xs z-20 pointer-events-none"
            />
            {/* Pulsing beacon dot at arrow tip */}
            <span
              style={{ top: coords.arrowOffset }}
              className="absolute -left-3.5 -translate-y-1/2 flex h-2 w-2 z-30 pointer-events-none"
            >
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-600" />
            </span>
          </>
        )}

        {/* Top Decorative Gradient Accent Bar */}
        <div
          className={`h-1.5 w-full rounded-t-2xl ${isJudgesTribute
            ? 'bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600'
            : 'bg-gradient-to-r from-indigo-600 via-cyan-500 to-emerald-500'
            }`}
        />

        {/* Main Popover Content */}
        <div className="p-4 sm:p-4.5 space-y-3">
          {/* Header: Step Indicator & Badges */}
          <div className="flex items-center justify-between pb-2 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${isJudgesTribute
                  ? 'bg-amber-100 border border-amber-300 text-amber-700'
                  : 'bg-indigo-50 border border-indigo-200 text-indigo-700'
                  }`}
              >
                {isJudgesTribute ? (
                  <Trophy className="w-3.5 h-3.5 text-amber-600" />
                ) : (
                  <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                )}
              </div>
              <div>
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider block ${isJudgesTribute ? 'text-amber-700' : 'text-indigo-600'
                    }`}
                >
                  {isJudgesTribute
                    ? 'Hackathon Grand Finale Tribute'
                    : `Tutorial Guide • Step ${currentStep + 1} of ${steps.length}`}
                </span>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {current.title}
                </h4>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              <Badge variant={isJudgesTribute ? 'amber' : 'indigo'} size="sm">
                {current.badge}
              </Badge>
              <button
                onClick={handleClose}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors cursor-pointer"
                title="Exit Tour"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Target Element Name Tag (for steps 1-8) */}
          {!isJudgesTribute && (
            <div className="px-2.5 py-1 bg-slate-50 border border-slate-200/80 rounded-lg flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Inspecting:</span>
              <strong className="text-slate-900 font-semibold truncate max-w-[220px]">
                {current.targetName}
              </strong>
            </div>
          )}

          {/* Step Body Explanation */}
          <div className="py-0.5">{current.content}</div>

          {/* Key Metric Snapshot */}
          {!isJudgesTribute && (
            <div className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
              <span className="text-[11px] font-medium text-slate-500">
                {current.keyMetricLabel}:
              </span>
              <span
                className={`font-mono font-bold text-xs ${current.metricVariant === 'rose'
                  ? 'text-rose-700'
                  : current.metricVariant === 'emerald'
                    ? 'text-emerald-700'
                    : current.metricVariant === 'amber'
                      ? 'text-amber-800'
                      : current.metricVariant === 'cyan'
                        ? 'text-cyan-700'
                        : 'text-indigo-700'
                  }`}
              >
                {current.keyMetricValue}
              </span>
            </div>
          )}

          {/* Quick Jump Step Pills (1 to 8 + 💌 Note to Judges) */}
          <div className="space-y-1 pt-0.5">
            <div className="flex items-center justify-between text-[9px] text-slate-400 font-bold uppercase tracking-wider">
              <span>Jump to Step:</span>
              <span>{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="grid grid-cols-9 gap-1">
              {steps.map((s, idx) => {
                const isCurrent = idx === currentStep;
                const isPast = idx < currentStep;
                const isLast = idx === steps.length - 1;
                return (
                  <button
                    key={idx}
                    onClick={() => handleJumpToStep(idx)}
                    className={`h-6 rounded-md text-[11px] font-bold transition-all cursor-pointer flex items-center justify-center ${isCurrent
                      ? isLast
                        ? 'bg-amber-600 text-white shadow-xs ring-2 ring-amber-400 ring-offset-1'
                        : 'bg-indigo-600 text-white shadow-xs ring-2 ring-indigo-400 ring-offset-1'
                      : isPast
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                        : isLast
                          ? 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
                          : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                      }`}
                    title={s.title}
                  >
                    {isLast ? '💌' : idx + 1}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Mini Progress Bar */}
          <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${isJudgesTribute ? 'bg-amber-500' : 'bg-indigo-600'
                }`}
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              className="text-slate-500 text-xs px-2.5 h-7.5"
            >
              <ChevronLeft className="w-3.5 h-3.5 mr-0.5" />
              <span>Prev</span>
            </Button>

            <div className="flex items-center gap-2">
              {isJudgesTribute ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentStep(0)}
                    className="text-xs px-2.5 h-7.5 text-slate-600"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    <span>Replay Tour</span>
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleClose}
                    className="text-xs px-3 h-7.5 bg-emerald-600 hover:bg-emerald-700 shadow-sm"
                  >
                    <span>Explore Command Center</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleClose}
                    className="text-xs px-2.5 h-7.5 text-slate-600"
                  >
                    Exit
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={handleNext}
                    className="text-xs px-3 h-7.5 bg-indigo-600 hover:bg-indigo-700 shadow-sm"
                  >
                    <span>{current.actionLabel || 'Next'}</span>
                    <ChevronRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  </>
);
};
