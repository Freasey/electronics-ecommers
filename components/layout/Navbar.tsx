"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: "0 2.5rem",
        height: "68px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
        background: scrolled
          ? "rgba(4, 6, 20, 0.85)"
          : "linear-gradient(to bottom, rgba(4,6,20,0.9), transparent)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0, 245, 220, 0.08)" : "none",
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span
          style={{
            width: "32px",
            height: "32px",
            background: "linear-gradient(135deg, #00F5DC, #0066FF)",
            borderRadius: "8px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            fontWeight: 900,
            color: "#fff",
            fontFamily: "'Syne', sans-serif",
            flexShrink: 0,
          }}
        >
          ▶
        </span>
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.3rem",
            letterSpacing: "0.08em",
            color: "#ffffff",
          }}
        >
          ANIMU
        </span>
      </Link>

      {/* Nav Links */}
      <div style={{ display: "flex", gap: "2rem", alignItems: "center" }}>
        {["Beranda", "Jadwal", "Populer", "Kategori"].map((item) => (
          <Link
            key={item}
            href="#"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.875rem",
              fontWeight: 500,
              color: "rgba(255,255,255,0.65)",
              textDecoration: "none",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#00F5DC")}
            onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.65)")}
          >
            {item}
          </Link>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
        <button
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.2)",
            color: "#fff",
            padding: "0.45rem 1.1rem",
            borderRadius: "6px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 500,
            cursor: "pointer",
            transition: "border-color 0.2s",
          }}
        >
          Masuk
        </button>
        <button
          style={{
            background: "linear-gradient(135deg, #00F5DC, #0066FF)",
            border: "none",
            color: "#04061A",
            padding: "0.45rem 1.2rem",
            borderRadius: "6px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.85rem",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Daftar
        </button>
      </div>
    </nav>
  );
}