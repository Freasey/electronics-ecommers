import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/features/MainSection";
import TrendingSection from "@/components/features/TrendingSection";
import GenreSection from "@/components/features/GenreSection";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrendingSection />
        <GenreSection />
      </main>

      {/* Footer minimal */}
      <footer
        style={{
          background: "#020410",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          padding: "2rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.1rem",
            letterSpacing: "0.08em",
            color: "rgba(255,255,255,0.6)",
          }}
        >
          ANIMU
        </span>
        <span
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "0.8rem",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          © 2025 ANIMU. Semua hak dilindungi.
        </span>
      </footer>
    </>
  );
}