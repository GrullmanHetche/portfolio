"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import Nav from "@/components/Nav";
import { useReveal } from "@/components/useReveal";
import styles from "./page.module.css";

// Canvas is client-only, skip SSR
const EnvelopeCanvas = dynamic(() => import("@/components/EnvelopeCanvas"), {
  ssr: false,
});

// ── Copy ──────────────────────────────────────────────────────────────────────
const COPY = {
  ko: {
    heroEyebrow: "Creative Developer · 커미션 오픈",
    heroTitle: ["숨겨진 것을", "드러내는 사람."],
    heroSub: "보이지 않는 감정과 기억을\n인터랙티브 웹으로 풀어냅니다.",
    ctaWork: "작업 보기",
    ctaContact: "연락하기",

    worksEyebrow: "Selected Works",
    worksTitle: "작업물",
    worksDesc: "직접 만져볼 수 있는 경험들.",

    work1Title: "Hide on Letter",
    work1Tag: "Interactive · Web",
    work1Desc: "편지 속에 메시지를 숨기는 인터랙티브 아카이브. 이야기를 담은 감성 웹 경험.",
    work1Url: "https://hideonletter.vercel.app",

    workNextTitle: "다음 프로젝트",
    workNextDesc: "준비 중이에요.",

    aboutEyebrow: "About",
    aboutTitle: ["보이지 않는 것을", "보이게 만드는 사람."],
    aboutDesc:
      "숨겨진 메시지, 숨겨진 감정, 숨겨진 경험 — 웹을 통해 드러냅니다. 커미션도 받고 있어요. 함께 만들어보고 싶은 프로젝트가 있다면 편하게 연락 주세요.",

    stat0Num: "∞",  stat0Label: "아이디어",
    stat1Num: "01",  stat1Label: "커미션 오픈",
    stat2Num: "↗",  stat2Label: "성장 중",

    contactEyebrow: "Contact",
    contactTitle: "함께 만들어요.",
    contactSub: "커미션 문의, 연성 교환 제안 모두 환영합니다.",
  },
  en: {
    heroEyebrow: "Creative Developer · Open for Commissions",
    heroTitle: ["Making the", "invisible visible."],
    heroSub: "Building interactive web experiences\nthat reveal what's hidden.",
    ctaWork: "View Work",
    ctaContact: "Get in Touch",

    worksEyebrow: "Selected Works",
    worksTitle: "Works",
    worksDesc: "Experiences you can actually feel.",

    work1Title: "Hide on Letter",
    work1Tag: "Interactive · Web",
    work1Desc: "An interactive archive hiding messages inside letters — a web experience capturing the story of T1.",
    work1Url: "https://hideonletter.vercel.app",

    workNextTitle: "Next Project",
    workNextDesc: "Coming soon.",

    aboutEyebrow: "About",
    aboutTitle: ["Making the", "invisible visible."],
    aboutDesc:
      "Hidden messages, hidden emotions, hidden experiences — revealed through the web. Open for commissions. Reach out if you have a project you'd like to build together.",

    stat0Num: "∞",  stat0Label: "Ideas",
    stat1Num: "01",  stat1Label: "Commission open",
    stat2Num: "↗",  stat2Label: "Growing",

    contactEyebrow: "Contact",
    contactTitle: "Let's build together.",
    contactSub: "Commission inquiries and collaboration proposals are both welcome.",
  },
};

type Lang = "ko" | "en";

