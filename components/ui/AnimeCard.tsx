"use client";

import { useState } from "react";

export interface AnimeCardProps {
  title: string;
  episode: string;
  genre: string;
  rating: number;
  thumbnail: string;
  isNew?: boolean;
}

export default function AnimeCard({
  title,
  episode,
  genre,
  rating,
  thumbnail,
  isNew,
}: AnimeCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        cursor: "pointer",
        flexShrink: 0,
        width: "200px",
        background: "#0C0E24",
        transform: hovered ? "translateY(-6px) scale(1.02)" : "translateY(0) scale(1)",
        transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.3s ease",
        boxShadow: hovered
          ? "0 20px 48px rgba(0, 245, 220, 0.18), 0 8px 24px rgba(0,0,0,0.6)"
          : "0 4px 16px rgba(0,0,0,0.4)",
      }}
    >
      {/* Thumbnail */}
      <div
        style={{
          width: "100%",
          height: "270px",
          background: thumbnail,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: hovered
              ? "linear-gradient(to top, rgba(4,6,26,0.95) 0%, rgba(4,6,26,0.2) 60%, transparent 100%)"
              : "linear-gradient(to top, rgba(4,6,26,0.8) 0%, transparent 60%)",
            transition: "background 0.3s ease",
          }}
        />

        {/* Play button on hover */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <div
            style={{
              width: "48px",
              height: "48px",
              background: "rgba(0, 245, 220, 0.9)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "18px",
              color: "#04061A",
            }}
          >
            ▶
          </div>
        </div>

        {/* Badge NEW */}
        {isNew && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              left: "10px",
              background: "#FF2D55",
              color: "#fff",
              fontSize: "0.65rem",
              fontWeight: 800,
              letterSpacing: "0.1em",
              padding: "2px 8px",
              borderRadius: "4px",
              fontFamily: "'Syne', sans-serif",
            }}
          >
            BARU
          </div>
        )}

        {/* Rating */}
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "rgba(4,6,26,0.7)",
            backdropFilter: "blur(8px)",
            color: "#FFD700",
            fontSize: "0.7rem",
            fontWeight: 700,
            padding: "3px 8px",
            borderRadius: "4px",
            fontFamily: "'DM Sans', sans-serif",
            display: "flex",
            alignItems: "center",
            gap: "3px",
          }}
        >
          ★ {rating}
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: "0.75rem 0.9rem 0.9rem" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "0.875rem",
            color: "#EAEAF5",
            lineHeight: 1.3,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "0.4rem",
          }}
        >
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.72rem",
              color: "rgba(255,255,255,0.4)",
            }}
          >
            {episode}
          </span>
          <span
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.68rem",
              color: "#00F5DC",
              background: "rgba(0, 245, 220, 0.1)",
              padding: "1px 7px",
              borderRadius: "4px",
              border: "1px solid rgba(0, 245, 220, 0.2)",
            }}
          >
            {genre}
          </span>
        </div>
      </div>
    </div>
  );
}