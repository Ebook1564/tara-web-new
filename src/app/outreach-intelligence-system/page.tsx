"use client";

import React, { useState, useEffect, useRef } from "react";
import "./outreach.css";

interface Stage {
  name: string;
  lines: string[];
  icon: "people" | "chat" | "clip" | "cal";
  grad: string;
  lead: string;
  list: string[];
  metric: string;
  metricLabel: string;
  y0: number;
  y1: number;
  top: number;
  bot: number;
}

const stages: Stage[] = [
  {
    name: "Targeted Outreach",
    lines: ["Targeted Outreach"],
    icon: "people",
    grad: "g0",
    lead: "We research your ideal accounts and decision-makers, then reach out to each one personally on LinkedIn.",
    list: [
      "You define the buyer: sector, company size, region and the titles that decide",
      "A sample shortlist checks the fit before we start",
      "We study each company and person: role, decision experience, size, stage and fit",
      "Personal messages on LinkedIn, never mass blasts",
    ],
    metric: "~2,400",
    metricLabel: "prospects researched and contacted in a typical month",
    y0: 14,
    y1: 94,
    top: 360,
    bot: 300,
  },
  {
    name: "Meaningful Conversation",
    lines: ["Meaningful", "Conversation"],
    icon: "chat",
    grad: "g1",
    lead: "We follow up persistently and turn replies into real two-way conversations about your service.",
    list: [
      "Follow-ups are timed and personal",
      "Replies become real conversations, not canned answers",
      "We move to the channel the prospect prefers: WhatsApp, email or a call",
    ],
    metric: "~240",
    metricLabel: "conversations in a typical month",
    y0: 104,
    y1: 184,
    top: 288,
    bot: 232,
  },
  {
    name: "Qualified Leads",
    lines: ["Qualified Leads"],
    icon: "clip",
    grad: "g2",
    lead: "Decision-makers who showed interest in your service, have the authority to buy, and agreed to speak with you.",
    list: [
      "Interest: they asked to take it further",
      "Authority to buy: role confirmed in research and conversation",
      "Capacity to proceed: the company fits your target",
      "Agreement: they said yes to a meeting",
    ],
    metric: "4 / 4",
    metricLabel: "checks every lead must pass. Try them below.",
    y0: 194,
    y1: 274,
    top: 220,
    bot: 168,
  },
  {
    name: "Booked Meetings",
    lines: ["Booked", "Meetings"],
    icon: "cal",
    grad: "g3",
    lead: "The meeting goes on your calendar with a short brief, and your team takes it from there.",
    list: [
      "Held on the channel the prospect chose: Google Meet, a call and so on",
      "The brief covers who they are, what they said and what to ask",
      "Your team runs the conversation and the close",
    ],
    metric: "~15",
    metricLabel: "qualified meetings in a typical month",
    y0: 284,
    y1: 376,
    top: 156,
    bot: 112,
  },
];

type NicheKey = "software" | "saas" | "marketing";

interface BriefData {
  note: string;
  lock: string;
  title: string;
  mon: string;
  day: string;
  when: string;
  chan: "meet" | "phone";
  chanText: string;
  cta: string;
  av: string;
  role: string;
  co: string;
  who: string;
  said: string;
  ask: string[];
}

