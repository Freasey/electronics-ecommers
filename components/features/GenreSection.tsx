"use client";

import { useState } from "react";
import AnimeCard from "@/components/ui/AnimeCard";

const GENRES = ["Semua", "Action", "Fantasy", "Isekai", "Sci-Fi", "Romance", "Horror", "Slice of Life"];

const ANIME_BY_GENRE: Record<string, { title: string; episode: string; genre: string; rating: number; thumbnail: string; isNew?: boolean }[]> = {
  Semua: [
    { title: "Raijin Chronicles", episode: "Ep. 8 / 24", genre: "Action", rating: 8.8, thumbnail: "linear-gradient(135deg, #1A2A0A, #2E4A12, #0E1A06)", isNew: true },
    { title: "Umi no Koe", episode: "Ep. 13 / 13", genre: "Romance", rating: 9.2, thumbnail: "linear-gradient(135deg, #0A1828, #102440, #060E18)", isNew: false },
    { title: "Kuroi Tenshi", episode: "Ep. 3 / 12", genre: "Horror", rating: 8.5, thumbnail: "linear-gradient(135deg, #1A0A18, #2E1030, #0E060C)", isNew: true },
    { title: "Hoshi no Senshi", episode: "Ep. 20 / 26", genre: "Fantasy", rating: 8.9, thumbnail: "linear-gradient(135deg, #0A1A2A, #102840, #060E18)", isNew: false },
    { title: "Yoake Protocol", episode: "Ep. 6 / 24", genre: "Sci-Fi", rating: 8.7, thumbnail: "linear-gradient(135deg, #1A0A2A, #281040, #0E0618)", isNew: true },
    { title: "Fuyuiro Kiseki", episode: "Ep. 12 / 12", genre: "Slice of Life", rating: 9.0, thumbnail: "linear-gradient(135deg, #1A1808, #2A2810, #100E04)", isNew: false },
  ],
  Action: [
    { title: "Raijin Chronicles", episode: "Ep. 8 / 24", genre: "Action", rating: 8.8, thumbnail: "linear-gradient(135deg, #1A2A0A, #2E4A12, #0E1A06)", isNew: true },
    { title: "Kagerou no Shinja", episode: "Ep. 24 · Tamat", genre: "Action", rating: 9.4, thumbnail: "linear-gradient(135deg, #0D1B4B, #1A3A6B, #0A2040)", isNew: false },
    { title: "Tetsujin Rising", episode: "Ep. 15 / 26", genre: "Action", rating: 8.6, thumbnail: "linear-gradient(135deg, #2A1808, #401E0A, #180C04)", isNew: false },
  ],
  Fantasy: [
    { title: "Hoshi no Senshi", episode: "Ep. 20 / 26", genre: "Fantasy", rating: 8.9, thumbnail: "linear-gradient(135deg, #0A1A2A, #102840, #060E18)", isNew: false },
    { title: "Hyouketsu no Ken", episode: "Ep. 18 / 26", genre: "Fantasy", rating: 9.0, thumbnail: "linear-gradient(135deg, #0A1A3A, #0F2A55, #06102A)", isNew: false },
    { title: "Mahoutsukai Reborn", episode: "Ep. 4 / 12", genre: "Fantasy", rating: 8.4, thumbnail: "linear-gradient(135deg, #1A0A2A, #2E1050, #0E0618)", isNew: true },
  ],
};

export default function GenreSection() {
  const [activeGenre, setActiveGenre] = useState("Semua");

  const animeList = ANIME_BY_GENRE[activeGenre] ?? ANIME_BY_GENRE["Semua"];

  return (
    <section
      style={{
        background: "#04061A",
        padding: "4rem 2.5rem 6rem",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 700,
            letterSpacing: "0.18em",
            color: "#00F5DC",
            textTransform: "uppercase",
            margin: "0 0 0.5rem",
          }}
        >
          Jelajahi
        </p>
        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
            color: "#EAEAF5",
            margin: "0 0 1.75rem",
            letterSpacing: "-0.02em",
          }}
        >
          Pilih Berdasarkan Genre
        </h2>

        {/* Genre Filter Pills */}
        <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
          {GENRES.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              style={{
                background: activeGenre === genre
                  ? "linear-gradient(135deg, #00F5DC, #0066FF)"
                  : "rgba(255,255,255,0.06)",
                border: activeGenre === genre
                  ? "1px solid transparent"
                  : "1px solid rgba(255,255,255,0.1)",
                color: activeGenre === genre ? "#04061A" : "rgba(255,255,255,0.55)",
                padding: "0.45rem 1.1rem",
                borderRadius: "20px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "0.82rem",
                fontWeight: activeGenre === genre ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s ease",
                letterSpacing: "0.02em",
              }}
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Anime Grid */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          flexWrap: "wrap",
        }}
      >
        {animeList.map((anime, index) => (
          <div
            key={`${activeGenre}-${anime.title}`}
            style={{
              animation: "fadeInUp 0.4s ease both",
              animationDelay: `${index * 0.07}s`,
            }}
          >
            <AnimeCard {...anime} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}