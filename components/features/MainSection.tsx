"use client";

import { useState, useEffect } from "react";

const FEATURED_ANIME = [
  {
    title: "Kagerou no Shinja",
    synopsis:
      "Di dunia yang diselimuti bayangan abadi, seorang pemuda bernama Ren menemukan bahwa dirinya adalah satu-satunya yang mampu melihat cahaya sejati. Petualangan epik menuju kebenaran yang tersembunyi dimulai.",
    genre: "Action / Fantasy",
    episode: "24 Episode",
    rating: "9.4",
    accentColor: "#00F5DC",
    bg: "linear-gradient(135deg, #0D1B4B 0%, #1A0A3A 50%, #0A1628 100%)",
    heroGradient: "radial-gradient(ellipse at 60% 50%, rgba(0,102,255,0.35) 0%, transparent 65%), radial-gradient(ellipse at 20% 80%, rgba(0,245,220,0.15) 0%, transparent 50%)",
  },
  {
    title: "Akatsuki Reborn",
    synopsis:
      "Setelah dikalahkan dalam pertarungan terakhir, sang pahlawan reinkarnasi di era modern. Kini ia harus menguasai kembali kekuatannya sambil menyembunyikan identitas aslinya.",
    genre: "Isekai / Adventure",
    episode: "36 Episode",
    rating: "8.9",
    accentColor: "#FF6B35",
    bg: "linear-gradient(135deg, #2A0D0D 0%, #1A1A0A 50%, #0A1020 100%)",
    heroGradient: "radial-gradient(ellipse at 65% 45%, rgba(255,70,0,0.3) 0%, transparent 60%), radial-gradient(ellipse at 25% 75%, rgba(255,180,50,0.12) 0%, transparent 50%)",
  },
  {
    title: "Shinkai Protocol",
    synopsis:
      "Pada tahun 2187, batas antara dunia virtual dan nyata telah runtuh. Sekelompok hacker elit berjuang melawan korporasi yang ingin mengontrol kesadaran manusia sepenuhnya.",
    genre: "Sci-Fi / Cyberpunk",
    episode: "12 Episode",
    rating: "9.1",
    accentColor: "#BF00FF",
    bg: "linear-gradient(135deg, #0D0A2A 0%, #1A0A2A 50%, #050A1A 100%)",
    heroGradient: "radial-gradient(ellipse at 60% 50%, rgba(120,0,255,0.3) 0%, transparent 60%), radial-gradient(ellipse at 30% 80%, rgba(0,200,255,0.1) 0%, transparent 50%)",
  },
];

export default function MainSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  const handleNext = () => {
    setTransitioning(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % FEATURED_ANIME.length);
      setTransitioning(false);
    }, 300);
  };

  const handleSelect = (index: number) => {
    if (index === activeIndex) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTransitioning(false);
    }, 300);
  };

  const anime = FEATURED_ANIME[activeIndex];

  return (
    <section
      style={{
        position: "relative",
        height: "100vh",
        minHeight: "600px",
        overflow: "hidden",
        background: anime.bg,
        transition: "background 0.6s ease",
      }}
    >
      {/* Background gradient effect */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: anime.heroGradient,
          transition: "background 0.6s ease",
        }}
      />

      {/* Noise texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
          backgroundRepeat: "repeat",
          backgroundSize: "128px",
        }}
      />

      {/* Animated orb */}
      <div
        style={{
          position: "absolute",
          right: "15%",
          top: "20%",
          width: "460px",
          height: "460px",
          background: `radial-gradient(circle, ${anime.accentColor}22 0%, transparent 70%)`,
          borderRadius: "50%",
          animation: "pulse 4s ease-in-out infinite",
          transition: "background 0.6s ease",
        }}
      />

      {/* Decorative lines */}
      <div
        style={{
          position: "absolute",
          right: 0,
          top: 0,
          width: "1px",
          height: "100%",
          background: `linear-gradient(to bottom, transparent, ${anime.accentColor}40, transparent)`,
          left: "58%",
          opacity: 0.4,
        }}
      />

      {/* Bottom fade */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "220px",
          background: "linear-gradient(to top, #04061A, transparent)",
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "0 2.5rem",
          maxWidth: "680px",
          opacity: transitioning ? 0 : 1,
          transform: transitioning ? "translateY(16px)" : "translateY(0)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
        }}
      >
        {/* Genre tag */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "1.25rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              fontWeight: 700,
              letterSpacing: "0.14em",
              color: anime.accentColor,
              textTransform: "uppercase",
              background: `${anime.accentColor}18`,
              border: `1px solid ${anime.accentColor}40`,
              padding: "4px 12px",
              borderRadius: "4px",
            }}
          >
            {anime.genre}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.06em",
            }}
          >
            {anime.episode}
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.8rem, 6vw, 5rem)",
            lineHeight: 1.05,
            color: "#FFFFFF",
            margin: "0 0 1.25rem",
            letterSpacing: "-0.02em",
          }}
        >
          {anime.title}
        </h1>

        {/* Synopsis */}
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.95rem",
            lineHeight: 1.75,
            color: "rgba(255,255,255,0.6)",
            margin: "0 0 2rem",
            maxWidth: "520px",
          }}
        >
          {anime.synopsis}
        </p>

        {/* Rating */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
          <span style={{ color: "#FFD700", fontSize: "1rem" }}>★★★★★</span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.95rem",
              color: "#fff",
            }}
          >
            {anime.rating}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.8rem",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            / 10
          </span>
        </div>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <button
            style={{
              background: anime.accentColor,
              border: "none",
              color: "#04061A",
              padding: "0.85rem 2rem",
              borderRadius: "8px",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "0.9rem",
              letterSpacing: "0.04em",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s, box-shadow 0.2s",
            }}
          >
            ▶ Tonton Sekarang
          </button>
          <button
            style={{
              background: "rgba(255,255,255,0.08)",
              border: "1px solid rgba(255,255,255,0.15)",
              color: "#fff",
              padding: "0.85rem 1.75rem",
              borderRadius: "8px",
              fontFamily: "'Syne', sans-serif",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
              backdropFilter: "blur(8px)",
            }}
          >
            + Daftar Tonton
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "2.5rem",
          display: "flex",
          gap: "0.5rem",
          zIndex: 10,
        }}
      >
        {FEATURED_ANIME.map((_, idx) => (
          <button
            key={idx}
            onClick={() => handleSelect(idx)}
            style={{
              width: idx === activeIndex ? "32px" : "8px",
              height: "8px",
              borderRadius: "4px",
              background: idx === activeIndex ? anime.accentColor : "rgba(255,255,255,0.25)",
              border: "none",
              cursor: "pointer",
              transition: "width 0.3s ease, background 0.3s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.08); opacity: 1; }
        }
      `}</style>
    </section>
  );
}