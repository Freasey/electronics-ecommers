"use client";

import AnimeCard from "@/components/ui/AnimeCard";

const TRENDING_ANIME = [
  {
    title: "Kagerou no Shinja",
    episode: "Ep. 24 · Tamat",
    genre: "Action",
    rating: 9.4,
    thumbnail: "linear-gradient(135deg, #0D1B4B, #1A3A6B, #0A2040)",
    isNew: false,
  },
  {
    title: "Akatsuki Reborn",
    episode: "Ep. 36 · Tamat",
    genre: "Isekai",
    rating: 8.9,
    thumbnail: "linear-gradient(135deg, #3A1A0A, #5A2A10, #2A1008)",
    isNew: true,
  },
  {
    title: "Shinkai Protocol",
    episode: "Ep. 12 · Tamat",
    genre: "Sci-Fi",
    rating: 9.1,
    thumbnail: "linear-gradient(135deg, #1A0A3A, #2A1050, #0A0820)",
    isNew: false,
  },
  {
    title: "Maboroshi Gakuen",
    episode: "Ep. 7 / 24",
    genre: "Slice of Life",
    rating: 8.6,
    thumbnail: "linear-gradient(135deg, #0A2A1A, #143A24, #081A10)",
    isNew: true,
  },
  {
    title: "Hyouketsu no Ken",
    episode: "Ep. 18 / 26",
    genre: "Fantasy",
    rating: 9.0,
    thumbnail: "linear-gradient(135deg, #0A1A3A, #0F2A55, #06102A)",
    isNew: false,
  },
  {
    title: "Gekido Requiem",
    episode: "Ep. 5 / 12",
    genre: "Horror",
    rating: 8.7,
    thumbnail: "linear-gradient(135deg, #2A0808, #450E0E, #1A0505)",
    isNew: true,
  },
];

export default function TrendingSection() {
  return (
    <section
      style={{
        background: "#04061A",
        padding: "5rem 2.5rem 3rem",
      }}
    >
      {/* Section Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          marginBottom: "2rem",
        }}
      >
        <div>
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
            Populer Minggu Ini
          </p>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
              color: "#EAEAF5",
              margin: 0,
              letterSpacing: "-0.02em",
            }}
          >
            Sedang Trending
          </h2>
        </div>
        <button
          style={{
            background: "transparent",
            border: "1px solid rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.5)",
            padding: "0.5rem 1.2rem",
            borderRadius: "6px",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            cursor: "pointer",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
          }}
        >
          Lihat Semua →
        </button>
      </div>

      {/* Cards Scroll Container */}
      <div
        style={{
          display: "flex",
          gap: "1.25rem",
          overflowX: "auto",
          paddingBottom: "1.25rem",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {TRENDING_ANIME.map((anime, index) => (
          <div
            key={anime.title}
            style={{
              animation: `fadeInUp 0.5s ease both`,
              animationDelay: `${index * 0.08}s`,
            }}
          >
            <AnimeCard {...anime} />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        div::-webkit-scrollbar { display: none; }
      `}</style>
    </section>
  );
}