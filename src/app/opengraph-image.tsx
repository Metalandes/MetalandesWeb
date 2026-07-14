import { ImageResponse } from "next/og";

export const alt = "Metalandes — 65 años energizando Colombia";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "radial-gradient(1200px 600px at 50% -20%, #2a313b 0%, #0c0f15 62%)",
          color: "#eef1f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#2a313b",
              border: "2px solid #e2042d",
            }}
          />
          <div style={{ display: "flex", fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>
            <span>METAL</span>
            <span style={{ color: "#e2042d" }}>ANDES</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.02, letterSpacing: -2 }}>
            Energía que enciende
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              background: "linear-gradient(100deg, #cdd7e8, #e2042d)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Colombia
          </div>
          <div style={{ fontSize: 28, color: "#9aa3b5", marginTop: 8 }}>
            65 años · Subestaciones y mantenimiento eléctrico · Medellín
          </div>
        </div>
      </div>
    ),
    size
  );
}
