import { ImageResponse } from "next/og";

export const alt = "Metalandes Electric — Más de 65 años energizando Colombia";
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
            "radial-gradient(1200px 600px at 50% -20%, #2b313c 0%, #14171d 62%)",
          color: "#eef1f6",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 12,
              background: "#2b313c",
              border: "2px solid #e3032c",
            }}
          />
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, fontSize: 32, fontWeight: 700, letterSpacing: -1 }}>
            <span>Metalandes</span>
            <span style={{ color: "#e3032c", fontSize: 22, letterSpacing: 2 }}>ELECTRIC</span>
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
              background: "linear-gradient(100deg, #d3d6d7, #e3032c)",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            Colombia
          </div>
          <div style={{ fontSize: 28, color: "#9aa3b5", marginTop: 8 }}>
            Más de 65 años · Subestaciones y mantenimiento eléctrico · Medellín
          </div>
        </div>
      </div>
    ),
    size
  );
}