// ── Component ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [lang, setLang] = useState<Lang>("ko");
  useReveal();

  const c = COPY[lang];

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  // ── TODO: replace with your real info ──
  const YOUR_NAME  = "HYUK";
  const YOUR_EMAIL = "cherrypicking@gmail.com";
  const GITHUB_URL = "https://github.com/GrullmanHetche";
  const INSTAGRAM  = "#";
  const TWITTER    = "#";

  return (
    <>
      <Nav lang={lang} onLangChange={setLang} name={YOUR_NAME} />

      {/* ── HERO ─────────────────────────────────────── */}
      <section id="hero" className={styles.hero}>
        <EnvelopeCanvas />
        <div className={styles.heroContent}>
          <p className={styles.eyebrow}>{c.heroEyebrow}</p>
          <h1 className={styles.heroTitle}>
            {c.heroTitle.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </h1>
          <p className={styles.heroSub}>
            {c.heroSub.split("\n").map((l, i) => (
              <span key={i}>{l}<br /></span>
            ))}
          </p>
          <div className={styles.cta}>
            <button className={styles.btnPrimary} onClick={() => scrollTo("works")}>
              {c.ctaWork}
            </button>
            <button className={styles.btnSecondary} onClick={() => scrollTo("contact")}>
              {c.ctaContact}
            </button>
          </div>
        </div>

        {/* scroll indicator */}
        <div className={styles.scrollIndicator}>
          <div className={styles.scrollLine} />
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────── */}
      <div className={styles.marqueeWrap}>
        <div className={styles.marqueeTrack}>
          {[
            "Creative Development", "·",
            "Interactive Design",   "·",
            "Web Experience",       "·",
            "Motion & Interaction", "·",
            "Frontend Craft",       "·",
            "커미션 오픈",           "·",
            "Creative Development", "·",
            "Interactive Design",   "·",
            "Web Experience",       "·",
            "Motion & Interaction", "·",
            "Frontend Craft",       "·",
            "커미션 오픈",           "·",
          ].map((t, i) => <span key={i}>{t}</span>)}
        </div>
      </div>

      {/* ── WORKS ────────────────────────────────────── */}
      <section id="works" className={styles.section}>
        <div className={`${styles.sectionHead} reveal`}>
          <p className={styles.eyebrow}>{c.worksEyebrow}</p>
          <h2 className={styles.sectionTitle}>{c.worksTitle}</h2>
          <p className={styles.sectionDesc}>{c.worksDesc}</p>
        </div>

        <div className={styles.grid}>
          {/* Card 1 — Hide on Letter */}
          <a
            href={c.work1Url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${styles.workCard} reveal`}
          >
            <div className={`${styles.workPreview} ${styles.previewDark}`}>
              <EnvelopeSVG />
            </div>
            <div className={styles.workInfo}>
              <p className={styles.workTag}>{c.work1Tag}</p>
              <h3 className={styles.workName}>{c.work1Title}</h3>
              <p className={styles.workDesc}>{c.work1Desc}</p>
              <span className={styles.workArrow}>↗</span>
            </div>
          </a>

          {/* Card 2 — Placeholder */}
          <div className={`${styles.workCard} ${styles.workCardNext} reveal reveal-delay-1`}>
            <div className={`${styles.workPreview} ${styles.previewLight}`}>
              <div className={styles.plusIcon}>+</div>
            </div>
            <div className={styles.workInfo}>
              <p className={styles.workTag}>Coming Soon</p>
              <h3 className={styles.workName}>{c.workNextTitle}</h3>
              <p className={styles.workDesc}>{c.workNextDesc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ────────────────────────────────────── */}
      <section id="about" className={styles.aboutSection}>
        <div className={styles.aboutInner}>
          <div className="reveal">
            <p className={styles.eyebrowLight}>{c.aboutEyebrow}</p>
            <h2 className={styles.aboutTitle}>
              {c.aboutTitle.map((line, i) => (
                <span key={i}>{line}<br /></span>
              ))}
            </h2>
            <p className={styles.aboutDesc}>{c.aboutDesc}</p>
          </div>
          <div className={`${styles.statsRow} reveal reveal-delay-2`}>
            {[
              { num: c.stat0Num, label: c.stat0Label },
              { num: c.stat1Num, label: c.stat1Label },
              { num: c.stat2Num, label: c.stat2Label },
            ].map((s, i) => (
              <div key={i} className={styles.stat}>
                <p className={styles.statNum}>{s.num}</p>
                <p className={styles.statLabel}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ──────────────────────────────────── */}
      <section id="contact" className={styles.section}>
        <div className={`${styles.contactBox} reveal`}>
          <p className={styles.eyebrow}>{c.contactEyebrow}</p>
          <h2 className={styles.contactTitle}>{c.contactTitle}</h2>
          <p className={styles.contactSub}>{c.contactSub}</p>
          <a href={`mailto:${YOUR_EMAIL}`} className={styles.contactEmail}>
            {YOUR_EMAIL}
          </a>
          <div className={styles.socialLinks}>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>GitHub</a>
            <a href={INSTAGRAM}  target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Instagram</a>
            <a href={TWITTER}    target="_blank" rel="noopener noreferrer" className={styles.socialLink}>Twitter / X</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────────── */}
      <footer className={styles.footer}>
        <span>© 2026 HYUK. All rights reserved.</span>
      </footer>
    </>
  );
}

// ── Inline SVG: decorative envelope for work card ─────────────────────────────
function EnvelopeSVG() {
  return (
    <svg width="130" height="96" viewBox="0 0 130 96" fill="none">
      {/* body */}
      <rect x="5" y="22" width="120" height="68" rx="7"
        fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
      {/* V-fold */}
      <path d="M5 29 L65 62 L125 29"
        stroke="rgba(255,255,255,0.18)" strokeWidth="0.7" fill="none" />
      {/* bottom fold */}
      <path d="M5 90 L45 56 M125 90 L85 56"
        stroke="rgba(255,255,255,0.12)" strokeWidth="0.6" fill="none" />
      {/* stamp */}
      <rect x="96" y="4" width="26" height="18" rx="2"
        fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
      <text x="109" y="16" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.3)"
        fontFamily="-apple-system, sans-serif">POST</text>
    </svg>
  );
}
