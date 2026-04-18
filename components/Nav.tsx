"use client";
import { useState, useEffect } from "react";
import styles from "./Nav.module.css";

const COPY = {
  ko: { works: "Works", about: "About", contact: "Contact" },
  en: { works: "Works", about: "About", contact: "Contact" },
};

interface NavProps {
  lang: "ko" | "en";
  onLangChange: (l: "ko" | "en") => void;
  name: string;
}

export default function Nav({ lang, onLangChange, name }: NavProps) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const c = COPY[lang];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}>
      <span className={styles.logo}>{name}</span>

      <div className={styles.right}>
        <div className={styles.links}>
          <button onClick={() => scrollTo("works")}>{c.works}</button>
          <button onClick={() => scrollTo("about")}>{c.about}</button>
          <button onClick={() => scrollTo("contact")}>{c.contact}</button>
        </div>

        <div className={styles.langToggle}>
          <button
            className={lang === "ko" ? styles.active : ""}
            onClick={() => onLangChange("ko")}
          >KO</button>
          <button
            className={lang === "en" ? styles.active : ""}
            onClick={() => onLangChange("en")}
          >EN</button>
        </div>
      </div>
    </nav>
  );
}