const briefs: Record<NicheKey, BriefData> = {
  software: {
    note: "Head of Operations, Retail · Wed 21 Oct, 11:00 AM",
    lock: "Tuesday, 20 October",
    title: "Discovery call · Custom software",
    mon: "OCT",
    day: "21",
    when: "Wed · 11:00–11:30 AM",
    chan: "meet",
    chanText: "Google Meet · 30 min",
    cta: "Join Google Meet",
    av: "HO",
    role: "Head of Operations",
    co: "Regional retail chain, 200 staff",
    who: "Owns the budget for internal tools at a 200-person regional retail chain.",
    said: "Inventory and orders still run on spreadsheets and an old ERP plug-in. Our last vendor missed deadlines, so we need a partner with a clear delivery plan.",
    ask: [
      "Which systems must the new app connect to?",
      "Who signs off on the build?",
      "Would a fixed-scope first phase before peak season work?",
    ],
  },
  saas: {
    note: "VP of Sales, Distribution · Thu 22 Oct, 3:00 PM",
    lock: "Wednesday, 21 October",
    title: "Intro call · B2B SaaS",
    mon: "OCT",
    day: "22",
    when: "Thu · 3:00–3:20 PM",
    chan: "phone",
    chanText: "Phone call · 20 min",
    cta: "Call prospect",
    av: "VS",
    role: "VP of Sales",
    co: "Industrial distributor, 90 staff",
    who: "Chooses the sales tools for a team of 25 reps at a 90-person industrial distributor.",
    said: "Reps lose hours logging calls by hand and pipeline reports arrive a week late. Our current tool is up for renewal in February.",
    ask: [
      "How much time does logging cost the team each week?",
      "Who else joins the decision?",
      "Would they trial with one team first?",
    ],
  },
  marketing: {
    note: "Founder, Skincare brand · Fri 23 Oct, 12:00 PM",
    lock: "Thursday, 22 October",
    title: "Strategy call · Marketing agency",
    mon: "OCT",
    day: "23",
    when: "Fri · 12:00–12:30 PM",
    chan: "meet",
    chanText: "Google Meet · 30 min",
    cta: "Join Google Meet",
    av: "FD",
    role: "Founder",
    co: "D2C skincare brand, 40 staff",
    who: "Picks agencies personally for a 40-person direct-to-consumer skincare brand.",
    said: "Paid ads stopped scaling over the last two quarters and the in-house team is stretched. We have a product launch planned for spring.",
    ask: [
      "Which channels are working now?",
      "What would a successful launch look like?",
      "What monthly budget range do they have in mind?",
    ],
  },
};

export default function OutreachIntelligenceSystemPage() {
  // Funnel State
  const [currentStage, setCurrentStage] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const [isPlayingFlow, setIsPlayingFlow] = useState(false);

  // Video Film Controls
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  // Qualification Checker State
  const [checks, setChecks] = useState({
    interest: true,
    authority: true,
    capacity: false,
    agreement: false,
  });

  // Phone Mockup State
  const [niche, setNiche] = useState<NicheKey>("software");
  const [appOpen, setAppOpen] = useState(false);

  // Dashboard Frame Fullscreen State
  const [isDashFull, setIsDashFull] = useState(false);

  // Canvas Ref
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Select Stage with transition
  const handleSelectStage = (idx: number) => {
    if (idx === currentStage) return;
    setIsFading(true);
    setTimeout(() => {
      setCurrentStage(idx);
      setIsFading(false);
    }, 200);
  };

  // Auto-play Funnel Stages
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isPlayingFlow) {
      timer = setInterval(() => {
        setCurrentStage((prev) => {
          if (prev >= 3) {
            setIsPlayingFlow(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3200);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isPlayingFlow]);

  // Video Play/Pause & Sound Handlers
  const togglePlayFilm = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
    } else {
      videoRef.current.pause();
      setIsPaused(true);
    }
  };

  const toggleSoundFilm = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
    if (!videoRef.current.muted && videoRef.current.paused) {
      videoRef.current.play().catch(() => {});
      setIsPaused(false);
    }
  };

  // Fullscreen Dashboard Escape Handler
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isDashFull) {
        setIsDashFull(false);
        document.documentElement.style.overflow = "";
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDashFull]);

  const toggleDashFull = () => {
    const next = !isDashFull;
    setIsDashFull(next);
    document.documentElement.style.overflow = next ? "hidden" : "";
  };

  // Canvas Particle System
  useEffect(() => {
    const cv = canvasRef.current;
    if (!cv) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const size = () => {
      const r = cv.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      cv.width = r.width * d;
      cv.height = r.height * d;
      ctx.setTransform(cv.width / 400, 0, 0, cv.height / 400, 0, 0);
    };

    size();
    const observer = new ResizeObserver(size);
    observer.observe(cv);

    if (reduceMotion) return;

    const cx = 200;
    const gates = [99, 189, 279];
    const keep = [0.45, 0.55, 0.6];

    interface Particle {
      x: number;
      y: number;
      vy: number;
      g: number;
      out: number;
      a: number;
      r: number;
    }

    let ps: Particle[] = [];
    let last = performance.now();
    let acc = 0;

    const halfAt = (y: number) => {
      for (const s of stages) {
        if (y >= s.y0 && y <= s.y1) {
          const t = (y - s.y0) / (s.y1 - s.y0);
          return (s.top + (s.bot - s.top) * t) / 2;
        }
      }
      for (let k = 0; k < 3; k++) {
        const a = stages[k];
        const b = stages[k + 1];
        if (y > a.y1 && y < b.y0) {
          const t = (y - a.y1) / (b.y0 - a.y1);
          return (a.bot + (b.top - a.bot) * t) / 2;
        }
      }
      return 50;
    };

    const spawn = () => {
      const h = 170 * Math.random() * (Math.random() < 0.5 ? -1 : 1);
      ps.push({
        x: cx + h * 0.95,
        y: -4,
        vy: 28 + Math.random() * 22,
        g: 0,
        out: 0,
        a: 1,
        r: 1.4 + Math.random() * 1.4,
      });
    };

    const frame = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      acc += dt;
      while (acc > 0.09) {
        acc -= 0.09;
        if (ps.length < 90) spawn();
      }

      ctx.clearRect(0, 0, 400, 400);

      for (const p of ps) {
        if (p.out) {
          p.x += p.out * dt * 70;
          p.y += p.vy * dt * 0.4;
          p.a -= dt * 1.4;
        } else {
          p.y += p.vy * dt;
          if (p.g < 3 && p.y > gates[p.g]) {
            if (Math.random() > keep[p.g]) {
              p.out = p.x < cx ? -1 : 1;
            }
            p.g++;
          }
          const lim = halfAt(p.y) * 0.8;
          if (Math.abs(p.x - cx) > lim) {
            p.x += (cx + Math.sign(p.x - cx) * lim - p.x) * 0.15;
          }
          if (p.y > 372) {
            p.a -= dt * 3;
            p.r += dt * 6;
          }
        }

        const sel = stages[currentStage];
        const inSel = sel && p.y >= sel.y0 - 6 && p.y <= sel.y1 + 4 && !p.out;
        ctx.globalAlpha = Math.max(0, p.a) * (inSel ? 1 : 0.7);
        ctx.fillStyle = p.out ? "#ffb3ef" : p.y > 372 ? "#ffffff" : "#ffe6f8";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * (inSel ? 1.25 : 1), 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ps = ps.filter((p) => p.a > 0 && p.y < 400);
      animId = requestAnimationFrame(frame);
    };

    animId = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, [currentStage]);

  // Qualification calculations
  const passedCount = Object.values(checks).filter(Boolean).length;
  const isQualified = passedCount === 4;
  const missingChecks: string[] = [];
  if (!checks.interest) missingChecks.push("interest");
  if (!checks.authority) missingChecks.push("authority to buy");
  if (!checks.capacity) missingChecks.push("capacity to proceed");
  if (!checks.agreement) missingChecks.push("agreement");

  const currentBrief = briefs[niche];

  return (
    <div className="outreach-container">
      <main className="outreach-main">
        {/* Hero */}
        <header className="hero">
          <span className="eyebrow">LinkedIn-led B2B appointment setting</span>
          <h1>
            Outreach <span className="accent">Intelligence</span> System
          </h1>
          <p className="tagline">Outreach that ends on your calendar.</p>
          <p className="pitch">
            We research your ideal buyers, reach out to them on LinkedIn, qualify their interest, authority and fit, and book meetings on your calendar. Your team takes the conversations and closes the deals.
          </p>
        </header>

        {/* Film */}
        <section className="film" aria-label="The system in ten seconds">
          <div className="film-frame">
            <video
              ref={videoRef}
              id="film"
              src="/media/outreach-funnel.mp4"
              poster="/media/outreach-funnel-poster.jpg"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label="Animation of 2,400 prospects flowing through the funnel to about 15 qualified meetings"
            />
            <div className="film-ctl">
              <button className="btn" id="filmPlay" type="button" onClick={togglePlayFilm}>
                {isPaused ? "Play" : "Pause"}
              </button>
              <button className="btn" id="filmSound" type="button" onClick={toggleSoundFilm}>
                {isMuted ? "Sound on" : "Sound off"}
              </button>
            </div>
          </div>
          <p className="film-cap">From about 2,400 prospects to about 15 qualified meetings in a typical month.</p>
        </section>

        {/* Funnel Stage */}
        <section className="stage" aria-label="How the funnel works">
          <div>
            <div className="funnel-wrap">
              <svg viewBox="0 0 400 400" role="group" aria-label="Funnel stages. Select a stage to see details.">
                <defs>
                  <linearGradient id="g0" x1="0" x2="1">
                    <stop offset="0" stopColor="#d81ee0" />
                    <stop offset=".5" stopColor="#ff3fd2" />
                    <stop offset="1" stopColor="#a520f0" />
                  </linearGradient>
                  <linearGradient id="g1" x1="0" x2="1">
                    <stop offset="0" stopColor="#9a1fe6" />
                    <stop offset=".5" stopColor="#d42ef0" />
                    <stop offset="1" stopColor="#6d24e8" />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="1">
                    <stop offset="0" stopColor="#7a25ea" />
                    <stop offset=".5" stopColor="#9b3cf5" />
                    <stop offset="1" stopColor="#4f25d8" />
                  </linearGradient>
                  <linearGradient id="g3" x1="0" x2="1">
                    <stop offset="0" stopColor="#5a27e0" />
                    <stop offset=".5" stopColor="#7d44f2" />
                    <stop offset="1" stopColor="#3a22b8" />
                  </linearGradient>
                  <linearGradient id="shade" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0" stopColor="#000" stopOpacity="0" />
                    <stop offset="1" stopColor="#000" stopOpacity=".28" />
                  </linearGradient>
                </defs>
                <g id="layers">
                  {stages.map((s, i) => {
                    const cx = 200;
                    const ht = s.top / 2;
                    const hb = s.bot / 2;
                    const ry = 10;
                    const body = `M${cx - ht},${s.y0} L${cx - hb},${s.y1} A${hb},${(ry * hb) / ht} 0 0 0 ${cx + hb},${s.y1} L${cx + ht},${s.y0} Z`;
                    const fs = i === 3 ? 17 : 18;
                    const mid = (s.y0 + s.y1) / 2 + 6;
                    const isActive = currentStage === i;

                    return (
                      <g
                        key={s.name}
                        className={`layer ${isActive ? "active" : ""}`}
                        tabIndex={0}
                        role="button"
                        aria-label={s.name}
                        aria-pressed={isActive}
                        onClick={() => {
                          setIsPlayingFlow(false);
                          handleSelectStage(i);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            setIsPlayingFlow(false);
                            handleSelectStage(i);
                          }
                        }}
                      >
                        <path className="body" d={body} fill={`url(#${s.grad})`} />
                        <path d={body} fill="url(#shade)" />
                        <ellipse
                          className="rim"
                          cx={cx}
                          cy={s.y0}
                          rx={ht}
                          ry={ry}
                          fill={i === 0 ? "#ff6be0" : "#3a1a66"}
                          fillOpacity={i === 0 ? 0.55 : 0.6}
                          stroke="#ff9ae8"
                          strokeOpacity={0.5}
                          strokeWidth={1}
                        />
                        {s.lines.map((t, k) => (
                          <text
                            key={t}
                            x={cx}
                            textAnchor="middle"
                            fontSize={fs}
                            y={mid + (k - (s.lines.length - 1) / 2) * (fs + 3)}
                          >
                            {t}
                          </text>
                        ))}
                      </g>
                    );
                  })}
                </g>
              </svg>
              <canvas ref={canvasRef} id="flow" aria-hidden="true" />
            </div>
            <p className="funnel-hint">Tap a layer of the funnel to explore it.</p>
          </div>

          <article className="panel" aria-live="polite">
            <div className={`panel-body ${isFading ? "fade" : ""}`} id="panelBody">
              <div className="panel-top">
                <div className="icon">
                  {stages[currentStage].icon === "people" && (
                    <svg viewBox="0 0 24 24">
                      <circle cx="12" cy="8" r="3.2" />
                      <path d="M5.5 19c.8-3.4 3.4-5 6.5-5s5.7 1.6 6.5 5" />
                      <circle cx="5" cy="10" r="2" />
                      <circle cx="19" cy="10" r="2" />
                    </svg>
                  )}
                  {stages[currentStage].icon === "chat" && (
                    <svg viewBox="0 0 24 24">
                      <path d="M4 12a8 7 0 1 1 3.5 5.8L4 19l1.2-3.2A6.7 6.7 0 0 1 4 12z" />
                      <circle cx="9" cy="12" r=".6" />
                      <circle cx="12" cy="12" r=".6" />
                      <circle cx="15" cy="12" r=".6" />
                    </svg>
                  )}
                  {stages[currentStage].icon === "clip" && (
                    <svg viewBox="0 0 24 24">
                      <rect x="5" y="4.5" width="14" height="16" rx="2" />
                      <path d="M9 4.5h6v2.5H9z" />
                      <path d="M8.8 13.2l2.2 2.2 4.4-4.6" />
                    </svg>
                  )}
                  {stages[currentStage].icon === "cal" && (
                    <svg viewBox="0 0 24 24">
                      <rect x="4" y="5.5" width="16" height="14.5" rx="2" />
                      <path d="M4 10h16M8.5 3.5v4M15.5 3.5v4" />
                      <path d="M8 13.5h.01M12 13.5h.01M16 13.5h.01M8 17h.01M12 17h.01" />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="eyebrow" id="pStep">
                    Stage {currentStage + 1} of 4
                  </span>
                  <h2 id="pTitle">{stages[currentStage].name}</h2>
                </div>
              </div>
              <p className="lead" id="pLead">
                {stages[currentStage].lead}
              </p>
              <ul id="pList">
                {stages[currentStage].list.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
              <div className="metric">
                <b id="pMetric">{stages[currentStage].metric}</b>
                <span id="pMetricLabel">{stages[currentStage].metricLabel}</span>
              </div>
            </div>
            <div className="controls">
              <button
                className="btn primary"
                id="play"
                type="button"
                onClick={() => {
                  if (isPlayingFlow) {
                    setIsPlayingFlow(false);
                  } else {
                    handleSelectStage(0);
                    setIsPlayingFlow(true);
                  }
                }}
              >
                {isPlayingFlow ? "❚❚ Pause" : "▶ Play the flow"}
              </button>
              <button
                className="btn"
                id="next"
                type="button"
                onClick={() => {
                  setIsPlayingFlow(false);
                  handleSelectStage((currentStage + 1) % 4);
                }}
              >
                Next stage →
              </button>
              <div className="steps" id="dots" role="tablist" aria-label="Stages">
                {stages.map((s, idx) => (
                  <button
                    key={s.name}
                    className={`dot ${idx <= currentStage ? "on" : ""}`}
                    type="button"
                    role="tab"
                    aria-label={s.name}
                    aria-selected={idx === currentStage}
                    onClick={() => {
                      setIsPlayingFlow(false);
                      handleSelectStage(idx);
                    }}
                  />
                ))}
              </div>
            </div>
          </article>
        </section>

        {/* Qualification Checker */}
        <section className="section" aria-labelledby="qTitle">
          <div className="section-head">
            <span className="eyebrow">What “qualified” means</span>
            <h2 id="qTitle">A lead reaches your calendar only when all four checks pass</h2>
            <p>Try it. Switch the checks on and off to see when a prospect becomes a booked meeting.</p>
          </div>
          <div className="checker">
            <div className="checks" id="checks">
              <label className="check">
                <input
                  type="checkbox"
                  id="c-interest"
                  checked={checks.interest}
                  onChange={(e) => setChecks({ ...checks, interest: e.target.checked })}
                />
                <span className="row">
                  <span className="box">
                    <svg viewBox="0 0 16 16">
                      <path d="M3 8.5l3.2 3L13 4.5" />
                    </svg>
                  </span>
                  <strong>Interest</strong>
                </span>
                <p>They replied positively and asked to take it further.</p>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  id="c-authority"
                  checked={checks.authority}
                  onChange={(e) => setChecks({ ...checks, authority: e.target.checked })}
                />
                <span className="row">
                  <span className="box">
                    <svg viewBox="0 0 16 16">
                      <path d="M3 8.5l3.2 3L13 4.5" />
                    </svg>
                  </span>
                  <strong>Authority to buy</strong>
                </span>
                <p>Their role and decision-making experience are confirmed in research and in conversation.</p>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  id="c-capacity"
                  checked={checks.capacity}
                  onChange={(e) => setChecks({ ...checks, capacity: e.target.checked })}
                />
                <span className="row">
                  <span className="box">
                    <svg viewBox="0 0 16 16">
                      <path d="M3 8.5l3.2 3L13 4.5" />
                    </svg>
                  </span>
                  <strong>Capacity to proceed</strong>
                </span>
                <p>The company’s size, stage and sector fit your target, so the deal can realistically go ahead.</p>
              </label>
              <label className="check">
                <input
                  type="checkbox"
                  id="c-agreement"
                  checked={checks.agreement}
                  onChange={(e) => setChecks({ ...checks, agreement: e.target.checked })}
                />
                <span className="row">
                  <span className="box">
                    <svg viewBox="0 0 16 16">
                      <path d="M3 8.5l3.2 3L13 4.5" />
                    </svg>
                  </span>
                  <strong>Agreement</strong>
                </span>
                <p>They agreed to speak with you on a channel they chose.</p>
              </label>
            </div>
            <div className={`verdict ${isQualified ? "pass" : "fail"}`} id="verdict">
              <span className="state" id="vState">
                {isQualified ? "Qualified" : "Not qualified yet"}
              </span>
              <h3 id="vTitle">
                {isQualified ? "Meeting goes on your calendar" : `${passedCount} of 4 checks passed`}
              </h3>
              <p id="vText">
                {isQualified
                  ? "All four checks passed. We book the meeting on the channel they chose and send you the brief."
                  : `Still missing: ${missingChecks.join(", ")}. We keep the conversation going, or we let it go. It does not reach your calendar.`}
              </p>
              <div className="meter" id="meter">
                <i className={passedCount >= 1 ? "on" : ""} />
                <i className={passedCount >= 2 ? "on" : ""} />
                <i className={passedCount >= 3 ? "on" : ""} />
                <i className={passedCount >= 4 ? "on" : ""} />
              </div>
            </div>
          </div>
        </section>

        {/* Meeting Brief & Phone Mockup */}
        <section className="section" aria-labelledby="bTitle">
          <div className="brief">
            <div className="section-head">
              <span className="eyebrow">What lands on your calendar</span>
              <h2 id="bTitle">Every meeting comes with a short brief</h2>
              <p>Your sales executive walks in knowing who they are meeting and what to ask. Tap the notification on the phone to open a sample brief.</p>
              <div className="niches" id="niches" role="tablist" aria-label="Example industry">
                <button
                  type="button"
                  className={`niche ${niche === "software" ? "on" : ""}`}
                  role="tab"
                  aria-selected={niche === "software"}
                  onClick={() => {
                    setNiche("software");
                    setAppOpen(false);
                  }}
                >
                  Custom software
                </button>
                <button
                  type="button"
                  className={`niche ${niche === "saas" ? "on" : ""}`}
                  role="tab"
                  aria-selected={niche === "saas"}
                  onClick={() => {
                    setNiche("saas");
                    setAppOpen(false);
                  }}
                >
                  B2B SaaS
                </button>
                <button
                  type="button"
                  className={`niche ${niche === "marketing" ? "on" : ""}`}
                  role="tab"
                  aria-selected={niche === "marketing"}
                  onClick={() => {
                    setNiche("marketing");
                    setAppOpen(false);
                  }}
                >
                  Marketing agency
                </button>
              </div>
            </div>
            <div className="phone-stage">
              <div className="phone" id="phone">
                <div className="screen">
                  <div className="status" aria-hidden="true">
                    <span>9:41</span>
                    <span className="notch" />
                    <span className="sig">5G ▮</span>
                  </div>

                  {/* Lock Screen View */}
                  <div className="lock" id="lock" hidden={appOpen}>
                    <div className="lock-date" id="lDate">
                      {currentBrief.lock}
                    </div>
                    <div className="lock-time">9:41</div>
                    <button
                      className="notif"
                      id="notif"
                      type="button"
                      aria-label="Open the meeting brief"
                      onClick={() => setAppOpen(true)}
                    >
                      <div className="app-ic flex items-center justify-center font-black text-xs text-[#0a0510]">
                        TA
                      </div>
                      <span className="n-body">
                        <span className="n-top">
                          <b>Tara Applications</b>
                          <small>now</small>
                        </span>
                        <strong>New meeting booked</strong>
                        <span id="nText">{currentBrief.note}</span>
                      </span>
                    </button>
                    <div className="notif ghost" aria-hidden="true">
                      <div className="app-ic flex items-center justify-center font-black text-xs text-[#0a0510]">
                        TA
                      </div>
                      <span className="n-body">
                        <span className="n-top">
                          <b>Tara Applications</b>
                          <small>2m ago</small>
                        </span>
                        <span>Brief ready for your sales executive</span>
                      </span>
                    </div>
                    <div className="tap-hint" aria-hidden="true">
                      <span className="ring" />
                      Tap the notification
                    </div>
                  </div>

                  {/* Inside App View */}
                  <div className="app" id="app" hidden={!appOpen}>
                    <div className="app-bar">
                      <button
                        type="button"
                        className="back"
                        id="back"
                        aria-label="Back to lock screen"
                        onClick={() => setAppOpen(false)}
                      >
                        ‹ Meetings
                      </button>
                      <span className="tag">Example</span>
                    </div>
                    <div className="app-scroll">
                      <div className="m-head">
                        <div className="cal-tile" aria-hidden="true">
                          <span id="iMon">{currentBrief.mon}</span>
                          <b id="iDay">{currentBrief.day}</b>
                        </div>
                        <div className="m-title">
                          <h3 id="iTitle">{currentBrief.title}</h3>
                          <p id="iWhen">{currentBrief.when}</p>
                        </div>
                      </div>
                      <span className="chan" id="iChan">
                        {currentBrief.chan === "meet" ? (
                          <svg viewBox="0 0 24 24">
                            <rect x="3" y="6" width="12" height="12" rx="2" />
                            <path d="M15 10l6-3v10l-6-3" />
                          </svg>
                        ) : (
                          <svg viewBox="0 0 24 24">
                            <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" />
                          </svg>
                        )}
                        {currentBrief.chanText}
                      </span>
                      <div className="person">
                        <i className="av" id="iAv">
                          {currentBrief.av}
                        </i>
                        <span>
                          <b id="iRole">{currentBrief.role}</b>
                          <small id="iCo">{currentBrief.co}</small>
                        </span>
                      </div>
                      <div className="blk">
                        <span className="lbl">Who</span>
                        <p id="iWho">{currentBrief.who}</p>
                      </div>
                      <div className="blk">
                        <span className="lbl">What to ask</span>
                        <ol className="asks" id="iAsk">
                          {currentBrief.ask.map((a, i) => (
                            <li key={i}>{a}</li>
                          ))}
                        </ol>
                      </div>
                      <div className="ok">
                        <svg viewBox="0 0 16 16">
                          <path d="M3 8.5l3.2 3L13 4.5" />
                        </svg>
                        Interest, authority, capacity and agreement confirmed
                      </div>
                    </div>
                    <div className="app-cta" id="iCta">
                      {currentBrief.cta}
                    </div>
                  </div>

                  <div className="home-bar" aria-hidden="true" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Typical Numbers */}
        <section className="section" aria-labelledby="nTitle">
          <div className="section-head">
            <span className="eyebrow">A typical month</span>
            <h2 id="nTitle">What the numbers usually look like</h2>
          </div>
          <div className="numbers">
            <div className="num">
              <b>~2,400</b>
              <span>prospects researched and contacted</span>
              <div className="bar">
                <i style={{ width: "100%" }} />
              </div>
            </div>
            <div className="num">
              <b>240</b>
              <span>conversations with prospects who replied</span>
              <div className="bar">
                <i style={{ width: "10%" }} />
              </div>
            </div>
            <div className="num">
              <b>~15</b>
              <span>qualified meetings on your calendar</span>
              <div className="bar">
                <i style={{ width: "2%" }} />
              </div>
            </div>
          </div>
          <p className="footnote">
            Typical figures, not a guarantee. Results depend on your market, offer and target profile.
          </p>
        </section>

        {/* Client Dashboard Preview */}
        <section className="section" aria-labelledby="dTitle">
          <div className="section-head">
            <span className="eyebrow">Your client dashboard</span>
            <h2 id="dTitle">Every meeting, brief and number in one place</h2>
            <p>You get a private workspace that shows monthly activity, your confirmed meetings and a full brief for each one. Try it below: open a meeting, search, filter and switch tabs.</p>
          </div>
          <div className="dash-feats">
            <div className="dash-feat">
              <strong>Overview</strong>
              <span>Prospects researched, interested prospects and meetings booked this month.</span>
            </div>
            <div className="dash-feat">
              <strong>Confirmed meetings</strong>
              <span>A searchable list of upcoming, completed and cancelled meetings, filtered by industry, location and format.</span>
            </div>
            <div className="dash-feat">
              <strong>Meeting handoff</strong>
              <span>Contact details, the meeting brief, business context and three talking points for your sales executive.</span>
            </div>
          </div>
          <div className={`dash-frame ${isDashFull ? "full" : ""}`} id="dashFrame">
            <div className="dash-bar">
              <div className="dash-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>
              <span className="dash-url">Client Growth Workspace · sample data</span>
              <button className="btn" id="dashFull" type="button" onClick={toggleDashFull}>
                {isDashFull ? "Close" : "Expand"}
              </button>
            </div>
            <iframe src="/dashboard.html" title="Sample client dashboard" loading="lazy" />
          </div>
          <p className="footnote">Sample dashboard. All names, companies, contacts and figures are fictional.</p>
        </section>
      </main>
    </div>
  );
}
